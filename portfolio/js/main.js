/* Lógica y animaciones del sitio. No hace falta tocar este archivo
   para agregar trabajos: eso se hace en js/proyectos.js */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const isHome = document.body.classList.contains("home");

/* ---------- Completar datos del perfil ---------- */
function fillProfile() {
  const p = PERFIL;
  $$("[data-nombre]").forEach(el => (el.textContent = p.nombre));
  $$("[data-apellido]").forEach(el => (el.textContent = p.apellido));
  $$("[data-nombre-completo]").forEach(el => (el.textContent = `${p.nombre} ${p.apellido}`));
  $$("[data-rol]").forEach(el => (el.textContent = p.rol));
  $$("[data-ciudad]").forEach(el => (el.textContent = p.ciudad));
  $$("[data-bio]").forEach(el => (el.textContent = p.bio));
  $$("[data-universidad]").forEach(el => (el.textContent = p.universidad));
  $$("[data-foto]").forEach(el => (el.src = p.foto));
  $$("[data-email]").forEach(el => { el.textContent = p.email; el.href = `mailto:${p.email}`; });
  const social = $("#social");
  if (social) social.innerHTML = p.redes.map(r => `<a href="${r.url}" target="_blank" rel="noopener">${r.nombre} ↗</a>`).join("");
  const y = new Date().getFullYear();
  $$("#year, #year2").forEach(el => (el.textContent = y));
}

/* ---------- Partir texto en letras para animarlas ---------- */
function splitText() {
  $$(".split").forEach(el => {
    const text = el.textContent;
    el.innerHTML = "";
    [...text].forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "char";
      s.textContent = ch === " " ? " " : ch;
      s.style.transitionDelay = `${i * 0.04}s`;
      el.appendChild(s);
    });
  });
}

/* ---------- Aparición al hacer scroll ---------- */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
  $$(".reveal, .reveal-img").forEach(el => io.observe(el));
}

/* ---------- Cursor personalizado ---------- */
function initCursor() {
  const c = $("#cursor");
  if (!c || matchMedia("(hover: none)").matches) return;
  const modo = typeof ESTILO_CURSOR !== "undefined" ? ESTILO_CURSOR : "mancha";
  if (modo === "marcador") initMarker();
  // Mancha verde difuminada que sigue al mouse con un poco de retraso
  const blob = document.createElement("div");
  blob.className = "blob";
  if (modo === "mancha") document.body.appendChild(blob);
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, bx = x, by = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; blob.classList.add("on"); });
  document.addEventListener("mouseleave", () => blob.classList.remove("on"));
  (function loop() {
    cx += (x - cx) * 0.25; cy += (y - cy) * 0.25;
    bx += (x - bx) * 0.08; by += (y - by) * 0.08;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    blob.style.transform = `translate(${bx}px, ${by}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", e => {
    const view = e.target.closest("[data-cursor='view']");
    const link = e.target.closest("a, button");
    c.classList.toggle("is-view", !!view);
    blob.classList.toggle("big", !!view || !!link);
    c.classList.toggle("is-hover", !view && !!link);
  });
}

/* ---------- Trazo de marcador: el mouse deja una línea que se borra sola ---------- */
function initMarker() {
  const cv = document.createElement("canvas");
  cv.className = "marker";
  document.body.appendChild(cv);
  const ctx = cv.getContext("2d");
  const hex = (getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0b9e4f").replace("#", "");
  const [r, g, bl] = [0, 2, 4].map(i => parseInt(hex.substr(i, 2), 16));
  // Mezcla el color con blanco según la "vida" del trazo (con multiply, blanco = invisible)
  const tone = k => `rgb(${Math.round(255 - (255 - r) * k)},${Math.round(255 - (255 - g) * k)},${Math.round(255 - (255 - bl) * k)})`;
  const LIFE = 650;          // cuánto dura el trazo (milisegundos)
  const MAX_W = 9;           // grosor máximo del trazo
  let pts = [];
  const size = () => {
    const d = devicePixelRatio || 1;
    cv.width = innerWidth * d; cv.height = innerHeight * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };
  size(); addEventListener("resize", size);
  addEventListener("mousemove", e => pts.push({ x: e.clientX, y: e.clientY, t: performance.now() }));
  addEventListener("scroll", () => (pts = []), { passive: true });
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  (function draw(now) {
    pts = pts.filter(p => now - p.t < LIFE);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i];
      const life = 1 - (now - b.t) / LIFE;
      ctx.strokeStyle = tone(Math.max(0, life));
      ctx.lineWidth = 1.5 + MAX_W * life;
      ctx.beginPath();
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  })(performance.now());
}

/* ---------- Transición suave al cambiar de página ---------- */
function initPageLinks() {
  const curtain = $("#curtain");
  $$("a[href]").forEach(a => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto") || a.target === "_blank") return;
    a.addEventListener("click", e => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      if (curtain) { curtain.classList.remove("is-done"); curtain.classList.add("is-leaving"); }
      else {
        const l = $("#loader");
        if (l) { l.innerHTML = ""; l.classList.remove("is-done"); }
      }
      setTimeout(() => (location.href = href), 700);
    });
  });
}

/* =========================================================
   HOME
   ========================================================= */
function buildHome() {
  // Cinta en movimiento con las categorías
  const cats = [...new Set(PROYECTOS.map(p => p.categoria))];
  const words = [PERFIL.rol, ...cats, "Portfolio"];
  const track = $("#marquee");
  const html = words.map(w => `<span>${w}</span><span>✦</span>`).join("");
  track.innerHTML = html + html; // duplicado para que el loop sea continuo

  // Filtros
  const filters = $("#filters");
  filters.innerHTML = ["Todos", ...cats].map((c, i) =>
    `<button class="${i === 0 ? "active" : ""}" data-filter="${c}">${c}</button>`).join("");

  // Lista de trabajos
  $("#worksCount").textContent = `(${PROYECTOS.length})`;
  $("#worksList").innerHTML = PROYECTOS.map((p, i) => `
    <li class="work reveal" data-cat="${p.categoria}">
      <a href="proyecto.html#${p.id}" data-cursor="view" data-img="${p.portada}">
        <span class="work__num">${String(i + 1).padStart(2, "0")}</span>
        <span class="work__thumb"><img src="${p.portada}" alt="${p.titulo}" loading="lazy" /></span>
        <span class="work__title">${p.titulo}</span>
        <span class="work__cat">${p.categoria}</span>
        <span class="work__year">${p.anio}</span>
      </a>
    </li>`).join("");

  filters.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("button", filters).forEach(x => x.classList.toggle("active", x === b));
    const f = b.dataset.filter;
    $$(".work").forEach(w => w.classList.toggle("hidden", f !== "Todos" && w.dataset.cat !== f));
  });

  // Imagen que sigue al mouse
  const prev = $("#preview"), img = $("#previewImg");
  let x = 0, y = 0, px = 0, py = 0;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  (function loop() {
    px += (x - px) * 0.1; py += (y - py) * 0.1;
    const rot = Math.max(-8, Math.min(8, (x - px) * 0.08));
    prev.style.left = px + "px"; prev.style.top = py + "px";
    prev.style.rotate = rot + "deg";
    requestAnimationFrame(loop);
  })();
  $$(".work a").forEach(a => {
    a.addEventListener("mouseenter", () => { img.src = a.dataset.img; prev.classList.add("show"); });
    a.addEventListener("mouseleave", () => prev.classList.remove("show"));
  });

  // Pantalla de carga: tu nombre escribiéndose
  const loader = $("#loader");
  const shown = sessionStorageSafe("loaded");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (shown || calm) { loader.classList.add("is-done"); start(); return; }
  sessionStorageSafe("loaded", "1");
  writeName(loader, () => { loader.classList.add("is-done"); start(); });

  function start() { setTimeout(() => document.body.classList.add("is-ready"), 250); }
}

/* Pantalla de carga: tu nombre se escribe letra por letra y abajo pasan palabras.
   Para cambiar las palabras, editá PALABRAS_CARGA en proyectos.js */
function writeName(box, done) {
  const words = typeof PALABRAS_CARGA !== "undefined" ? PALABRAS_CARGA : ["Diseño"];
  const line = t => [...t].map(c => `<span class="ld-ch">${c === " " ? "&nbsp;" : c}</span>`).join("");
  box.innerHTML = `<div class="ld">
      <div class="ld-name"><span class="ld-line">${line(PERFIL.nombre)}</span><span class="ld-line ld-last">${line(PERFIL.apellido)}</span></div>
      <div class="ld-word"><span id="ldWord"></span></div>
    </div>`;
  const chars = $$(".ld-ch", box), word = $("#ldWord", box);
  const timers = [];
  const at = (f, ms) => timers.push(setTimeout(f, ms));
  let finished = false;
  const finish = () => { if (finished) return; finished = true; timers.forEach(clearTimeout); done(); };
  box.addEventListener("click", finish, { once: true });   // clic para saltear

  const step = 75;
  chars.forEach((c, i) => at(() => c.classList.add("on"), 200 + i * step));
  const wStart = 200 + chars.length * step * 0.6, wStep = 260;
  words.forEach((w, i) => at(() => {
    word.classList.remove("in"); void word.offsetWidth;
    word.textContent = w; word.classList.add("in");
  }, wStart + i * wStep));
  at(finish, Math.max(200 + chars.length * step, wStart + words.length * wStep) + 450);
}

function sessionStorageSafe(k, v) {
  try { return v === undefined ? sessionStorage.getItem(k) : sessionStorage.setItem(k, v); }
  catch { return null; }
}

/* =========================================================
   PÁGINA DE PROYECTO
   ========================================================= */
function buildProject() {
  const id = location.hash.slice(1) || new URLSearchParams(location.search).get("id");
  let i = PROYECTOS.findIndex(p => p.id === id);
  if (i < 0) i = 0;
  const p = PROYECTOS[i];
  const next = PROYECTOS[(i + 1) % PROYECTOS.length];

  document.title = `${p.titulo} — ${PERFIL.nombre} ${PERFIL.apellido}`;
  $("#pTitle").textContent = p.titulo;
  $("#pCat").textContent = p.categoria;
  $("#pCat2").textContent = p.categoria;
  $("#pYear").textContent = p.anio;
  $("#pMateria").textContent = p.materia || "—";
  $("#pDesc").textContent = p.descripcion;
  $("#pCover").src = p.portada; $("#pCover").alt = p.titulo;
  $("#pGallery").innerHTML = (p.imagenes || []).map(im => `
    <figure>
      <div class="reveal-img"><img src="${im.src}" alt="${im.texto || p.titulo}" loading="lazy" /></div>
      ${im.texto ? `<figcaption>${im.texto}</figcaption>` : ""}
    </figure>`).join("");
  $("#pNext").href = `proyecto.html#${next.id}`;
  $("#pNextTitle").textContent = next.titulo;
  $("#pNext").dataset.cursor = "view";

  const curtain = $("#curtain");
  requestAnimationFrame(() => {
    curtain.classList.add("is-done");
    setTimeout(() => document.body.classList.add("is-ready"), 300);
  });
}

/* ---------- Arranque ---------- */
fillProfile();
if (isHome) buildHome(); else buildProject();
splitText();
initReveal();
initCursor();
initPageLinks();
// Si se vuelve con el botón "atrás", sacar la cortina
addEventListener("pageshow", e => {
  if (e.persisted) {
    const c = $("#curtain"); if (c) { c.classList.remove("is-leaving"); c.classList.add("is-done"); }
    const l = $("#loader"); if (l) l.classList.add("is-done");
  }
});
// En la página de proyecto, si cambia el #, recargar para mostrar el nuevo proyecto
if (!isHome) addEventListener("hashchange", () => location.reload());

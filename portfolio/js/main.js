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
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  (function loop() {
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();
  document.addEventListener("mouseover", e => {
    const view = e.target.closest("[data-cursor='view']");
    const link = e.target.closest("a, button");
    c.classList.toggle("is-view", !!view);
    c.classList.toggle("is-hover", !view && !!link);
  });
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
        if (l) { $$(".fall", l).forEach(f => f.remove()); l.classList.remove("is-done"); }
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

  // Pantalla de carga: letras que caen y se apilan
  const loader = $("#loader");
  const shown = sessionStorageSafe("loaded");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (shown || calm) { loader.classList.add("is-done"); start(); return; }
  sessionStorageSafe("loaded", "1");
  fallingLetters(loader, () => { loader.classList.add("is-done"); start(); });

  function start() { setTimeout(() => document.body.classList.add("is-ready"), 250); }
}

/* Letras cayendo. Para cambiar las palabras, editá PALABRAS_CARGA en proyectos.js */
function fallingLetters(box, done) {
  const words = [PERFIL.nombre, PERFIL.apellido, ...(typeof PALABRAS_CARGA !== "undefined" ? PALABRAS_CARGA : ["Diseño"])];
  const chars = [...words.join("")].filter(c => c.trim());
  const W = innerWidth, H = innerHeight;
  const S = Math.max(30, Math.min(W, H * 1.4) * 0.075 * Math.min(1, Math.sqrt(40 / chars.length)));  // tamaño de letra
  const colW = S * 0.7, cols = Math.max(1, Math.floor(W / colW));
  const heights = new Array(cols).fill(0);
  const items = [];
  let finished = false;
  const finish = () => { if (finished) return; finished = true; setTimeout(done, 350); };
  box.addEventListener("click", finish, { once: true });     // clic para saltear

  // Mezclar el orden para que caigan salteadas
  const order = chars.map((c, i) => ({ c, i })).sort(() => Math.random() - 0.5);
  order.forEach(({ c, i }, k) => {
    const el = document.createElement("span");
    el.className = "fall";
    el.textContent = c;
    el.style.fontSize = S + "px"; el.style.width = S + "px";
    el.style.color = i % 3 === 0 ? "var(--ink)" : "var(--bg)";
    box.appendChild(el);
    const col = Math.floor(Math.random() * (cols - 1));  // se ajusta al caer
    items.push({ el, col, x: col * colW, y: -S * 2 - Math.random() * 40, vy: 0,
      rot: (Math.random() - .5) * 40, vr: (Math.random() - .5) * 4,
      delay: k * Math.min(55, 2400 / chars.length), landed: false, bounces: 0 });
    el.style.transform = `translate(${col * colW}px, ${-S * 3}px)`;
  });

  const t0 = performance.now();
  let last = t0;
  (function tick(now) {
    if (finished) return;
    const dt = Math.min(32, now - last) / 16.7; last = now;
    let active = 0;
    for (const it of items) {
      if (now - t0 < it.delay) { active++; continue; }
      if (it.landed) continue;
      if (!it.started) {   // elegir la columna más baja entre 3 al azar, para que la pila quede pareja
        it.started = true;
        let best = it.col;
        for (let n = 0; n < 3; n++) { const c = Math.floor(Math.random() * (cols - 1)); if (Math.max(heights[c], heights[c + 1]) < Math.max(heights[best], heights[best + 1])) best = c; }
        it.col = best; it.x = best * colW;
      }
      active++;
      it.vy += 0.9 * dt;
      it.y += it.vy * dt;
      it.rot += it.vr * dt;
      const floor = H - Math.max(heights[it.col], heights[it.col + 1] || 0) - S * 1.05;
      if (it.y >= floor) {
        it.y = floor;
        if (it.vy > 6 && it.bounces < 2) { it.vy *= -0.35; it.vr *= 0.5; it.bounces++; }
        else {
          it.landed = true;
          it.rot = it.rot * 0.5; it.el.style.transform = `translate(${it.x}px, ${it.y}px) rotate(${it.rot}deg)`;
          const top = H - it.y - S * 0.5;
          heights[it.col] = top; if (it.col + 1 < cols) heights[it.col + 1] = Math.max(heights[it.col + 1], top - S * 0.4);
        }
      }
      it.el.style.transform = `translate(${it.x}px, ${it.y}px) rotate(${it.rot}deg)`;
    }
    if (active === 0) finish(); else requestAnimationFrame(tick);
  })(t0);
  setTimeout(finish, 6000); // por las dudas, nunca más de 6 segundos
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

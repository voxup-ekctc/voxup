// shared helpers: scroll progress, reveal-on-scroll, parallax blobs
const $ = (s, r = document) => r.querySelector(s);
const initials = n => n.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
const photoHTML = m => `<img src="${m.photo}" alt="${m.name}" onerror="this.parentNode.textContent='${initials(m.name)}'">`;

function startEffects() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  }), { threshold: .15 });
  document.querySelectorAll(".reveal").forEach((el, i) => { if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", (i % 4) * .1 + "s"); io.observe(el); });

  const bar = $("#progress"), blobs = document.querySelectorAll(".blob");
  addEventListener("scroll", () => {
    const y = scrollY, max = document.body.scrollHeight - innerHeight;
    bar.style.width = (y / max * 100) + "%";
    blobs.forEach((b, i) => b.style.transform = `translateY(${y * (i + 1) * .08}px)`);
  }, { passive: true });
}

function tilt(el) {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    el.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
  });
  el.addEventListener("mouseleave", () => el.style.transform = "");
}

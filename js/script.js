/* ==========================================================================
   PORTFOLIO — LAMINE — BTS SIO SLAM
   ========================================================================== */

/* --------------------------------------------------------------------------
   0. CONFIG — Modifiez uniquement les valeurs ci-dessous pour personnaliser
      vos informations de contact et vos réseaux sociaux. Elles sont
      automatiquement injectées dans toute la page.
   -------------------------------------------------------------------------- */
const CONFIG = {
  fullName: "Baye Lamine Gueye",
  role: "Développeur Web Full-Stack",
  email: "bayelamine.gueye19@gmail.com",
  phone: "+33 7 59 06 20 43",

  // Numéro WhatsApp au format international, SANS "+", espaces ni tirets
  whatsappNumber: "33759062043",
  whatsappMessage: "Bonjour Lamine, je vous contacte suite à la consultation de votre portfolio.",

  linkedin: "https://www.linkedin.com/in/baye-lamine-gueye-b760a8341",
  instagram: "https://www.instagram.com/votre_compte",
  github: "https://github.com/kw2cq74brx-dotcom/PORTFOLIO-OF-LAMINE",
  website: "https://votre-site-vitrine.com",

  mdsAvisUrl: "https://mds-avis-frontend.vercel.app",
  pythonProjectUrl: "https://github.com/votre-compte/projet-python"
};

CONFIG.emailHref = `mailto:${CONFIG.email}`;
CONFIG.phoneHref = `tel:${CONFIG.phone.replace(/\s+/g, "")}`;
CONFIG.whatsappLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;

/* --------------------------------------------------------------------------
   1. INJECT CONFIG INTO DOM
   -------------------------------------------------------------------------- */
function applyConfig() {
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.dataset.config;
    if (CONFIG[key] !== undefined) el.textContent = CONFIG[key];
  });

  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const key = el.dataset.configHref;
    if (CONFIG[key] !== undefined) el.setAttribute("href", CONFIG[key]);
  });
}

/* --------------------------------------------------------------------------
   2. PRELOADER
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 500);
  });
}

/* --------------------------------------------------------------------------
   3. CUSTOM CURSOR
   -------------------------------------------------------------------------- */
function initCursor() {
  const glow = document.getElementById("cursorGlow");
  const dot = document.getElementById("cursorDot");
  if (!glow || !dot || window.matchMedia("(hover: none)").matches) return;

  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

/* --------------------------------------------------------------------------
   4. HEADER SCROLL STATE + ACTIVE NAV LINK
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("[data-nav]");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   5. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("navMobile");
  const scrim = document.getElementById("navScrim");
  const links = mobileNav.querySelectorAll("a");

  function closeNav() {
    toggle.classList.remove("active");
    mobileNav.classList.remove("open");
    scrim.classList.remove("visible");
    document.body.classList.remove("no-scroll");
  }

  function openNav() {
    toggle.classList.add("active");
    mobileNav.classList.add("open");
    scrim.classList.add("visible");
    document.body.classList.add("no-scroll");
  }

  toggle.addEventListener("click", () => {
    mobileNav.classList.contains("open") ? closeNav() : openNav();
  });

  scrim.addEventListener("click", closeNav);
  links.forEach((link) => link.addEventListener("click", closeNav));
}

/* --------------------------------------------------------------------------
   6. TYPED ROLE ROTATION
   -------------------------------------------------------------------------- */
function initTypedRole() {
  const el = document.getElementById("typedRole");
  if (!el) return;

  const roles = [
    "Développeur Web Full-Stack",
    "Administrateur Systèmes & Réseaux",
    "Passionné de Cybersécurité",
    "Concepteur de Bases de Données"
  ];

  let roleIndex = 0, charIndex = roles[0].length, deleting = false;

  function tick() {
    const current = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    el.textContent = current.slice(0, charIndex);

    let delay = deleting ? 35 : 60;

    if (!deleting && charIndex === current.length) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    setTimeout(tick, delay);
  }

  setTimeout(tick, 1800);
}

/* --------------------------------------------------------------------------
   7. SCROLL REVEAL
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("in-view"), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  items.forEach((item) => observer.observe(item));
}

/* --------------------------------------------------------------------------
   8. ANIMATED COUNTERS
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.counter, 10);
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));

      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        el.textContent = current;
      }, 35);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   9. BACK TO TOP
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* --------------------------------------------------------------------------
   10. FOOTER YEAR
   -------------------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   11. SCROLL PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   12. CURSOR-TRACKING SPOTLIGHT (cards)
   -------------------------------------------------------------------------- */
function initSpotlight() {
  if (window.matchMedia("(hover: none)").matches) return;

  const cards = document.querySelectorAll(
    ".skill-block, .project-card, .timeline-card, .social-card, .highlight-card, .contact-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    });
  });
}

/* --------------------------------------------------------------------------
   13. MAGNETIC BUTTONS
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia("(hover: none)").matches) return;

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transition = "transform .15s ease-out";
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35 - 3}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transition = "transform .4s cubic-bezier(.2,.8,.2,1)";
      btn.style.transform = "translate(0, 0)";
    });
  });
}

/* --------------------------------------------------------------------------
   14. 3D TILT (photo frames)
   -------------------------------------------------------------------------- */
function initTilt() {
  if (window.matchMedia("(hover: none)").matches) return;

  // .project-card is excluded here: its transform is fully owned by the
  // projects carousel (initProjectsCarousel), which would otherwise fight
  // this mousemove-driven inline transform for the same CSS property.
  const softTilt = document.querySelectorAll(".hero-photo-frame, .about-photo-frame");

  function bindTilt(el, maxDeg, lift) {
    const extra = "border-color .4s ease, box-shadow .4s ease";

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transition = `transform .1s ease-out, ${extra}`;
      el.style.transform =
        `perspective(1000px) rotateX(${(-py * maxDeg).toFixed(2)}deg) ` +
        `rotateY(${(px * maxDeg).toFixed(2)}deg) translateY(${lift}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transition = `transform .5s cubic-bezier(.2,.8,.2,1), ${extra}`;
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  }

  softTilt.forEach((el) => bindTilt(el, 8, 0));
}

/* --------------------------------------------------------------------------
   15.5 CV GENERATION — build a PDF live from the page's own content
   -------------------------------------------------------------------------- */
function textFrom(scope, selector) {
  const el = scope.querySelector(selector);
  return el ? el.textContent.trim().replace(/\s+/g, " ") : "";
}

function listFrom(scope, selector) {
  return Array.from(scope.querySelectorAll(selector))
    .map((el) => el.textContent.trim().replace(/\s+/g, " "))
    .join(", ");
}

function generateCvPdf() {
  if (!window.jspdf) {
    alert("Le générateur de CV est en cours de chargement, réessayez dans un instant.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const maxWidth = pageWidth - marginX * 2;
  let y = 56;

  const accent = [36, 107, 255];
  const dark = [20, 22, 40];
  const gray = [95, 100, 120];

  function ensureSpace(h) {
    if (y + h > pageHeight - 48) {
      doc.addPage();
      y = 56;
    }
  }

  function sectionTitle(title) {
    ensureSpace(34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...accent);
    doc.text(title.toUpperCase(), marginX, y);
    y += 6;
    doc.setDrawColor(...accent);
    doc.setLineWidth(1);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 18;
  }

  function paragraph(text, { size = 9.5, color = gray, gap = 13, bold = false } = {}) {
    if (!text) return;
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    doc.splitTextToSize(text, maxWidth).forEach((line) => {
      ensureSpace(gap);
      doc.text(line, marginX, y);
      y += gap;
    });
  }

  function entryHeader(title, period) {
    ensureSpace(15);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...dark);
    doc.text(title, marginX, y);
    if (period) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...accent);
      doc.text(period, pageWidth - marginX, y, { align: "right" });
    }
    y += 14;
  }

  // ---- Header ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(...dark);
  doc.text(CONFIG.fullName.toUpperCase(), marginX, y);
  y += 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...accent);
  doc.text(CONFIG.role, marginX, y);
  y += 18;

  paragraph([CONFIG.email, CONFIG.phone, CONFIG.linkedin, CONFIG.github].filter(Boolean).join("   |   "), {
    size: 9,
    gap: 12
  });

  y += 10;
  doc.setDrawColor(...accent);
  doc.setLineWidth(1.4);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 24;

  // ---- Profil (À propos) ----
  const aboutEl = document.getElementById("apropos");
  if (aboutEl) {
    sectionTitle("Profil");
    const aboutText = Array.from(aboutEl.querySelectorAll(".about-text > p"))
      .map((p) => p.textContent.trim().replace(/\s+/g, " "))
      .join(" ");
    paragraph(aboutText, { gap: 12.5 });
    y += 8;
  }

  // ---- Formations ----
  const formationsEl = document.getElementById("formations");
  if (formationsEl) {
    sectionTitle("Formations");
    formationsEl.querySelectorAll(".timeline-item").forEach((item) => {
      entryHeader(textFrom(item, ".tl-title"), textFrom(item, ".tl-period"));
      paragraph(textFrom(item, ".tl-meta"), { size: 9, bold: true, gap: 12 });
      paragraph(textFrom(item, ".tl-desc"), { size: 9, gap: 12 });
      y += 8;
    });
  }

  // ---- Compétences ----
  const competencesEl = document.getElementById("competences");
  if (competencesEl) {
    sectionTitle("Compétences");
    competencesEl.querySelectorAll(".skill-block").forEach((block) => {
      entryHeader(textFrom(block, "h3"), "");
      paragraph(listFrom(block, ".skill-tags span, .sc-label"), { size: 9, gap: 12 });
      y += 6;
    });
  }

  // ---- Expériences professionnelles ----
  const experiencesEl = document.getElementById("experiences");
  if (experiencesEl) {
    sectionTitle("Expériences Professionnelles");
    experiencesEl.querySelectorAll(".timeline-item").forEach((item) => {
      entryHeader(textFrom(item, ".tl-title"), textFrom(item, ".tl-period"));
      paragraph(textFrom(item, ".tl-meta"), { size: 9, bold: true, gap: 12 });
      paragraph(textFrom(item, ".tl-desc"), { size: 9, gap: 12 });
      y += 8;
    });
  }

  // ---- Projets ----
  const projetsEl = document.getElementById("projets");
  if (projetsEl) {
    sectionTitle("Projets");
    projetsEl.querySelectorAll(".project-card").forEach((card) => {
      entryHeader(textFrom(card, "h3"), "");
      paragraph(textFrom(card, ".project-body > p"), { size: 9, gap: 12 });
      paragraph(listFrom(card, ".project-tags span"), { size: 8.5, color: accent, gap: 12 });
      y += 8;
    });
  }

  doc.save(`CV-${CONFIG.fullName.replace(/\s+/g, "-")}.pdf`);
}

function initCvDownload() {
  const btn = document.getElementById("downloadCvBtn");
  if (!btn) return;
  btn.addEventListener("click", generateCvPdf);
}

/* --------------------------------------------------------------------------
   14.5 PROXIMITY SCALE GRID (Compétences skill icons)
   -------------------------------------------------------------------------- */
function initProximityGrids() {
  if (typeof gsap === "undefined") return;
  if (window.matchMedia("(hover: none)").matches) return;

  const radius = 120;
  const maxScale = 1.8;
  const dur = 0.35;

  document.querySelectorAll(".skill-stage").forEach((stage) => {
    const cards = gsap.utils.toArray(stage.querySelectorAll(".skill-card"));

    stage.addEventListener("mousemove", (e) => {
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const d = Math.hypot(
          e.clientX - (r.left + r.width / 2),
          e.clientY - (r.top + r.height / 2)
        );
        const p = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, radius, 1, 0, d));
        gsap.to(card, {
          scale: 1 + (maxScale - 1) * p,
          duration: dur,
          overwrite: true,
          ease: "power2.out"
        });
      });
    });

    stage.addEventListener("mouseleave", () => {
      cards.forEach((card) => {
        gsap.to(card, { scale: 1, duration: dur * 2, overwrite: true, ease: "power2.out" });
      });
    });
  });
}

/* --------------------------------------------------------------------------
   14.6 PROJECTS 3D DRAG CAROUSEL
   -------------------------------------------------------------------------- */
function initProjectsCarousel() {
  const stage = document.getElementById("carouselStage");
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");
  if (!stage || !track || !dotsWrap || typeof gsap === "undefined") return;

  const cards = Array.from(track.querySelectorAll(".project-card"));
  if (!cards.length) return;

  let activeIndex = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Aller au projet ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function transformFor(offset) {
    const abs = Math.abs(offset);
    if (abs === 0) {
      return { xPercent: -50, z: 0, rotationY: 0, scale: 1, opacity: 1, zIndex: 30, pointerEvents: "auto" };
    }
    if (abs === 1) {
      return {
        xPercent: -50 + offset * 62,
        z: -240,
        rotationY: offset * -34,
        scale: 0.82,
        opacity: 0.5,
        zIndex: 20,
        pointerEvents: "none"
      };
    }
    return {
      xPercent: -50 + offset * 95,
      z: -440,
      rotationY: offset * -42,
      scale: 0.6,
      opacity: 0,
      zIndex: 10,
      pointerEvents: "none"
    };
  }

  function syncHeight() {
    stage.style.height = `${cards[activeIndex].offsetHeight}px`;
  }

  function render(animate) {
    cards.forEach((card, i) => {
      const t = transformFor(i - activeIndex);
      gsap[animate ? "to" : "set"](card, { ...t, duration: 0.7, ease: "power3.out", overwrite: true });
    });
    dots.forEach((d, i) => d.classList.toggle("active", i === activeIndex));
    syncHeight();
  }

  function goTo(index) {
    activeIndex = (index + cards.length) % cards.length;
    render(true);
  }

  prevBtn.addEventListener("click", () => goTo(activeIndex - 1));
  nextBtn.addEventListener("click", () => goTo(activeIndex + 1));

  let startX = 0;
  let dragX = 0;
  let dragging = false;

  stage.addEventListener("pointerdown", (e) => {
    if (e.target.closest("a, button")) return;
    dragging = true;
    startX = e.clientX;
    stage.setPointerCapture(e.pointerId);
  });

  stage.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dragX = e.clientX - startX;
    const nudge = gsap.utils.clamp(-18, 18, dragX / 8);
    gsap.set(cards[activeIndex], { xPercent: -50 + nudge });
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    if (dragX < -60) goTo(activeIndex + 1);
    else if (dragX > 60) goTo(activeIndex - 1);
    else render(true);
    dragX = 0;
  }

  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);

  document.addEventListener("keydown", (e) => {
    const r = stage.getBoundingClientRect();
    const inView = r.top < window.innerHeight && r.bottom > 0;
    if (!inView) return;
    if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    if (e.key === "ArrowRight") goTo(activeIndex + 1);
  });

  window.addEventListener("resize", syncHeight);

  render(false);
}

/* --------------------------------------------------------------------------
   15. CURSOR HOVER STATE
   -------------------------------------------------------------------------- */
function initCursorHoverState() {
  const dot = document.getElementById("cursorDot");
  if (!dot || window.matchMedia("(hover: none)").matches) return;

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button")) dot.classList.add("is-hovering");
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button")) dot.classList.remove("is-hovering");
  });
}

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initPreloader();
  initCursor();
  initHeader();
  initMobileNav();
  initTypedRole();
  initScrollReveal();
  initCounters();
  initBackToTop();
  initFooterYear();
  initScrollProgress();
  initSpotlight();
  initMagneticButtons();
  initTilt();
  initCursorHoverState();
  initCvDownload();
  initProximityGrids();
  initProjectsCarousel();
});

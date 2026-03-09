// main.js

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1. スクロールでふわっと表示
  // =========================

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const fadeEls = document.querySelectorAll(".fade-in");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    fadeEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  // =========================
  // 2. ヒーローテキストのstaggeredアニメーション
  // =========================

  const heroEls = document.querySelectorAll(".hero-animate");

  if (prefersReducedMotion) {
    heroEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    heroEls.forEach((el) => {
      const delay = parseInt(el.dataset.delay || "0", 10);
      setTimeout(() => {
        el.classList.add("is-visible");
      }, delay + 200); // page load offset
    });
  }

  // =========================
  // 3. コピーライトの年号自動更新
  // =========================
  const yearEl = document.getElementById("js-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================
  // 4. スクロール後にナビ背景固定
  // =========================
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    const onScroll = () => {
      if (window.scrollY > 60) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // 初期チェック
  }
});

// =========================
// モバイルナビ（ハンバーガー）
// =========================
const navToggle = document.querySelector(".nav-toggle");
const globalNav = document.querySelector("#global-nav");

if (navToggle && globalNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  const navLinks = globalNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768 && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  document.addEventListener(
    "click",
    (event) => {
      if (!document.body.classList.contains("nav-open")) return;
      if (event.target.closest(".nav-toggle")) return;
      if (event.target.closest("#global-nav a")) return;
      closeNav();
    },
    true
  );
}

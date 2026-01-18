// main.js

document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // 1. スクロールでふわっと表示
    // =========================
  
    // 動きを減らす設定のユーザーへの配慮
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  
    const fadeEls = document.querySelectorAll(".fade-in");
  
    // 動画NG設定 or 非対応ブラウザ → 最初から全部表示
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      fadeEls.forEach((el) => {
        el.classList.add("is-visible");
      });
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target); // 1回表示したら監視解除
            }
          });
        },
        {
          threshold: 0.15, // 要素の15%くらい見えたら発火
        }
      );
  
      fadeEls.forEach((el) => observer.observe(el));
    }
  
    // =========================
    // 2. コピーライトの年号自動更新
    // =========================
    const yearEl = document.getElementById("js-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });

// =========================
// モバイルナビ（ハンバーガー）
// =========================
const navToggle = document.querySelector(".nav-toggle");
const globalNav = document.querySelector("#global-nav");

if (navToggle && globalNav) {
  // ハンバーガーボタンを押したとき
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // メニュー内リンクを押したら閉じる
  const navLinks = globalNav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768 && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // ★ 黒い部分（文字以外）をタップしたら閉じる
  globalNav.addEventListener("click", (event) => {
    // メニューが開いていないなら何もしない
    if (!document.body.classList.contains("nav-open")) return;

    // リンク(a)を押した時は、既存の「リンクで閉じる」処理に任せる
    if (event.target.closest("a")) return;

    // リンク以外（背景）を押したら閉じる
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });

}

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
  
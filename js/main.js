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
  const closeNav = () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };
  

// // ★ 黒くない部分（ヘッダーなど）をタップしても閉じる（外側クリック）
// document.addEventListener("click", (event) => {
//   // メニューが開いていないなら何もしない
//   if (!document.body.classList.contains("nav-open")) return;

//   // ハンバーガーボタン自身を押した時はトグル処理に任せる
//   if (event.target.closest(".nav-toggle")) return;

//   // モーダル（global-nav）内を押した時は、globalNav側の処理に任せる
//   if (event.target.closest("#global-nav")) return;

//   // それ以外（= 黒くないところ含む）を押したら閉じる
//   closeNav();
// });
  // ★ どこをタップしても（リンク以外なら）閉じる：黒背景もヘッダーもOK
  document.addEventListener(
    "click",
    (event) => {
      if (!document.body.classList.contains("nav-open")) return;

      // ハンバーガー自身はトグルに任せる
      if (event.target.closest(".nav-toggle")) return;

      // メニューリンクを押した時はスクロール＋閉じる処理に任せる
      if (event.target.closest("#global-nav a")) return;

      // それ以外は全部閉じる（黒い背景／黒くない場所どちらも）
      closeNav();
    },
    true // ← これが重要（キャプチャで確実に拾う）
  );


}

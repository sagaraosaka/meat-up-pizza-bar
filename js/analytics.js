// analytics.js

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  if (typeof window.gtag !== "function") return;

  const href = link.getAttribute("href") || "";
  const loc = link.dataset.loc;

  if (href.startsWith("tel:")) {
    window.gtag("event", "tel_click", loc ? { location: loc } : {});
  } else if (href.includes("tabelog.com")) {
    window.gtag("event", "tabelog_click", loc ? { location: loc } : {});
  } else if (href.includes("instagram.com")) {
    window.gtag("event", "instagram_click", loc ? { location: loc } : {});
  } else if (link.classList.contains("hero-party-banner")) {
    window.gtag("event", "party_banner_click", {});
  } else if (
    link.classList.contains("fixed-cta-party") ||
    link.closest("#party .party-cta-row")
  ) {
    const button = link.dataset.button;
    window.gtag("event", "party_cta_click", button ? { button } : {});
  }
});

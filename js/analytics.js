// analytics.js

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  if (typeof window.gtag !== "function") return;

  const href = link.getAttribute("href") || "";
  const loc = link.dataset.loc;

  if (href.startsWith("tel:")) {
    gtag("event", "tel_click", loc ? { location: loc } : {});
  } else if (href.includes("tabelog.com")) {
    gtag("event", "tabelog_click", loc ? { location: loc } : {});
  } else if (href.includes("instagram.com")) {
    gtag("event", "instagram_click", loc ? { location: loc } : {});
  } else if (link.classList.contains("hero-party-banner")) {
    gtag("event", "party_banner_click", {});
  } else if (
    link.classList.contains("fixed-cta-party") ||
    link.closest("#party .party-cta-row")
  ) {
    const button = link.dataset.button;
    gtag("event", "party_cta_click", button ? { button } : {});
  }
});

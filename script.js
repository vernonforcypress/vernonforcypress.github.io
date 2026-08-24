const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function sendGaEvent(name, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href") || "";

  if (href.includes("secure.anedot.com")) {
    let location = "other";
    if (link.classList.contains("mobile-donate")) location = "mobile_header";
    else if (link.classList.contains("donate-link")) location = "desktop_header";
    else if (link.closest("#involved")) location = "get_involved";
    sendGaEvent("donate_click", { button_location: location });
    return;
  }

  if (href.startsWith("mailto:")) {
    sendGaEvent("email_click", { link_location: "contact" });
    return;
  }

  if (href.startsWith("tel:")) {
    sendGaEvent("phone_click", { link_location: "contact" });
    return;
  }

  if (href.includes("instagram.com")) {
    sendGaEvent("social_click", { platform: "instagram", link_location: "contact" });
    return;
  }

  if (href.includes("facebook.com")) {
    sendGaEvent("social_click", { platform: "facebook", link_location: "contact" });
  }
});

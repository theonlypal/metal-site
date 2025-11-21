document.addEventListener("DOMContentLoaded", () => {
  const landing = document.getElementById("landing");
  const metalIcon = document.getElementById("metalIcon");
  const app = document.getElementById("app");
  const backToLanding = document.getElementById("backToLanding");
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".section");

  const lightbox = document.getElementById("lightbox");
  const lightboxContent = document.getElementById("lightboxContent");
  const lightboxClose = document.getElementById("lightboxClose");

  // Helpers
  const showApp = () => {
    landing.classList.add("hidden");
    app.classList.remove("hidden");
  };

  const showLanding = () => {
    app.classList.add("hidden");
    landing.classList.remove("hidden");
  };

  const setActiveSection = (sectionId) => {
    sections.forEach((section) => {
      section.classList.toggle(
        "active",
        section.id === `section-${sectionId}`
      );
    });

    menuItems.forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.section === sectionId
      );
    });
  };

  const openLightbox = (mediaElement) => {
    lightboxContent.innerHTML = "";
    const clone = mediaElement.cloneNode(true);

    // Ensure videos play muted/looped
    if (clone.tagName.toLowerCase() === "video") {
      clone.controls = true;
      clone.muted = false;
      clone.loop = true;
      clone.autoplay = true;
    }

    lightboxContent.appendChild(clone);
    lightbox.classList.remove("hidden");
  };

  const closeLightbox = () => {
    lightbox.classList.add("hidden");
    lightboxContent.innerHTML = "";
  };

  /* Events */

  // Enter site
  metalIcon.addEventListener("click", showApp);

  // Back to black screen
  backToLanding.addEventListener("click", showLanding);

  // Switch sections
  menuItems.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      setActiveSection(section);
    });
  });

  // Card click => lightbox
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const media =
        card.querySelector("img") || card.querySelector("video");
      if (!media) return;
      openLightbox(media);
    });
  });

  // Lightbox close
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ESC handling
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!lightbox.classList.contains("hidden")) {
        closeLightbox();
      } else if (!app.classList.contains("hidden")) {
        showLanding();
      }
    }
  });
});

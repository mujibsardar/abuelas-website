// initialization

const RESPONSIVE_WIDTH = 1024;

let headerWhiteBg = false;
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");

function onHeaderClickOutside(e) {
  if (!collapseHeaderItems.contains(e.target)) {
    toggleHeader();
  }
}

function toggleHeader() {
  if (isHeaderCollapsed) {
    // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
    collapseHeaderItems.classList.add("opacity-100");
    collapseHeaderItems.style.width = "60vw";
    collapseBtn.classList.remove("bi-list");
    collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
    isHeaderCollapsed = false;

    setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
  } else {
    collapseHeaderItems.classList.remove("opacity-100");
    collapseHeaderItems.style.width = "0vw";
    collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
    collapseBtn.classList.add("bi-list");
    isHeaderCollapsed = true;
    window.removeEventListener("click", onHeaderClickOutside);
  }
}

function responsive() {
  if (window.innerWidth > RESPONSIVE_WIDTH) {
    collapseHeaderItems.style.width = "";
  } else {
    isHeaderCollapsed = true;
  }
}

window.addEventListener("resize", responsive);

/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger);

gsap.to(".reveal-hero-text", {
  opacity: 0,
  y: "100%",
});

gsap.to(".reveal-hero-img", {
  opacity: 0,
  y: "100%",
});

gsap.to("#hero-img-bg", {
  scale: 0,
});

gsap.to(".reveal-up", {
  opacity: 0,
  y: "100%",
});

window.addEventListener("load", () => {
  // animate from initial position
  gsap.to(".reveal-hero-text", {
    opacity: 1,
    y: "0%",
    duration: 0.8,
    // ease: "power3.out",
    stagger: 0.5, // Delay between each word's reveal,
    // delay: 3
  });

  gsap.to(".reveal-hero-img", {
    opacity: 1,
    y: "0%",
  });

  gsap.to("#hero-img-bg", {
    scale: 1,
    duration: 0.8,
    delay: 0.4,
  });
});

// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section");

sections.forEach((sec) => {
  const revealUptimeline = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: sec,
      start: "10% 80%", // top of trigger hits the top of viewport
      end: "20% 90%",
      // markers: true,
      // scrub: 1,
    },
  });

  revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
    opacity: 1,
    duration: 0.8,
    y: "0%",
    stagger: 0.2,
  });
});

// ------------- download app ---------------
const downloadLink = document.getElementById("download-link");
const downloadText = document.getElementById("download-text");

const appStoreLink = "https://apps.apple.com/us/app/abuelas/id6740445540"; // Replace with your actual App Store URL

function updateDownloadLink() {
  const ua = navigator.userAgent;
  let linkSupported = false;

  if (/iPhone|iPad|iPod/i.test(ua)) {
    downloadLink.href = appStoreLink;
    linkSupported = true;
  }

  if (!linkSupported) {
    downloadLink.href = "#";
    downloadLink.onclick = (e) => {
      e.preventDefault();
      alert(
        "Your platform is currently not supported. The app is only available for iOS devices at this time."
      );
    };
    downloadText.textContent = "App Unavailable for your Platform";
  }
}

document.addEventListener("DOMContentLoaded", updateDownloadLink);

// ------------- TikTok autoplay functionality ---------------
function initTikTokAutoplay() {
  const tiktokContainer = document.getElementById('tiktok-container');
  if (!tiktokContainer) return;

  // Create intersection observer to detect when TikTok section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // TikTok section is in view - trigger autoplay
        // The TikTok embed script will handle the actual autoplay
        console.log('TikTok section in view - video should autoplay');
      }
    });
  }, {
    threshold: 0.5, // Trigger when 50% of the container is visible
    rootMargin: '0px 0px -100px 0px' // Trigger slightly before fully in view
  });

  // Start observing the TikTok container
  observer.observe(tiktokContainer);
}

// Initialize TikTok autoplay functionality
document.addEventListener('DOMContentLoaded', initTikTokAutoplay);

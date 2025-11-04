// Part 2: JavaScript Functions — Scope, Parameters & Return Values

// Utility function: toggle theme (demonstrates scope and return values)
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  return isDark;
}

// Helper: apply animation class to an element, with duration multiplier
function applyAnimation(element, animationClass, speed = 1) {
  // Remove existing animation classes
  const animations = ["rotate", "bounce", "shake", "scale"];
  animations.forEach((a) => element.classList.remove(a));

  // Apply new animation
  element.classList.add(animationClass);
  element.style.animationDuration = `${1 / speed}s`;

  // Return a cleanup function to stop the animation
  return () => {
    element.classList.remove(animationClass);
    element.style.animationDuration = "";
  };
}

// Function demonstrating local vs global scope
const globalCounter = (function () {
  // IIFE returns an object with increment/get, demonstrating closures
  let counter = 0; // local to the closure
  return {
    increment: function () {
      counter += 1;
      return counter;
    },
    get: function () {
      return counter;
    },
  };
})();

// Part 3: Combining CSS Animations with JavaScript (event wiring)

document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeBtn = document.getElementById("themeToggle");
  themeBtn.addEventListener("click", () => {
    const dark = toggleTheme();
    themeBtn.textContent = dark ? "Light Theme" : "Dark Theme";
  });

  // Card flip interactions
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // Toggle flip class to trigger CSS transform
      card.classList.toggle("flipped");
      // Change color based on data-color attribute using a function
      const color = card.dataset.color;
      changeCardColor(card, color);
    });
  });

  // Animation control buttons
  const animatedElement = document.querySelector(".animated-element");
  const controlButtons = document.querySelectorAll(".control-btn");
  let cleanup = null;

  controlButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const animation = btn.dataset.animation;
      // speed slider
      const speed = parseFloat(document.getElementById("animationSpeed").value);
      if (cleanup) cleanup();
      cleanup = applyAnimation(animatedElement, animation, speed);
      // demonstrate use of function with return value
      console.log(`Animation applied: ${animation} at ${speed}x`);
    });
  });

  // Animation speed control
  const speedInput = document.getElementById("animationSpeed");
  const speedValue = document.getElementById("speedValue");
  speedInput.addEventListener("input", () => {
    speedValue.textContent = `${speedInput.value}x`;
  });

  // Loading toggle
  const toggleLoading = document.getElementById("toggleLoading");
  const loaderContainer = document.querySelector(".loader-container");
  toggleLoading.addEventListener("click", () => {
    const isActive = loaderContainer.classList.toggle("active");
    toggleLoading.textContent = isActive ? "Stop Loading" : "Start Loading";
  });

  // Ripple effect on click (demonstrates event coordinates)
  const rippleContainer = document.getElementById("ripple-container");
  document.addEventListener("click", (e) => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${e.clientX - 25}px`;
    ripple.style.top = `${e.clientY - 25}px`;
    ripple.style.width = ripple.style.height = "50px";
    rippleContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    // increment and log the global counter as a demo of closure
    const value = globalCounter.increment();
    console.log("Global counter:", value);
  });
});

// Function to change card color (shows parameter use and DOM manipulation)
function changeCardColor(card, colorName) {
  const colorMap = {
    blue: "#4a90e2",
    green: "#2ecc71",
    purple: "#9b59b6",
  };
  const color = colorMap[colorName] || "#bdc3c7";
  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");
  front.style.backgroundColor = color;
  back.style.backgroundColor = shadeColor(color, -15);
}

// Utility: shade color (returns darker/lighter hex) - demonstrates return value
function shadeColor(hex, percent) {
  // hex -> RGB
  const num = parseInt(hex.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
}


// ---------- Mobile navigation ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// ---------- Dark / light theme ----------
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("jenish-portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

function updateThemeButton() {
  const isDark = document.body.classList.contains("dark");

  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
}

updateThemeButton();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem("jenish-portfolio-theme", theme);
  updateThemeButton();
});

// ---------- Project category filters ----------
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;

      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const matches =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.hidden = !matches;
    });
  });
});

// ---------- Automatic footer year ----------
document.getElementById("year").textContent =
  new Date().getFullYear();

// ---------- Contact form ----------
// Replace this with your actual email address.
const CONTACT_EMAIL = "jenishchisla29@gmail.com";

const emailLink = document.getElementById("emailLink");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

emailLink.href = `mailto:${CONTACT_EMAIL}`;
emailLink.textContent = CONTACT_EMAIL;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const senderEmail = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (!name || !senderEmail || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
  );

  formStatus.textContent =
    "Opening your email application. Please send the prepared email.";

  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

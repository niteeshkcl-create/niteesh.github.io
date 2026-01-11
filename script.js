// Smooth theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
  if (storedTheme === "light") themeToggle.textContent = "☼";
}

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  themeToggle.textContent = next === "light" ? "☼" : "☾";
});

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach(card => {
      if (filter === "all") {
        card.style.display = "flex";
      } else {
        const tags = card.dataset.tags.split(" ");
        card.style.display = tags.includes(filter) ? "flex" : "none";
      }
    });
  });
});

// Expand / collapse project details
document.querySelectorAll(".project-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");
    const open = card.classList.toggle("open");
    btn.textContent = open ? "Hide details" : "Details";
  });
});

// Fake contact form submit
function handleSubmit(e) {
  e.preventDefault();
  alert("Thanks for reaching out! Replace this with your form backend (e.g., Formspree, Getform, or a custom API).");
  e.target.reset();
}
window.handleSubmit = handleSubmit;

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Prevent Formspree redirect - stay on page
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch(this.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          // Show success message on SAME PAGE
          this.innerHTML = '<p style="color: #10b981; text-align: center; font-weight: 500;"> Thanks! Message sent.</p>';
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        alert('Something went wrong. Please try again.');
      });
});

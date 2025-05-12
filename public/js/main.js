const activeNavLinks = document.querySelectorAll(".navbar-nav .nav-link");

// Add active class to the active nav link on navbar
activeNavLinks.forEach((link) => {
  if (
    link.pathname === window.location.pathname &&
    !link.classList.contains("dropdown-toggle")
  ) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

const mainEl = document.querySelector("#main");
const footerEl = document.querySelector("#footer");

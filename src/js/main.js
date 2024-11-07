import "/src/styles/style.css";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Função para toggle do menu mobile
  function toggleMobileMenu() {
    hamburgerMenu.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  }

  // Event listener para o botão hamburger
  hamburgerMenu.addEventListener("click", toggleMobileMenu);

  // Fecha o menu ao clicar em um link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      toggleMobileMenu();
    });
  });

  // Background do header no scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Scroll suave para as âncoras
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 127;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

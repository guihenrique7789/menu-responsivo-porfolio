class Navbar {
  constructor() {
    this.toggleButton = document.querySelector(".menu-toggle");
    this.navMenu = document.querySelector(".nav-links");
    this.links = document.querySelectorAll("[data-panel]");
    this.panels = document.querySelectorAll(".panel");
    this.overlay = document.querySelector(".overlay");

    this.bindEvents();
  }

  bindEvents() {
    this.toggleButton.addEventListener("click", () => {
      const isOpen = this.navMenu.classList.toggle("open");
      this.toggleButton.setAttribute("aria-expanded", isOpen);
    });

    this.links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        this.openPanel(link.dataset.panel);
        this.navMenu.classList.remove("open");
        this.toggleButton.setAttribute("aria-expanded", "false");
      });
    });

    this.panels.forEach(panel => {
      panel.querySelector(".close-panel")
        .addEventListener("click", () => this.closePanels());
    });

    this.overlay.addEventListener("click", () => {
      this.closePanels();
      this.navMenu.classList.remove("open");
      this.toggleButton.setAttribute("aria-expanded", "false");
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.closePanels();
        this.navMenu.classList.remove("open");
      }
    });
  }

  openPanel(name) {
    this.closePanels();

    const panel = [...this.panels].find(
      p => p.dataset.panelContent === name
    );
    if (!panel) return;

    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");

    this.overlay.classList.add("show");
    this.overlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  closePanels() {
    this.panels.forEach(p => {
      p.classList.remove("open");
      p.setAttribute("aria-hidden", "true");
    });

    this.overlay.classList.remove("show");
    this.overlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }
}

new Navbar();

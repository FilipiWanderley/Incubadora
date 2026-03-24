// ========================================
// NAVIGATION.JS - Navegação e Menu
// ========================================

class Navigation {
	constructor() {
		this.header = document.querySelector(".header");
		this.menuToggle = document.querySelector(".header__menu-toggle");
		this.nav = document.querySelector(".header__nav");
		this.overlay = document.querySelector(".header__overlay");
		this.isOpen = false;
		this.init();
	}

	init() {
		if (!this.menuToggle || !this.nav) return;

		// Acessibilidade: identificadores e estado inicial
		if (!this.nav.id) this.nav.id = "header-nav";
		this.menuToggle.setAttribute("aria-expanded", "false");
		this.menuToggle.setAttribute("aria-controls", this.nav.id);

		this.menuToggle.addEventListener("click", () => this.toggle());
		this.overlay?.addEventListener("click", () => this.close());

		document.querySelectorAll(".header__menu-link").forEach((link) => {
			link.addEventListener("click", () => {
				if (window.innerWidth <= 768) this.close();
			});
		});

		let _resizeTimer;
		window.addEventListener("resize", () => {
			clearTimeout(_resizeTimer);
			_resizeTimer = setTimeout(() => {
				if (window.innerWidth > 768 && this.isOpen) this.close();
			}, 150);
		});

		window.addEventListener("scroll", () => {
			if (window.scrollY > 50) {
				this.header?.classList.add("scrolled");
			} else {
				this.header?.classList.remove("scrolled");
			}
		});

		this.setActivePage();
	}

	toggle() {
		this.isOpen ? this.close() : this.open();
	}

	open() {
		this.isOpen = true;
		this.menuToggle.setAttribute("aria-expanded", "true");
		this.menuToggle.classList.add("active");
		this.nav.classList.add("active");
		this.overlay?.classList.add("active");
		document.body.style.overflow = "hidden";
	}

	close() {
		this.isOpen = false;
		this.menuToggle.setAttribute("aria-expanded", "false");
		this.menuToggle.classList.remove("active");
		this.nav.classList.remove("active");
		this.overlay?.classList.remove("active");
		document.body.style.overflow = "";
	}

	setActivePage() {
		const currentPage =
			window.location.pathname.split("/").pop() || "index.html";
		document.querySelectorAll(".header__menu-link").forEach((link) => {
			const linkPage = link.getAttribute("href");
			if (
				linkPage === currentPage ||
				(currentPage === "" && linkPage === "index.html")
			) {
				link.classList.add("active");
			}
		});
	}
}

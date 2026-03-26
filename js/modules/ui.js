// ========================================
// UI.JS — Issues 19, 26, 27, 34, 38
// Back-to-top, Dark Mode, Fade-in,
// Carousel/Slider, Password Toggle
// ========================================

// ── Issue 19 — Botão Voltar ao Topo ──────────────────────

function initBackToTop() {
	const btn = document.querySelector(".back-to-top");
	if (!btn) return;

	const THRESHOLD = 300;

	const update = () => {
		if (window.scrollY > THRESHOLD) {
			btn.classList.add("visible");
		} else {
			btn.classList.remove("visible");
		}
	};

	window.addEventListener("scroll", update, { passive: true });
	update();

	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

// ── Issue 26 — Dark Mode Toggle ──────────────────────────

function initThemeToggle() {
	const STORAGE_KEY = "techshop_theme";
	const ALLOWED_THEMES = new Set(["light", "dark"]);

	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved && ALLOWED_THEMES.has(saved)) {
		document.documentElement.setAttribute("data-theme", saved);
	} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		document.documentElement.setAttribute("data-theme", "dark");
	} else {
		document.documentElement.setAttribute("data-theme", "light");
	}
	if (saved && !ALLOWED_THEMES.has(saved)) {
		localStorage.removeItem(STORAGE_KEY);
	}

	const buttons = document.querySelectorAll("[data-theme-toggle]");
	if (!buttons.length) return;

	const applyTheme = (next, persist = true) => {
		document.documentElement.setAttribute("data-theme", next);
		if (persist) localStorage.setItem(STORAGE_KEY, next);
		document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
	};

	const syncButtons = () => {
		const isDark = document.documentElement.getAttribute("data-theme") === "dark";
		buttons.forEach((btn) => {
			btn.setAttribute("aria-pressed", isDark ? "true" : "false");
			const iconLight = btn.querySelector(".theme-toggle__icon--light");
			const iconDark  = btn.querySelector(".theme-toggle__icon--dark");
			if (iconLight) iconLight.style.display = isDark ? "none" : "";
			if (iconDark)  iconDark.style.display  = isDark ? "" : "none";
		});
	};

	syncButtons();

	buttons.forEach((btn) => {
		btn.addEventListener("click", () => {
			const current = document.documentElement.getAttribute("data-theme");
			const next    = current === "dark" ? "light" : "dark";
			applyTheme(next, true);
			syncButtons();
		});
	});

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
		if (!localStorage.getItem(STORAGE_KEY)) {
			applyTheme(e.matches ? "dark" : "light", false);
			syncButtons();
		}
	});
}

function initThemeSelector() {
	const STORAGE_KEY = "techshop_theme";
	const themes = [
		{ value: "light", label: "Claro" },
		{ value: "dark", label: "Escuro" },
	];

	document.querySelectorAll(".header__actions").forEach((actions) => {
		if (actions.querySelector("[data-theme-selector]")) return;
		const select = document.createElement("select");
		select.className = "theme-selector";
		select.setAttribute("data-theme-selector", "");
		select.setAttribute("aria-label", "Selecionar tema");
		select.innerHTML = themes
			.map((theme) => `<option value="${theme.value}">${theme.label}</option>`)
			.join("");
		actions.insertBefore(select, actions.firstChild);
	});

	const selectors = document.querySelectorAll("[data-theme-selector]");
	if (!selectors.length) return;

	const sync = () => {
		const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
		selectors.forEach((select) => {
			select.value = current;
		});
	};

	sync();

	selectors.forEach((select) => {
		select.addEventListener("change", () => {
			const next = select.value;
			document.documentElement.setAttribute("data-theme", next);
			localStorage.setItem(STORAGE_KEY, next);
			document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: next } }));
		});
	});

	document.addEventListener("theme:changed", sync);
}

// ── Issue 27 — Fade-in ao entrar na viewport ─────────────

function initFadeInObserver() {
	const elements = document.querySelectorAll(".fade-in, .fade-in--left, .fade-in--right, .fade-in--scale");
	if (!elements.length) return;

	if (!("IntersectionObserver" in window)) {
		elements.forEach((el) => el.classList.add("visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
	);

	elements.forEach((el) => observer.observe(el));
}

// ── Issue 27 — Parallax simples ──────────────────────────

function initParallax() {
	const parallaxEls = document.querySelectorAll("[data-parallax]");
	if (!parallaxEls.length) return;

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

	parallaxEls.forEach((el) => {
		el.style.willChange = "transform";
	});

	let ticking = false;

	const update = () => {
		const scrollY = window.scrollY;
		parallaxEls.forEach((el) => {
			const speed  = parseFloat(el.dataset.parallax) || 0.3;
			const offset = scrollY * speed;
			el.style.transform = `translate3d(0, ${offset}px, 0)`;
		});
		ticking = false;
	};

	const onScroll = () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(update);
	};

	window.addEventListener("scroll", onScroll, { passive: true });
	update();
}

// ── Issue 34 — Slider / Carousel JS ──────────────────────

class Carousel {
	constructor(el) {
		this.el       = el;
		this.track    = el.querySelector(".carousel__track");
		this.slides   = el.querySelectorAll(".carousel__slide");
		this.btnPrev  = el.querySelector(".carousel__btn--prev");
		this.btnNext  = el.querySelector(".carousel__btn--next");
		this.dotsWrap = el.querySelector(".carousel__dots");
		this.current  = 0;
		this.total    = this.slides.length;
		this.autoplayInterval = null;
		this.autoplayDelay    = parseInt(el.dataset.autoplay) || 0;
		this.isDragging       = false;
		this.startX           = 0;
		this.currentX         = 0;

		if (!this.el.getAttribute("role")) this.el.setAttribute("role", "region");
		if (!this.el.getAttribute("aria-label")) this.el.setAttribute("aria-label", "Carrossel de conteúdo");
		this.el.setAttribute("tabindex", "0");
		this.btnPrev?.setAttribute("aria-label", "Slide anterior");
		this.btnNext?.setAttribute("aria-label", "Próximo slide");

		if (this.total < 2) return;
		this._buildDots();
		this._bindEvents();
		this._render();
		if (this.autoplayDelay) this._startAutoplay();
	}

	_buildDots() {
		if (!this.dotsWrap) return;
		this.dotsWrap.innerHTML = "";
		this.slides.forEach((_, i) => {
			const dot = document.createElement("button");
			dot.className = "carousel__dot";
			dot.setAttribute("aria-label", `Ir para slide ${i + 1}`);
			dot.addEventListener("click", () => this.goTo(i));
			this.dotsWrap.appendChild(dot);
		});
	}

	_render() {
		if (!this.track) return;
		this.track.style.transform = `translateX(-${this.current * 100}%)`;

		// Atualiza dots
		this.el.querySelectorAll(".carousel__dot").forEach((dot, i) => {
			dot.classList.toggle("carousel__dot--active", i === this.current);
		});

		// Atualiza botões
		if (this.btnPrev) this.btnPrev.disabled = this.current === 0;
		if (this.btnNext) this.btnNext.disabled = this.current === this.total - 1;
	}

	goTo(index) {
		this.current = Math.max(0, Math.min(index, this.total - 1));
		this._render();
	}

	next() { this.goTo(this.current === this.total - 1 ? 0 : this.current + 1); }
	prev() { this.goTo(this.current === 0 ? this.total - 1 : this.current - 1); }

	_startAutoplay() {
		this._stopAutoplay();
		this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay);
	}

	_stopAutoplay() {
		if (this.autoplayInterval) clearInterval(this.autoplayInterval);
	}

	_bindEvents() {
		this.btnPrev?.addEventListener("click", () => this.prev());
		this.btnNext?.addEventListener("click", () => this.next());

		// Pause on hover
		if (this.autoplayDelay) {
			this.el.addEventListener("mouseenter", () => this._stopAutoplay());
			this.el.addEventListener("mouseleave", () => this._startAutoplay());
		}

		// Touch / swipe
		this.el.addEventListener("touchstart", (e) => {
			this.isDragging = true;
			this.startX     = e.touches[0].clientX;
			this.el.classList.add("carousel--dragging");
		}, { passive: true });

		this.el.addEventListener("touchmove", (e) => {
			if (!this.isDragging) return;
			this.currentX = e.touches[0].clientX;
		}, { passive: true });

		this.el.addEventListener("touchend", () => {
			if (!this.isDragging) return;
			const diff = this.startX - this.currentX;
			if (Math.abs(diff) > 50) {
				diff > 0 ? this.next() : this.prev();
			}
			this.isDragging = false;
			this.el.classList.remove("carousel--dragging");
		});

		// Teclado
		this.el.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft")  this.prev();
			if (e.key === "ArrowRight") this.next();
		});
	}
}

function initCarousels() {
	document.querySelectorAll(".carousel").forEach((el) => {
		if (!el._carousel) {
			el._carousel = new Carousel(el);
		}
	});
}

// ── Issue 38 — Toggle de Senha ───────────────────────────

function initPasswordToggles() {
	const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
	const eyeOffIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

	// Botões com data-password-toggle (apontam para um input pelo ID ou pelo input irmão mais próximo)
	document.querySelectorAll("[data-password-toggle]").forEach((btn) => {
		if (btn._pwInit) return;
		btn._pwInit = true;

		const targetId = btn.dataset.passwordToggle;
		const input    = targetId
			? document.getElementById(targetId)
			: btn.closest(".auth-modal__field-wrap, .form__group, .input-wrapper")?.querySelector("input[type='password'], input[type='text']");

		if (!input) return;

		btn.innerHTML    = eyeIcon;
		btn.setAttribute("aria-label", "Mostrar senha");
		btn.setAttribute("type", "button");

		btn.addEventListener("click", () => {
			const show = input.type === "password";
			input.type            = show ? "text" : "password";
			btn.innerHTML         = show ? eyeOffIcon : eyeIcon;
			btn.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
		});
	});
}

function initFavicon() {
	const existing = document.querySelector("link[rel='icon']");
	if (existing) return;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="%23FF6B35"/><path d="M18 34l10 10 18-22" stroke="white" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
	const link = document.createElement("link");
	link.rel = "icon";
	link.type = "image/svg+xml";
	link.href = `data:image/svg+xml,${svg}`;
	document.head.appendChild(link);
}

// ── Alert / Toast system ─────────────────────────────────

function showToast(message, type = "info", duration = 4000) {
	let container = document.querySelector(".toast-container");
	if (!container) {
		container = document.createElement("div");
		container.className = "toast-container";
		document.body.appendChild(container);
	}

	const icons = {
		success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
		error:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
		warning: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><circle cx="12" cy="17" r="1"></circle></svg>`,
		info:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
	};

	const toast = document.createElement("div");
	toast.className = `alert alert--${type} toast`;
	toast.setAttribute("role", "alert");
	toast.setAttribute("aria-live", "polite");
	toast.setAttribute("aria-atomic", "true");
	toast.innerHTML = `
		<span class="alert__icon">${icons[type] || icons.info}</span>
		<span class="alert__body">${message}</span>
		<button class="alert__close" aria-label="Fechar">
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
		</button>
	`;

	const dismiss = () => {
		toast.classList.add("is-closing");
		setTimeout(() => toast.remove(), 280);
	};

	toast.querySelector(".alert__close").addEventListener("click", dismiss);
	container.appendChild(toast);

	if (duration > 0) setTimeout(dismiss, duration);
	return toast;
}

// Expõe globalmente
window.showToast = showToast;

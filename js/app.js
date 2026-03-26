// ========================================
// APP.JS — Aplicação Principal
// ========================================

function init() {
	// ── Sistemas globais ──────────────────────────────────
	window.modalSystem = new Modal();
	window.navigation  = new Navigation();
	window.cart        = new Cart();
	window.wishlist    = new Wishlist();

	// ── UI global ─────────────────────────────────────────
	initThemeToggle();      // dark mode + temas
	initThemeSelector();
	initBackToTop();        // botão voltar ao topo
	initFadeInObserver();   // animações de entrada
	initParallax();         // efeito parallax
	initCarousels();        // carousels/sliders
	initPasswordToggles();  // toggle mostrar/ocultar senha
	initFavicon();
	initMasks();            // máscaras de input (data-mask)
	initCEPFields();        // CEP com ViaCEP (data-cep)
	initCPFValidation();    // validação CPF (data-validate-cpf)
	initPasswordStrengthMeters();
	initHeroCounters();
	initPerformanceBenchmark();

	// ── Handlers de carrinho, quick view e login ─────────
	initCartHandlers();
	initQuickViewHandler();
	initLoginHandler();

	// ── Favoritos ─────────────────────────────────────────
	window.wishlist.initButtons();

	// ── Formulários com data-validate ────────────────────
	document.querySelectorAll("form[data-validate]").forEach((form) => {
		new FormValidator(form);
	});

	// ── Páginas específicas ───────────────────────────────

	// Home — produtos em destaque
	if (document.getElementById("featuredProducts")) {
		renderFeaturedProducts();
	}

	// Produtos — galeria, filtros, busca
	if (document.getElementById("productsGrid")) {
		window.productsGallery = new ProductsGallery();
		window.productFilters  = new ProductFilters();

		const searchInput = document.querySelector("[data-search-input]");
		if (searchInput) window.search = new Search(searchInput);
	}

	// Carrinho
	if (document.querySelector(".cart-layout")) {
		window.cart.renderPage();
		window.cart.initCouponForm();
	}

	// Wishlist
	if (document.getElementById("wishlistGrid") || document.getElementById("wishlistEmpty")) {
		window.wishlist.renderPage();
	}

	if (document.getElementById("placeOrderBtn")) {
		initCheckoutSubmitState();
	}

	if (document.getElementById("faqSearch")) {
		initFAQPage();
	}

	if (document.querySelector(".blog-grid")) {
		initBlogTagFilters();
	}

	// Produto detail — carrega produto por ?id=
	if (document.getElementById("productDetail")) {
		initProductDetailPage();
	}
}

// ── Product Detail Page ───────────────────────────────────

function initProductDetailPage() {
	const params    = new URLSearchParams(window.location.search);
	const id        = parseInt(params.get("id")) || 1;
	const container = document.getElementById("productDetail");
	const breadcrumb = document.getElementById("breadcrumbProduct");

	window.api.getProduct(id)
		.then((product) => {
			if (breadcrumb) breadcrumb.textContent = product.name;

			container.innerHTML = `
				<div class="product-detail__gallery">
					<img src="${sanitizeHTML(product.image)}" alt="${sanitizeHTML(product.name)}" class="product-detail__main-img">
				</div>
				<div class="product-detail__info">
					<span class="product-detail__category">${sanitizeHTML(product.category)}</span>
					<h1 class="product-detail__name">${sanitizeHTML(product.name)}</h1>
					<div class="product-detail__rating">
						<span class="stars">★ ${product.rating}</span>
						<span>(${product.reviews} avaliações)</span>
					</div>
					<div class="product-detail__pricing">
						${product.originalPrice ? `<span class="product-detail__original">${formatCurrency(product.originalPrice)}</span>` : ""}
						<span class="product-detail__price">${formatCurrency(product.price)}</span>
						${product.discount ? `<span class="product-detail__discount">-${product.discount}%</span>` : ""}
					</div>
					<p class="product-detail__description">${sanitizeHTML(product.description || "")}</p>
					<div class="product-detail__actions">
						<div class="qty-control" role="group" aria-label="Quantidade">
							<button class="qty-control__btn" id="pdQtyDec" aria-label="Diminuir quantidade">−</button>
							<input class="qty-control__input" type="number" id="pdQty" value="1" min="1" max="99" aria-label="Quantidade">
							<button class="qty-control__btn" id="pdQtyInc" aria-label="Aumentar quantidade">+</button>
						</div>
						<button class="btn btn--primary btn--lg" id="pdAddCart"
							data-add-cart="${product.id}"
							data-product-name="${sanitizeHTML(product.name)}"
							data-product-price="${product.price}"
							data-product-image="${sanitizeHTML(product.image)}"
							data-product-category="${sanitizeHTML(product.category)}">
							Adicionar ao Carrinho
						</button>
						<button class="btn btn--outline product-card__favorite"
							data-favorite-btn="${product.id}"
							data-product-name="${sanitizeHTML(product.name)}"
							data-product-price="${product.price}"
							data-product-image="${sanitizeHTML(product.image)}"
							data-product-category="${sanitizeHTML(product.category)}"
							aria-label="Adicionar aos favoritos" aria-pressed="false">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
						</button>
					</div>
				</div>
			`;

			// Qty controls na página de detalhe
			const qtyInput = document.getElementById("pdQty");
			document.getElementById("pdQtyDec")?.addEventListener("click", () => {
				qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
			});
			document.getElementById("pdQtyInc")?.addEventListener("click", () => {
				qtyInput.value = Math.min(99, parseInt(qtyInput.value) + 1);
			});

			// Re-inicializa favoritos no conteúdo carregado
			window.wishlist.initButtons();

			// Related products
			loadRelatedProducts(product);
		})
		.catch(() => {
			container.innerHTML = `
				<div class="error-state">
					<h2>Produto não encontrado</h2>
					<p>O produto que você procura não existe ou foi removido.</p>
					<a href="products.html" class="btn btn--primary">Ver todos os produtos</a>
				</div>
			`;
		});
}

function loadRelatedProducts(current) {
	const container = document.getElementById("relatedProducts");
	if (!container) return;

	const related = (window.products || [])
		.filter((p) => p.id !== current.id && p.category === current.category)
		.slice(0, 4);

	if (!related.length) {
		container.closest(".related-products")?.style.setProperty("display", "none");
		return;
	}

	container.innerHTML = related.map((p) => createProductCard(p)).join("");
	window.wishlist.initButtons();
}

function initFAQPage() {
	const searchInput = document.getElementById("faqSearch");
	const items = Array.from(document.querySelectorAll(".faq-item"));
	const categories = Array.from(document.querySelectorAll(".faq-category"));

	items.forEach((item, index) => {
		const summary = item.querySelector(".faq-item__question");
		const answer = item.querySelector(".faq-item__answer");
		if (!summary || !answer) return;

		if (!summary.id) summary.id = `faq-question-${index + 1}`;
		if (!answer.id) answer.id = `faq-answer-${index + 1}`;

		summary.setAttribute("aria-controls", answer.id);
		summary.setAttribute("aria-expanded", item.open ? "true" : "false");
		answer.setAttribute("aria-labelledby", summary.id);

		item.addEventListener("toggle", () => {
			summary.setAttribute("aria-expanded", item.open ? "true" : "false");
		});
	});

	if (!searchInput) return;

	searchInput.addEventListener("input", () => {
		const query = searchInput.value.trim().toLowerCase();

		items.forEach((item) => {
			const text = item.textContent.toLowerCase();
			const visible = !query || text.includes(query);
			item.classList.toggle("hidden", !visible);
		});

		categories.forEach((category) => {
			const hasVisibleItems = category.querySelector(".faq-item:not(.hidden)");
			category.classList.toggle("hidden", !hasVisibleItems);
		});
	});
}

function initBlogTagFilters() {
	const cards = Array.from(document.querySelectorAll(".blog-card"));
	const tags = Array.from(document.querySelectorAll(".blog-tag, .blog-sidebar__tag"));

	if (!cards.length || !tags.length) return;

	const normalize = (value) => value.trim().toLowerCase();

	const applyFilter = (rawTag) => {
		const tag = normalize(rawTag);
		cards.forEach((card) => {
			const cardTags = Array.from(card.querySelectorAll(".blog-tag")).map((el) => normalize(el.textContent));
			card.classList.toggle("hidden", !cardTags.includes(tag));
		});
	};

	tags.forEach((tagEl) => {
		const label = tagEl.textContent;
		tagEl.setAttribute("role", "button");
		tagEl.setAttribute("tabindex", "0");
		tagEl.addEventListener("click", (event) => {
			event.preventDefault();
			applyFilter(label);
		});
		tagEl.addEventListener("keydown", (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				applyFilter(label);
			}
		});
	});
}

function initHeroCounters() {
	const counters = Array.from(document.querySelectorAll("[data-counter-value]"));
	if (!counters.length) return;

	const animate = (el) => {
		const target = Number(el.dataset.counterValue || 0);
		const suffix = el.dataset.counterSuffix || "";
		const duration = 900;
		const start = performance.now();

		const tick = (now) => {
			const progress = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.round(target * eased);
			el.textContent = `${current}${suffix}`;
			if (progress < 1) requestAnimationFrame(tick);
		};

		requestAnimationFrame(tick);
	};

	if (!("IntersectionObserver" in window)) {
		counters.forEach(animate);
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			animate(entry.target);
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.4 });

	counters.forEach((counter) => observer.observe(counter));
}

function initPerformanceBenchmark() {
	const params = new URLSearchParams(window.location.search);
	if (params.get("perf") !== "1") return;
	const resultNode = document.createElement("div");
	resultNode.id = "perf-benchmark-result";
	resultNode.hidden = true;
	document.body.appendChild(resultNode);
	const duration = 7000;
	const samples = [];
	let frameCount = 0;
	let lastFrameTime = performance.now();
	const startTime = lastFrameTime;
	const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
	const step = (now) => {
		const delta = now - lastFrameTime;
		lastFrameTime = now;
		frameCount += 1;
		if (delta > 0) samples.push(1000 / delta);
		const elapsed = now - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const wave = 0.5 - 0.5 * Math.cos(progress * Math.PI * 2);
		window.scrollTo({ top: Math.round(maxScroll * wave), behavior: "auto" });
		if (elapsed < duration) {
			requestAnimationFrame(step);
			return;
		}
		window.scrollTo({ top: 0, behavior: "auto" });
		const sorted = [...samples].sort((a, b) => a - b);
		const sum = samples.reduce((acc, value) => acc + value, 0);
		const avg = samples.length ? sum / samples.length : 0;
		const p5 = sorted.length ? sorted[Math.max(0, Math.floor(sorted.length * 0.05) - 1)] : 0;
		resultNode.dataset.avgFps = avg.toFixed(2);
		resultNode.dataset.p5Fps = p5.toFixed(2);
		resultNode.dataset.frames = String(frameCount);
		resultNode.textContent = `avg:${avg.toFixed(2)};p5:${p5.toFixed(2)};frames:${frameCount}`;
	}
	requestAnimationFrame(step);
}

function initCheckoutSubmitState() {
	const button = document.getElementById("placeOrderBtn");
	if (!button) return;

	const forms = Array.from(document.querySelectorAll("form[data-validate]"));
	const requiredControls = Array.from(document.querySelectorAll("#addressForm [required], #creditCardFields input, #creditCardFields select"));

	const validateAdvancedRules = () => {
		const cpfInput = document.querySelector("[data-validate-cpf]");
		if (cpfInput && cpfInput.value.trim()) {
			return validateCPF(cpfInput.value);
		}
		return true;
	};

	const updateState = () => {
		const formsValid = forms.every((form) => form.checkValidity());
		const controlsValid = requiredControls.every((control) => !control.value || control.checkValidity());
		const advancedValid = validateAdvancedRules();
		button.disabled = !(formsValid && controlsValid && advancedValid);
	};

	updateState();
	document.addEventListener("input", (event) => {
		if (event.target.closest("#addressForm, #creditCardFields")) updateState();
	});
	document.addEventListener("change", (event) => {
		if (event.target.closest("#addressForm, #creditCardFields")) updateState();
	});
}


// ── Inicia quando DOM está pronto ─────────────────────────

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

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
	initBackToTop();        // botão voltar ao topo
	initFadeInObserver();   // animações de entrada
	initParallax();         // efeito parallax
	initCarousels();        // carousels/sliders
	initPasswordToggles();  // toggle mostrar/ocultar senha
	initMasks();            // máscaras de input (data-mask)
	initCEPFields();        // CEP com ViaCEP (data-cep)
	initCPFValidation();    // validação CPF (data-validate-cpf)

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
					<img src="${product.image}" alt="${product.name}" class="product-detail__main-img">
				</div>
				<div class="product-detail__info">
					<span class="product-detail__category">${product.category}</span>
					<h1 class="product-detail__name">${product.name}</h1>
					<div class="product-detail__rating">
						<span class="stars">★ ${product.rating}</span>
						<span>(${product.reviews} avaliações)</span>
					</div>
					<div class="product-detail__pricing">
						${product.originalPrice ? `<span class="product-detail__original">${_fmt(product.originalPrice)}</span>` : ""}
						<span class="product-detail__price">${_fmt(product.price)}</span>
						${product.discount ? `<span class="product-detail__discount">-${product.discount}%</span>` : ""}
					</div>
					<p class="product-detail__description">${product.description || ""}</p>
					<div class="product-detail__actions">
						<div class="qty-control">
							<button class="qty-control__btn" id="pdQtyDec" aria-label="Diminuir">−</button>
							<input class="qty-control__input" type="number" id="pdQty" value="1" min="1" max="99" aria-label="Quantidade">
							<button class="qty-control__btn" id="pdQtyInc" aria-label="Aumentar">+</button>
						</div>
						<button class="btn btn--primary btn--lg" id="pdAddCart"
							data-add-cart="${product.id}"
							data-product-name="${product.name}"
							data-product-price="${product.price}"
							data-product-image="${product.image}"
							data-product-category="${product.category}">
							Adicionar ao Carrinho
						</button>
						<button class="btn btn--outline product-card__favorite"
							data-favorite-btn="${product.id}"
							data-product-name="${product.name}"
							data-product-price="${product.price}"
							data-product-image="${product.image}"
							data-product-category="${product.category}"
							aria-label="Adicionar aos favoritos">
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

function _fmt(value) {
	return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ── Inicia quando DOM está pronto ─────────────────────────

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}

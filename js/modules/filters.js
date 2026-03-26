// ========================================
// FILTERS.JS — Issues 35, 36, 42
// Filtro por categoria, ordenação e
// filtros avançados com URL state
// ========================================

class ProductFilters {
	constructor(options = {}) {
		this.gridId      = options.gridId      || "productsGrid";
		this.counterId   = options.counterId   || "productsCount";
		this.emptyId     = options.emptyId     || "productsEmpty";
		this.activeTagsId = options.activeTagsId || "activeFilters";

		this.grid    = document.getElementById(this.gridId);
		this.counter = document.getElementById(this.counterId);
		this.empty   = document.getElementById(this.emptyId);
		this.tagsCtn = document.getElementById(this.activeTagsId);

		if (!this.grid) return;

		// Estado atual dos filtros
		this.state = {
			category: "all",
			sort:     "default",
			minPrice: 0,
			maxPrice: Infinity,
			minRating: 0,
		};

		// Lê estado da URL na carga inicial
		this._readFromURL();
		this._bind();
		this.apply();
	}

	// ── URL State (history.pushState) ─────────────────────

	_readFromURL() {
		const params = new URLSearchParams(window.location.search);
		if (params.get("category"))  this.state.category  = params.get("category");
		if (params.get("sort"))      this.state.sort      = params.get("sort");
		if (params.get("minPrice"))  this.state.minPrice  = parseFloat(params.get("minPrice"))  || 0;
		if (params.get("maxPrice"))  this.state.maxPrice  = parseFloat(params.get("maxPrice"))  || Infinity;
		if (params.get("minRating")) this.state.minRating = parseFloat(params.get("minRating")) || 0;
	}

	_pushURL() {
		const params = new URLSearchParams();
		if (this.state.category  !== "all")     params.set("category",  this.state.category);
		if (this.state.sort      !== "default") params.set("sort",      this.state.sort);
		if (this.state.minPrice  > 0)           params.set("minPrice",  this.state.minPrice);
		if (this.state.minRating > 0)           params.set("minRating", this.state.minRating);
		if (this.state.maxPrice !== Infinity)   params.set("maxPrice",  this.state.maxPrice);

		const query = params.toString();
		const url   = window.location.pathname + (query ? "?" + query : "");
		history.pushState(this.state, "", url);
	}

	// ── Bind de controles ─────────────────────────────────

	_bind() {
		// Botões de categoria
		document.querySelectorAll("[data-filter-category]").forEach((btn) => {
			if (btn.dataset.filterCategory === this.state.category) btn.classList.add("active");
			btn.addEventListener("click", () => {
				this.state.category = btn.dataset.filterCategory;
				document.querySelectorAll("[data-filter-category]").forEach((b) => b.classList.remove("active"));
				btn.classList.add("active");
				this.apply();
			});
		});

		// Select de ordenação
		const sortSelect = document.querySelector("[data-sort-select]");
		if (sortSelect) {
			sortSelect.value = this.state.sort;
			sortSelect.addEventListener("change", () => {
				this.state.sort = sortSelect.value;
				this.apply();
			});
		}

		// Faixa de preço
		const minPriceEl = document.querySelector("[data-filter-min-price]");
		const maxPriceEl = document.querySelector("[data-filter-max-price]");
		if (minPriceEl) {
			minPriceEl.value = this.state.minPrice || "";
			minPriceEl.addEventListener("input", () => {
				this.state.minPrice = parseFloat(minPriceEl.value) || 0;
				this.apply();
			});
		}
		if (maxPriceEl) {
			maxPriceEl.value = this.state.maxPrice === Infinity ? "" : this.state.maxPrice;
			maxPriceEl.addEventListener("input", () => {
				this.state.maxPrice = parseFloat(maxPriceEl.value) || Infinity;
				this.apply();
			});
		}

		// Avaliação mínima
		document.querySelectorAll("[data-filter-rating]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const val = parseFloat(btn.dataset.filterRating) || 0;
				this.state.minRating = this.state.minRating === val ? 0 : val;
				document.querySelectorAll("[data-filter-rating]").forEach((b) => b.classList.remove("active"));
				if (this.state.minRating > 0) btn.classList.add("active");
				this.apply();
			});
		});

		// Limpar tudo
		document.querySelectorAll("[data-clear-filters]").forEach((btn) => {
			btn.addEventListener("click", () => this.clearAll());
		});

		// Popstate (botão voltar/avançar)
		window.addEventListener("popstate", (e) => {
			if (e.state) {
				this.state = e.state;
				this.apply(false);
			}
		});
	}

	// ── Aplicar filtros ───────────────────────────────────

	apply(pushURL = true) {
		const cards   = Array.from(this.grid.querySelectorAll("[data-product-id], .product-card"));
		let visible   = 0;

		cards.forEach((card) => {
			const category = (card.dataset.category || card.querySelector("[data-category]")?.dataset.category || "").toLowerCase();
			const price    = parseFloat(card.dataset.price    || card.querySelector("[data-price]")?.dataset.price    || 0);
			const rating   = parseFloat(card.dataset.rating   || card.querySelector("[data-rating]")?.dataset.rating  || 0);

			const matchCat    = this.state.category === "all" || category === this.state.category.toLowerCase();
			const matchPrice  = price >= this.state.minPrice && price <= this.state.maxPrice;
			const matchRating = rating >= this.state.minRating;

			const show = matchCat && matchPrice && matchRating;
			card.style.display     = show ? "" : "none";
			card.style.opacity     = show ? "" : "0";
			card.style.pointerEvents = show ? "" : "none";
			if (show) visible++;
		});

		// Ordenação
		if (this.state.sort !== "default") {
			this._sortCards(cards.filter((c) => c.style.display !== "none"));
		}

		// Atualiza contador
		if (this.counter) {
			this.counter.textContent = `${visible} produto${visible !== 1 ? "s" : ""}`;
		}

		// Estado vazio
		if (this.empty) {
			this.empty.style.display = visible === 0 ? "" : "none";
		}

		// Tags de filtros ativos
		this._renderActiveTags();

		if (pushURL) this._pushURL();
	}

	// ── Ordenação ─────────────────────────────────────────

	_sortCards(visibleCards) {
		const parent = this.grid;
		const sorted = [...visibleCards].sort((a, b) => {
			const priceA  = parseFloat(a.dataset.price  || 0);
			const priceB  = parseFloat(b.dataset.price  || 0);
			const nameA   = (a.dataset.name  || a.querySelector(".product-card__name")?.textContent || "").toLowerCase();
			const nameB   = (b.dataset.name  || b.querySelector(".product-card__name")?.textContent || "").toLowerCase();
			const ratingA = parseFloat(a.dataset.rating || 0);
			const ratingB = parseFloat(b.dataset.rating || 0);

			switch (this.state.sort) {
				case "price-asc":  return priceA - priceB;
				case "price-desc": return priceB - priceA;
				case "name-asc":   return nameA.localeCompare(nameB);
				case "name-desc":  return nameB.localeCompare(nameA);
				case "rating":     return ratingB - ratingA;
				default:           return 0;
			}
		});

		sorted.forEach((card) => parent.appendChild(card));
	}

	// ── Tags de filtros ativos ────────────────────────────

	_renderActiveTags() {
		if (!this.tagsCtn) return;

		const tags = [];
		if (this.state.category !== "all")  tags.push({ label: `Categoria: ${this.state.category}`, key: "category", value: "all" });
		if (this.state.sort !== "default")  tags.push({ label: `Ordem: ${this._sortLabel(this.state.sort)}`, key: "sort", value: "default" });
		if (this.state.minPrice > 0)        tags.push({ label: `Mín: R$ ${this.state.minPrice}`, key: "minPrice", value: 0 });
		if (this.state.maxPrice !== Infinity) tags.push({ label: `Máx: R$ ${this.state.maxPrice}`, key: "maxPrice", value: Infinity });
		if (this.state.minRating > 0)       tags.push({ label: `⭐ ${this.state.minRating}+`, key: "minRating", value: 0 });

		if (!tags.length) {
			this.tagsCtn.innerHTML = "";
			return;
		}

		this.tagsCtn.innerHTML = tags.map((tag) => `
			<button class="filter-tag" data-remove-filter="${tag.key}" data-remove-value="${tag.value}">
				${tag.label} <span aria-hidden="true">✕</span>
			</button>
		`).join("");

		this.tagsCtn.querySelectorAll("[data-remove-filter]").forEach((btn) => {
			btn.addEventListener("click", () => {
				const key = btn.dataset.removeFilter;
				const val = btn.dataset.removeValue;
				this.state[key] = key === "maxPrice" ? Infinity : (parseFloat(val) || val);
				this.apply();
			});
		});
	}

	_sortLabel(sort) {
		return {
			"price-asc":  "Menor preço",
			"price-desc": "Maior preço",
			"name-asc":   "A–Z",
			"name-desc":  "Z–A",
			"rating":     "Avaliação",
		}[sort] || sort;
	}

	// ── Limpar tudo ───────────────────────────────────────

	clearAll() {
		this.state = { category: "all", sort: "default", minPrice: 0, maxPrice: Infinity, minRating: 0 };
		window.api?.invalidateCache("products");

		document.querySelectorAll("[data-filter-category]").forEach((b) => b.classList.remove("active"));
		document.querySelector("[data-filter-category='all']")?.classList.add("active");
		document.querySelectorAll("[data-filter-rating]").forEach((b) => b.classList.remove("active"));

		const sortSelect = document.querySelector("[data-sort-select]");
		if (sortSelect) sortSelect.value = "default";

		const minEl = document.querySelector("[data-filter-min-price]");
		const maxEl = document.querySelector("[data-filter-max-price]");
		if (minEl) minEl.value = "";
		if (maxEl) maxEl.value = "";

		this.apply();
	}
}

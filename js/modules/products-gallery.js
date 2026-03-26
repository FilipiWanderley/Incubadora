// ========================================
// PRODUCTS-GALLERY.JS - Galeria de Produtos
// ========================================

class ProductsGallery {
	constructor() {
		this.allProducts = Array.isArray(window.products) ? window.products : [];
		this.filteredProducts = [...this.allProducts];
		this.SORT_STORAGE_KEY = "techshop_products_sort";
		this.filters = {
			categories: [],
			minPrice: null,
			maxPrice: null,
			search: "",
		};
		this.sortBy = "default";
		this._searchDebounce = null;
		this.init();
	}

	init() {
		this.restoreState();
		this.renderCategories();
		this.syncControls();
		this.renderProducts();
		this.initFilters();
	}

	renderCategories() {
		const container = document.getElementById("categoryFilters");
		if (!container) return;

		const categories = getCategories();
		container.innerHTML = categories
			.map((cat, i) => {
				const count = this.allProducts.filter((p) => p.category === cat).length;
				return `
        <div class="filter-option">
          <input type="checkbox" id="cat-${i}" value="${cat}" data-category-filter>
          <label for="cat-${i}">${cat}</label>
          <span class="filter-option__count">${count}</span>
        </div>
      `;
			})
			.join("");
	}

	renderProducts() {
		const container = document.getElementById("productsGrid");
		const noResults = document.getElementById("noResults");
		if (!container) return;

		this.applyFilters();

		if (this.filteredProducts.length === 0) {
			container.innerHTML = "";
			noResults?.classList.remove("hidden");
			return;
		}

		noResults?.classList.add("hidden");
		container.innerHTML = this.filteredProducts
			.map((p) => createProductCard(p))
			.join("");
		container.querySelectorAll(".product-card").forEach((card, index) => {
			const product = this.filteredProducts[index];
			if (!product) return;
			card.dataset.productId = String(product.id);
			card.dataset.category = String(product.category || "").toLowerCase();
			card.dataset.price = String(product.price || 0);
			card.dataset.rating = String(product.rating || 0);
			card.dataset.name = String(product.name || "");
		});
		initFavoriteButtons();
		this.updateCount();
	}

	applyFilters() {
		let results = [...this.allProducts];

		if (this.filters.categories.length) {
			results = results.filter((p) =>
				this.filters.categories.includes(p.category),
			);
		}

		if (this.filters.minPrice !== null) {
			results = results.filter((p) => p.price >= this.filters.minPrice);
		}

		if (this.filters.maxPrice !== null) {
			results = results.filter((p) => p.price <= this.filters.maxPrice);
		}

		if (this.filters.search) {
			const term = this.filters.search.toLowerCase();
			results = results.filter(
				(p) =>
					p.name.toLowerCase().includes(term) ||
					p.category.toLowerCase().includes(term) ||
					p.description?.toLowerCase().includes(term),
			);
		}

		results = this.sortProducts(results);
		this.filteredProducts = results;
	}

	sortProducts(prods) {
		const sorted = [...prods];
		switch (this.sortBy) {
			case "price-asc":
				return sorted.sort((a, b) => a.price - b.price);
			case "price-desc":
				return sorted.sort((a, b) => b.price - a.price);
			case "name-asc":
				return sorted.sort((a, b) => a.name.localeCompare(b.name));
			case "rating":
				return sorted.sort((a, b) => b.rating - a.rating);
			default:
				return sorted;
		}
	}

	initFilters() {
		const searchInput = document.getElementById("searchInput");
		if (searchInput) {
			searchInput.addEventListener("input", (e) => {
				clearTimeout(this._searchDebounce);
				this._searchDebounce = setTimeout(() => {
					this.filters.search = e.target.value;
					this.renderProducts();
					this.syncURL();
				}, 300);
			});
		}

		document.querySelectorAll("[data-category-filter]").forEach((cb) => {
			cb.addEventListener("change", () => {
				if (cb.checked) {
					this.filters.categories.push(cb.value);
				} else {
					this.filters.categories = this.filters.categories.filter(
						(c) => c !== cb.value,
					);
				}
				this.renderProducts();
				this.syncURL();
			});
		});

		const applyPriceBtn = document.getElementById("applyPriceFilter");
		if (applyPriceBtn) {
			applyPriceBtn.addEventListener("click", () => {
				const minPrice = document.getElementById("minPrice")?.value;
				const maxPrice = document.getElementById("maxPrice")?.value;
				this.filters.minPrice = this._toNumberOrNull(minPrice);
				this.filters.maxPrice = this._toNumberOrNull(maxPrice);
				this.renderProducts();
				this.syncURL();
			});
		}

		const sortSelect = document.getElementById("sortSelect");
		if (sortSelect) {
			sortSelect.value = this.sortBy;
			this.updateSortAria();
			sortSelect.addEventListener("change", (e) => {
				this.sortBy = e.target.value;
				localStorage.setItem(this.SORT_STORAGE_KEY, this.sortBy);
				this.updateSortAria();
				this.renderProducts();
				this.syncURL();
			});
		}

		const clearBtn = document.getElementById("clearFilters");
		if (clearBtn) {
			clearBtn.addEventListener("click", () => {
				this._resetFilters();
				document.querySelectorAll("[data-category-filter]").forEach((cb) => {
					cb.checked = false;
				});
				if (searchInput) searchInput.value = "";
				if (sortSelect) sortSelect.value = "default";
				localStorage.removeItem(this.SORT_STORAGE_KEY);
				this.updateSortAria();
				const minPrice = document.getElementById("minPrice");
				const maxPrice = document.getElementById("maxPrice");
				if (minPrice) minPrice.value = "";
				if (maxPrice) maxPrice.value = "";
				this.renderProducts();
				this.syncURL();
			});
		}

		window.addEventListener("popstate", () => {
			this._resetFilters();
			this.restoreState();
			this.syncControls();
			this.renderProducts();
		});
	}

	restoreState() {
		const params = new URLSearchParams(window.location.search);
		const categoriesParam = params.get("categories");
		if (categoriesParam) {
			this.filters.categories = categoriesParam
				.split(",")
				.map((v) => decodeURIComponent(v).trim())
				.filter(Boolean);
		}

		const minPrice = params.get("minPrice");
		const maxPrice = params.get("maxPrice");
		const search = params.get("search");
		const sort = params.get("sort");
		const storedSort = localStorage.getItem(this.SORT_STORAGE_KEY);

		this.filters.minPrice = this._toNumberOrNull(minPrice);
		this.filters.maxPrice = this._toNumberOrNull(maxPrice);
		this.filters.search = search || "";
		this.sortBy = sort || storedSort || "default";
	}

	syncControls() {
		const searchInput = document.getElementById("searchInput");
		const minPrice = document.getElementById("minPrice");
		const maxPrice = document.getElementById("maxPrice");
		const sortSelect = document.getElementById("sortSelect");

		if (searchInput) searchInput.value = this.filters.search || "";
		if (minPrice) minPrice.value = this.filters.minPrice ?? "";
		if (maxPrice) maxPrice.value = this.filters.maxPrice ?? "";
		if (sortSelect) {
			sortSelect.value = this.sortBy;
			this.updateSortAria();
		}

		document.querySelectorAll("[data-category-filter]").forEach((cb) => {
			cb.checked = this.filters.categories.includes(cb.value);
		});
	}

	syncURL() {
		const params = new URLSearchParams();
		if (this.filters.categories.length) params.set("categories", this.filters.categories.join(","));
		if (this.filters.minPrice !== null) params.set("minPrice", this.filters.minPrice);
		if (this.filters.maxPrice !== null) params.set("maxPrice", this.filters.maxPrice);
		if (this.filters.search) params.set("search", this.filters.search);
		if (this.sortBy !== "default") params.set("sort", this.sortBy);
		const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
		if (window.location.pathname + window.location.search === next) return;
		history.pushState({}, "", next);
	}

	updateSortAria() {
		const sortSelect = document.getElementById("sortSelect");
		if (!sortSelect) return;
		const map = {
			"default": "none",
			"price-asc": "ascending",
			"price-desc": "descending",
			"name-asc": "ascending",
			"name-desc": "descending",
			"rating": "other",
		};
		sortSelect.setAttribute("aria-sort", map[this.sortBy] || "none");
	}

	updateCount() {
		const countEl = document.getElementById("productsCount");
		if (countEl) {
			const count = this.filteredProducts.length;
			countEl.textContent = `${count} produto${count !== 1 ? "s" : ""} encontrado${count !== 1 ? "s" : ""}`;
		}
	}

	_toNumberOrNull(value) {
		const normalized = String(value ?? "").trim();
		if (!normalized) return null;
		const parsed = Number.parseFloat(normalized);
		return Number.isFinite(parsed) ? parsed : null;
	}

	_resetFilters() {
		this.filters = {
			categories: [],
			minPrice: null,
			maxPrice: null,
			search: "",
		};
		this.sortBy = "default";
	}
}

// ========================================
// PRODUCTS-GALLERY.JS - Galeria de Produtos
// ========================================

class ProductsGallery {
	constructor() {
		this.allProducts = products || [];
		this.filteredProducts = [...this.allProducts];
		this.filters = {
			categories: [],
			minPrice: null,
			maxPrice: null,
			search: "",
		};
		this.sortBy = "default";
		this.init();
	}

	init() {
		this.renderCategories();
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
			let timeout;
			searchInput.addEventListener("input", (e) => {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					this.filters.search = e.target.value;
					this.renderProducts();
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
			});
		});

		const applyPriceBtn = document.getElementById("applyPriceFilter");
		if (applyPriceBtn) {
			applyPriceBtn.addEventListener("click", () => {
				const minPrice = document.getElementById("minPrice")?.value;
				const maxPrice = document.getElementById("maxPrice")?.value;
				this.filters.minPrice = minPrice ? parseFloat(minPrice) : null;
				this.filters.maxPrice = maxPrice ? parseFloat(maxPrice) : null;
				this.renderProducts();
			});
		}

		const sortSelect = document.getElementById("sortSelect");
		if (sortSelect) {
			sortSelect.addEventListener("change", (e) => {
				this.sortBy = e.target.value;
				this.renderProducts();
			});
		}

		const clearBtn = document.getElementById("clearFilters");
		if (clearBtn) {
			clearBtn.addEventListener("click", () => {
				this.filters = {
					categories: [],
					minPrice: null,
					maxPrice: null,
					search: "",
				};
				this.sortBy = "default";
				document
					.querySelectorAll("[data-category-filter]")
					.forEach((cb) => (cb.checked = false));
				if (searchInput) searchInput.value = "";
				if (sortSelect) sortSelect.value = "default";
				const minPrice = document.getElementById("minPrice");
				const maxPrice = document.getElementById("maxPrice");
				if (minPrice) minPrice.value = "";
				if (maxPrice) maxPrice.value = "";
				this.renderProducts();
			});
		}
	}

	updateCount() {
		const countEl = document.getElementById("productsCount");
		if (countEl) {
			const count = this.filteredProducts.length;
			countEl.textContent = `${count} produto${count !== 1 ? "s" : ""} encontrado${count !== 1 ? "s" : ""}`;
		}
	}
}

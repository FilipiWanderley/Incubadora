// ========================================
// WISHLIST.JS — Issue 44
// Favoritos com animação e persistência
// ========================================

class Wishlist {
	constructor() {
		this.STORAGE_KEY = "techshop_wishlist";
		this.items = this._load();
		this._syncBadge();
	}

	// ── Persistência ──────────────────────────────────────

	_load() {
		try {
			return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
		} catch {
			return [];
		}
	}

	_save() {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
		this._syncBadge();
		document.dispatchEvent(new CustomEvent("wishlist:updated", { detail: this.items }));
	}

	// ── Badge no header ───────────────────────────────────

	_syncBadge() {
		document.querySelectorAll("[data-wishlist-badge]").forEach((el) => {
			el.textContent   = this.items.length;
			el.style.display = this.items.length > 0 ? "" : "none";
		});
	}

	// ── CRUD ──────────────────────────────────────────────

	has(id) { return this.items.some((i) => i.id === id); }

	add(product) {
		if (!this.has(product.id)) {
			this.items.push({
				id:    product.id,
				name:  product.name,
				price: product.price,
				originalPrice: product.originalPrice || null,
				image: product.image,
				category: product.category || "",
			});
			this._save();
		}
		return this;
	}

	remove(id) {
		this.items = this.items.filter((i) => i.id !== id);
		this._save();
		return this;
	}

	toggle(product) {
		if (this.has(product.id)) {
			this.remove(product.id);
			return false;
		} else {
			this.add(product);
			return true;
		}
	}

	getItems() { return [...this.items]; }

	// ── Inicialização dos botões de favorito ──────────────

	initButtons() {
		// Sincroniza estado visual de todos os botões já na página
		document.querySelectorAll("[data-favorite-btn]").forEach((btn) => {
			const id = parseInt(btn.dataset.favoriteBtn);
			this._updateBtn(btn, this.has(id));
		});

		// Delegação — captura botões adicionados dinamicamente
		document.addEventListener("click", (e) => {
			const btn = e.target.closest("[data-favorite-btn]");
			if (!btn) return;

			const id   = parseInt(btn.dataset.favoriteBtn);
			const name = btn.dataset.productName || "Produto";

			// Monta objeto de produto mínimo
			const card = btn.closest(".product-card");
			const product = {
				id,
				name,
				price:         parseFloat(btn.dataset.productPrice)         || 0,
				originalPrice: parseFloat(btn.dataset.productOriginalPrice) || null,
				image:         btn.dataset.productImage                     || "",
				category:      btn.dataset.productCategory                  || "",
			};

			const added = this.toggle(product);
			this._updateBtn(btn, added);
			this._animateBtn(btn, added);

			if (added) {
				window.showToast?.(`<strong>${name}</strong> adicionado aos favoritos!`, "success", 3000);
			} else {
				window.showToast?.(`<strong>${name}</strong> removido dos favoritos.`, "info", 2500);
			}
		});
	}

	_updateBtn(btn, active) {
		btn.classList.toggle("active", active);
		btn.setAttribute("aria-pressed", active ? "true" : "false");
		btn.setAttribute("aria-label", active ? "Remover dos favoritos" : "Adicionar aos favoritos");

		// Troca ícone para preenchido quando ativo
		const svg = btn.querySelector("svg");
		if (svg) {
			svg.style.fill   = active ? "var(--error)" : "none";
			svg.style.color  = active ? "var(--error)" : "";
			svg.style.stroke = active ? "var(--error)" : "currentColor";
		}
	}

	_animateBtn(btn, added) {
		if (added) {
			btn.classList.add("heart-pop");
			btn.addEventListener("animationend", () => btn.classList.remove("heart-pop"), { once: true });
		}
	}

	// ── Renderização da página wishlist.html ──────────────

	renderPage() {
		const grid       = document.getElementById("wishlistGrid");
		const emptyState = document.getElementById("wishlistEmpty");
		if (!grid) return;

		if (this.items.length === 0) {
			grid.innerHTML = "";
			if (emptyState) emptyState.style.display = "";
			return;
		}

		if (emptyState) emptyState.style.display = "none";

		const base = window.location.pathname.includes("/pages/") ? "" : "pages/";

		grid.innerHTML = this.items.map((item) => `
			<div class="wishlist-card" data-wishlist-card="${item.id}">
				<div class="wishlist-card__img-wrap">
					<img src="${item.image}" alt="${item.name}" class="wishlist-card__img" loading="lazy">
				</div>
				<div class="wishlist-card__body">
					<span class="wishlist-card__category">${item.category}</span>
					<h3 class="wishlist-card__name">${item.name}</h3>
					<div class="wishlist-card__prices">
						<span class="wishlist-card__price">${this._fmt(item.price)}</span>
						${item.originalPrice ? `<span class="wishlist-card__original">${this._fmt(item.originalPrice)}</span>` : ""}
					</div>
					<div class="wishlist-card__actions">
						<button class="btn btn--primary btn--sm" data-wishlist-add-cart="${item.id}">Adicionar ao Carrinho</button>
						<button class="btn btn--ghost btn--sm" data-wishlist-remove="${item.id}">Remover</button>
					</div>
				</div>
			</div>
		`).join("");

		this._bindPageEvents(base);
	}

	_bindPageEvents(base) {
		const grid = document.getElementById("wishlistGrid");
		if (!grid) return;

		grid.addEventListener("click", (e) => {
			const addCart = e.target.closest("[data-wishlist-add-cart]");
			const remove  = e.target.closest("[data-wishlist-remove]");

			if (addCart) {
				const id   = parseInt(addCart.dataset.wishlistAddCart);
				const item = this.items.find((i) => i.id === id);
				if (item && window.cart) {
					window.cart.add(item);
					window.showToast?.(`<strong>${item.name}</strong> adicionado ao carrinho!`, "success");
				}
			}

			if (remove) {
				const id  = parseInt(remove.dataset.wishlistRemove);
				const row = remove.closest("[data-wishlist-card]");
				if (row) {
					row.style.transition = "opacity 0.3s, transform 0.3s";
					row.style.opacity    = "0";
					row.style.transform  = "scale(0.92)";
					setTimeout(() => { this.remove(id); this.renderPage(); }, 300);
				} else {
					this.remove(id);
					this.renderPage();
				}
			}
		});

		// Botão "Adicionar tudo ao carrinho"
		document.querySelector("[data-wishlist-add-all]")?.addEventListener("click", () => {
			if (!window.cart) return;
			this.items.forEach((item) => window.cart.add(item));
			window.showToast?.(`${this.items.length} produtos adicionados ao carrinho!`, "success");
		});

		// Botão "Compartilhar"
		document.querySelector("[data-wishlist-share]")?.addEventListener("click", () => {
			const url = window.location.href;
			if (navigator.share) {
				navigator.share({ title: "Minha Lista de Desejos — TechShop", url });
			} else {
				navigator.clipboard.writeText(url).then(() => {
					window.showToast?.("Link copiado para a área de transferência!", "info");
				});
			}
		});
	}

	_fmt(value) {
		return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
	}
}

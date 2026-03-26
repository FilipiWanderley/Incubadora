// ========================================
// WISHLIST.JS — Issue 44
// Favoritos com animação e persistência
// ========================================

class Wishlist {
	constructor() {
		this.STORAGE_KEY = "techshop_wishlist";
		this.items = this._load();
		this._favoriteDelegateBound = false;
		this._pageEventsBound = false;
		this._onFavoriteClick = this._handleFavoriteClick.bind(this);
		this._onWishlistGridClick = this._handleWishlistGridClick.bind(this);
		this._syncBadge();
	}

	// ── Persistência ──────────────────────────────────────

	_load() {
		try {
			const parsed = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
			if (!Array.isArray(parsed)) return [];
			return parsed
				.map((item) => ({
					id: Number.parseInt(item.id, 10),
					name: String(item.name || "Produto"),
					price: Number(item.price) || 0,
					originalPrice: item.originalPrice == null ? null : Number(item.originalPrice) || null,
					image: String(item.image || ""),
					category: String(item.category || ""),
				}))
				.filter((item) => Number.isFinite(item.id));
		} catch {
			return [];
		}
	}

	_save() {
		try {
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
		} catch {
			// QuotaExceededError — continua em memória
		}
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

	has(id) {
		const numericId = Number.parseInt(id, 10);
		if (!Number.isFinite(numericId)) return false;
		return this.items.some((item) => item.id === numericId);
	}

	add(product) {
		const numericId = Number.parseInt(product?.id, 10);
		if (!Number.isFinite(numericId)) return this;
		if (!this.has(numericId)) {
			this.items.push({
				id: numericId,
				name: String(product.name || "Produto"),
				price: Number(product.price) || 0,
				originalPrice: product.originalPrice == null ? null : Number(product.originalPrice) || null,
				image: String(product.image || ""),
				category: String(product.category || ""),
			});
			this._save();
		}
		return this;
	}

	remove(id) {
		const numericId = Number.parseInt(id, 10);
		if (!Number.isFinite(numericId)) return this;
		this.items = this.items.filter((item) => item.id !== numericId);
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
		document.querySelectorAll("[data-favorite-btn]").forEach((btn) => {
			const id = Number.parseInt(btn.dataset.favoriteBtn, 10);
			this._updateBtn(btn, this.has(id));
		});

		if (this._favoriteDelegateBound) return;
		this._favoriteDelegateBound = true;
		document.addEventListener("click", this._onFavoriteClick);
	}

	_handleFavoriteClick(event) {
		const btn = event.target.closest("[data-favorite-btn]");
		if (!btn) return;
		const id = Number.parseInt(btn.dataset.favoriteBtn, 10);
		if (!Number.isFinite(id)) return;
		const name = btn.dataset.productName || "Produto";
		const product = {
			id,
			name,
			price: Number(btn.dataset.productPrice) || 0,
			originalPrice: btn.dataset.productOriginalPrice == null ? null : Number(btn.dataset.productOriginalPrice) || null,
			image: btn.dataset.productImage || "",
			category: btn.dataset.productCategory || "",
		};
		const added = this.toggle(product);
		this._updateBtn(btn, added);
		this._animateBtn(btn, added);
		if (added) {
			window.showToast?.(`<strong>${name}</strong> adicionado aos favoritos!`, "success", 3000);
		} else {
			window.showToast?.(`<strong>${name}</strong> removido dos favoritos.`, "info", 2500);
		}
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
			if (emptyState) emptyState.classList.remove("hidden");
			return;
		}

		if (emptyState) emptyState.classList.add("hidden");

		grid.innerHTML = this.items.map((item) => `
			<div class="wishlist-card" data-wishlist-card="${item.id}">
				<div class="wishlist-card__img-wrap">
					<img src="${sanitizeHTML(item.image)}" alt="${sanitizeHTML(item.name)}" class="wishlist-card__img" loading="lazy">
				</div>
				<div class="wishlist-card__body">
					<span class="wishlist-card__category">${sanitizeHTML(item.category)}</span>
					<h3 class="wishlist-card__name">${sanitizeHTML(item.name)}</h3>
					<div class="wishlist-card__prices">
						<span class="wishlist-card__price">${formatCurrency(item.price)}</span>
						${item.originalPrice ? `<span class="wishlist-card__original">${formatCurrency(item.originalPrice)}</span>` : ""}
					</div>
					<div class="wishlist-card__actions">
						<button class="btn btn--primary btn--sm" data-wishlist-add-cart="${item.id}">Adicionar ao Carrinho</button>
						<button class="btn btn--ghost btn--sm" data-wishlist-remove="${item.id}">Remover</button>
					</div>
				</div>
			</div>
		`).join("");

		this._bindPageEvents();
	}

	_bindPageEvents() {
		const grid = document.getElementById("wishlistGrid");
		if (!grid) return;
		if (!this._pageEventsBound) {
			this._pageEventsBound = true;
			grid.addEventListener("click", this._onWishlistGridClick);
		}

		const addAll = document.querySelector("[data-wishlist-add-all]");
		if (addAll && !addAll.dataset.boundWishlist) {
			addAll.dataset.boundWishlist = "true";
			addAll.addEventListener("click", () => {
				if (!window.cart) return;
				this.items.forEach((item) => window.cart.add(item));
				window.showToast?.(`${this.items.length} produtos adicionados ao carrinho!`, "success");
			});
		}

		const share = document.querySelector("[data-wishlist-share]");
		if (share && !share.dataset.boundWishlist) {
			share.dataset.boundWishlist = "true";
			share.addEventListener("click", async () => {
			const ids = this.items.map((item) => item.id).join(",");
			const shareUrl = new URL(window.location.href);
			if (ids) {
				shareUrl.searchParams.set("ids", ids);
			} else {
				shareUrl.searchParams.delete("ids");
			}
			const url = shareUrl.toString();
			try {
				if (navigator.share) {
					await navigator.share({ title: "Minha Lista de Desejos — TechShop", url });
					return;
				}
				if (navigator.clipboard?.writeText) {
					await navigator.clipboard.writeText(url);
					window.showToast?.("Link copiado para a área de transferência!", "info");
					return;
				}
				window.prompt("Copie o link da sua lista:", url);
			} catch {
				window.showToast?.("Não foi possível compartilhar no momento.", "warning");
			}
			});
		}
	}

	_handleWishlistGridClick(event) {
		const addCart = event.target.closest("[data-wishlist-add-cart]");
		const remove = event.target.closest("[data-wishlist-remove]");
		if (addCart) {
			const id = Number.parseInt(addCart.dataset.wishlistAddCart, 10);
			if (!Number.isFinite(id)) return;
			const item = this.items.find((entry) => entry.id === id);
			if (item && window.cart) {
				window.cart.add(item);
				window.showToast?.(`<strong>${item.name}</strong> adicionado ao carrinho!`, "success");
			}
		}
		if (!remove) return;
		const id = Number.parseInt(remove.dataset.wishlistRemove, 10);
		if (!Number.isFinite(id)) return;
		const row = remove.closest("[data-wishlist-card]");
		if (!row) {
			this.remove(id);
			this.renderPage();
			return;
		}
		row.style.transition = "opacity 0.3s, transform 0.3s";
		row.style.opacity = "0";
		row.style.transform = "scale(0.92)";
		setTimeout(() => {
			this.remove(id);
			this.renderPage();
		}, 300);
	}

}

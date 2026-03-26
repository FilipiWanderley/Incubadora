// ========================================
// CART.JS — Issues 31, 39, 41
// Sistema completo de carrinho de compras
// ========================================

class Cart {
	constructor() {
		this.STORAGE_KEY = "techshop_cart";
		this.COUPON_KEY  = "techshop_coupon";
		this.coupons = {
			TECH10:   { type: "percent",  value: 10,  label: "10% de desconto" },
			TECH20:   { type: "percent",  value: 20,  label: "20% de desconto" },
			TECH30:   { type: "percent",  value: 30,  label: "30% de desconto" },
			FRETE:    { type: "shipping", value: 100, label: "Frete grátis"    },
			TECHSHOP: { type: "fixed",    value: 50,  label: "R$ 50 de desconto" },
		};

		this.items   = this._load();
		this.coupon  = this._loadCoupon();

		this._syncBadge();
		this._listenCrossTabs();
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
		try {
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
		} catch {
			// QuotaExceededError — storage cheio, continua em memória
		}
		this._syncBadge();
		this._dispatch();
	}

	_loadCoupon() {
		try {
			return JSON.parse(localStorage.getItem(this.COUPON_KEY)) || null;
		} catch {
			return null;
		}
	}

	_saveCoupon() {
		try {
			if (this.coupon) {
				localStorage.setItem(this.COUPON_KEY, JSON.stringify(this.coupon));
			} else {
				localStorage.removeItem(this.COUPON_KEY);
			}
		} catch {
			// QuotaExceededError — descarta silenciosamente
		}
	}

	// ── Evento personalizado ──────────────────────────────

	_dispatch() {
		document.dispatchEvent(new CustomEvent("cart:updated", { detail: this.getSummary() }));
	}

	// ── Sincronização entre abas ──────────────────────────

	_listenCrossTabs() {
		window.addEventListener("storage", (e) => {
			if (e.key === this.STORAGE_KEY) {
				this.items = this._load();
				this._syncBadge();
				this._dispatch();
				if (document.querySelector(".cart-layout")) this.renderPage();
			}
			if (e.key === this.COUPON_KEY) {
				this.coupon = this._loadCoupon();
				if (document.querySelector(".cart-layout")) this.renderSummary();
			}
		});
	}

	// ── Badge no header ───────────────────────────────────

	_syncBadge() {
		const totalQty = this.items.reduce((acc, i) => acc + i.qty, 0);
		document.querySelectorAll(".header__cart-badge").forEach((badge) => {
			badge.textContent = totalQty;
			badge.style.display = totalQty > 0 ? "" : "none";
		});
	}

	// ── CRUD ──────────────────────────────────────────────

	add(product, qty = 1) {
		const existing = this.items.find((i) => i.id === product.id);
		if (existing) {
			existing.qty = Math.min(existing.qty + qty, 99);
		} else {
			this.items.push({
				id:            product.id,
				name:          product.name,
				price:         product.price,
				originalPrice: product.originalPrice || null,
				image:         product.image,
				category:      product.category || "",
				qty:           Math.min(qty, 99),
			});
		}
		this._save();
		return this;
	}

	remove(id) {
		this.items = this.items.filter((i) => i.id !== id);
		this._save();
		if (document.querySelector(".cart-layout")) this.renderPage();
		return this;
	}

	updateQty(id, qty) {
		const item = this.items.find((i) => i.id === id);
		if (!item) return this;
		const newQty = Math.max(1, Math.min(99, parseInt(qty) || 1));
		item.qty = newQty;
		this._save();
		if (document.querySelector(".cart-layout")) this.renderSummary();
		return this;
	}

	clear() {
		this.items = [];
		this.coupon = null;
		this._save();
		this._saveCoupon();
		if (document.querySelector(".cart-layout")) this.renderPage();
		return this;
	}

	getItems()   { return [...this.items]; }
	isEmpty()    { return this.items.length === 0; }

	// ── Cálculos ──────────────────────────────────────────

	getSubtotal() {
		return this.items.reduce((acc, i) => acc + i.price * i.qty, 0);
	}

	getDiscount() {
		if (!this.coupon) return 0;
		const sub = this.getSubtotal();
		if (this.coupon.type === "percent") return (sub * this.coupon.value) / 100;
		if (this.coupon.type === "fixed")   return Math.min(this.coupon.value, sub);
		return 0;
	}

	getShipping() {
		if (this.isEmpty()) return 0;
		if (this.coupon?.type === "shipping") return 0;
		const sub = this.getSubtotal();
		if (sub >= 299) return 0;
		return sub >= 199 ? 15.9 : 29.9;
	}

	getTotal() {
		return Math.max(0, this.getSubtotal() - this.getDiscount() + this.getShipping());
	}

	getSummary() {
		return {
			items:    this.getItems(),
			count:    this.items.reduce((acc, i) => acc + i.qty, 0),
			subtotal: this.getSubtotal(),
			discount: this.getDiscount(),
			shipping: this.getShipping(),
			total:    this.getTotal(),
			coupon:   this.coupon,
		};
	}

	// ── Cupons ────────────────────────────────────────────

	applyCoupon(code) {
		const def = this.coupons[code.toUpperCase().trim()];
		if (!def) return { ok: false, msg: "Cupom inválido ou expirado." };
		this.coupon = { code: code.toUpperCase().trim(), ...def };
		this._saveCoupon();
		this._dispatch();
		if (document.querySelector(".cart-layout")) this.renderSummary();
		return { ok: true, msg: `Cupom aplicado: ${def.label}` };
	}

	removeCoupon() {
		this.coupon = null;
		this._saveCoupon();
		this._dispatch();
		if (document.querySelector(".cart-layout")) this.renderSummary();
	}

	// ── Renderização da página cart.html ──────────────────

	renderPage() {
		const itemsContainer   = document.getElementById("cartItems");
		const emptyState       = document.getElementById("cartEmpty");
		const summaryContainer = document.getElementById("cartSummaryContainer");

		if (!itemsContainer) return;

		if (this.isEmpty()) {
			itemsContainer.innerHTML   = "";
			if (emptyState)       emptyState.classList.remove("hidden");
			if (summaryContainer) summaryContainer.classList.add("hidden");
			return;
		}

		if (emptyState)       emptyState.classList.add("hidden");
		if (summaryContainer) summaryContainer.classList.remove("hidden");

		itemsContainer.innerHTML = this.items.map((item) => `
			<li class="cart-item" data-cart-item="${item.id}">
				<img src="${sanitizeHTML(item.image)}" alt="${sanitizeHTML(item.name)}" class="cart-item__img">
				<div class="cart-item__info">
					<span class="cart-item__category">${sanitizeHTML(item.category)}</span>
					<h3 class="cart-item__name">${sanitizeHTML(item.name)}</h3>
					<p class="cart-item__price">${formatCurrency(item.price)}</p>
					${item.originalPrice ? `<p class="cart-item__original">${formatCurrency(item.originalPrice)}</p>` : ""}
				</div>
				<div class="qty-control">
					<button class="qty-control__btn" data-qty-dec="${item.id}" aria-label="Diminuir quantidade de ${sanitizeHTML(item.name)}" ${item.qty <= 1 ? "disabled" : ""}>−</button>
					<input class="qty-control__input" type="number" value="${item.qty}" min="1" max="99" data-qty-input="${item.id}" aria-label="Quantidade de ${sanitizeHTML(item.name)}">
					<button class="qty-control__btn" data-qty-inc="${item.id}" aria-label="Aumentar quantidade de ${sanitizeHTML(item.name)}" ${item.qty >= 99 ? "disabled" : ""}>+</button>
				</div>
				<p class="cart-item__subtotal">${formatCurrency(item.price * item.qty)}</p>
				<button class="cart-item__remove" data-cart-remove="${item.id}" aria-label="Remover ${sanitizeHTML(item.name)} do carrinho">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>
				</button>
			</li>
		`).join("");

		this.renderSummary();
		this._bindCartPageEvents();
	}

	renderSummary() {
		const subtotalEl  = document.getElementById("cartSubtotal");
		const discountEl  = document.getElementById("cartDiscount");
		const discountRow = document.getElementById("cartDiscountRow");
		const shippingEl  = document.getElementById("cartShipping");
		const totalEl     = document.getElementById("cartTotal");
		const couponTag   = document.getElementById("cartCouponTag");

		const s = this.getSummary();

		if (subtotalEl)  subtotalEl.textContent  = formatCurrency(s.subtotal);
		if (shippingEl)  shippingEl.textContent  = s.shipping === 0 ? "Grátis" : formatCurrency(s.shipping);
		if (totalEl)     totalEl.textContent     = formatCurrency(s.total);

		if (discountRow && discountEl) {
			if (s.discount > 0) {
				discountRow.style.display = "";
				discountEl.textContent = "− " + formatCurrency(s.discount);
			} else {
				discountRow.style.display = "none";
			}
		}

		if (couponTag) {
			couponTag.textContent = s.coupon ? `${s.coupon.code} ✕` : "";
			couponTag.style.display = s.coupon ? "" : "none";
			couponTag.replaceWith(couponTag.cloneNode(true)); // remove listeners antigos
			const freshTag = document.getElementById("cartCouponTag");
			freshTag?.addEventListener("click", () => this.removeCoupon());
		}
	}

	_bindCartPageEvents() {
		const container = document.getElementById("cartItems");
		if (!container) return;

		// Delegação de eventos
		container.addEventListener("click", (e) => {
			const dec    = e.target.closest("[data-qty-dec]");
			const inc    = e.target.closest("[data-qty-inc]");
			const remove = e.target.closest("[data-cart-remove]");

			if (dec) { const id = parseInt(dec.dataset.qtyDec); const item = this.items.find(i => i.id === id); if (item) this.updateQty(id, item.qty - 1); }
			if (inc) { const id = parseInt(inc.dataset.qtyInc); const item = this.items.find(i => i.id === id); if (item) this.updateQty(id, item.qty + 1); }
			if (remove) {
				const id = parseInt(remove.dataset.cartRemove);
				const row = remove.closest("[data-cart-item]");
				if (row) {
					row.style.transition = "opacity 0.3s, transform 0.3s";
					row.style.opacity = "0";
					row.style.transform = "translateX(20px)";
					setTimeout(() => this.remove(id), 300);
				} else {
					this.remove(id);
				}
			}
		});

		container.addEventListener("change", (e) => {
			const input = e.target.closest("[data-qty-input]");
			if (input) this.updateQty(parseInt(input.dataset.qtyInput), input.value);
		});
	}

	initCouponForm() {
		const form  = document.getElementById("couponForm");
		const input = document.getElementById("couponInput");
		const msg   = document.getElementById("couponMessage");
		if (!form || !input) return;

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const result = this.applyCoupon(input.value);
			if (msg) {
				msg.textContent = result.msg;
				msg.className   = "coupon-message " + (result.ok ? "coupon-message--ok" : "coupon-message--err");
				msg.style.display = "";
			}
			if (result.ok) input.value = "";
		});
	}
}

// ========================================
// API.JS — Issue 45
// Mock API com fetch, loading states,
// retry com backoff exponencial e cache
// ========================================

class API {
	constructor(options = {}) {
		this.baseURL     = options.baseURL     || "";
		this.cacheTTL    = options.cacheTTL    || 5 * 60 * 1000; // 5 minutos
		this.maxRetries  = options.maxRetries  || 3;
		this._cache      = new Map();
		this._loading    = new Set();
	}

	// ── Cache ─────────────────────────────────────────────

	_cacheGet(key) {
		const entry = this._cache.get(key);
		if (!entry) return null;
		if (Date.now() - entry.ts > this.cacheTTL) {
			this._cache.delete(key);
			return null;
		}
		return entry.data;
	}

	_cacheSet(key, data) {
		this._cache.set(key, { data, ts: Date.now() });
	}

	invalidateCache(key) {
		if (key) {
			this._cache.delete(key);
		} else {
			this._cache.clear();
		}
	}

	// ── Loading state ─────────────────────────────────────

	_setLoading(id, state) {
		const els = id
			? document.querySelectorAll(`[data-loading="${id}"]`)
			: document.querySelectorAll("[data-loading]");

		els.forEach((el) => {
			if (state) {
				el.dataset.loadingActive = "true";
				el.setAttribute("aria-busy", "true");
				if (el.tagName === "BUTTON" || el.tagName === "INPUT") el.disabled = true;
			} else {
				delete el.dataset.loadingActive;
				el.removeAttribute("aria-busy");
				if (el.tagName === "BUTTON" || el.tagName === "INPUT") el.disabled = false;
			}
		});
	}

	// ── Fetch com retry ───────────────────────────────────

	async fetchWithRetry(url, options = {}, retries = this.maxRetries) {
		const fullURL = url.startsWith("http") ? url : this.baseURL + url;

		for (let attempt = 0; attempt <= retries; attempt++) {
			try {
				const res = await fetch(fullURL, {
					headers: { "Content-Type": "application/json", ...options.headers },
					...options,
				});

				if (!res.ok) {
					if (res.status >= 500 && attempt < retries) {
						// Retry em erros de servidor
						await this._delay(Math.pow(2, attempt) * 1000);
						continue;
					}
					throw new Error(`HTTP ${res.status}: ${res.statusText}`);
				}

				return await res.json();
			} catch (err) {
				if (attempt === retries) throw err;
				await this._delay(Math.pow(2, attempt) * 1000); // 1s, 2s, 4s
			}
		}
	}

	_delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// ── GET com cache ─────────────────────────────────────

	async get(url, options = {}) {
		const cacheKey = url + JSON.stringify(options.params || {});
		const cached   = options.cache !== false ? this._cacheGet(cacheKey) : null;
		if (cached) return cached;

		const loadingId = options.loadingId;
		if (loadingId) this._setLoading(loadingId, true);

		try {
			const data = await this.fetchWithRetry(url, { method: "GET", ...options });
			if (options.cache !== false) this._cacheSet(cacheKey, data);
			return data;
		} finally {
			if (loadingId) this._setLoading(loadingId, false);
		}
	}

	// ── POST ──────────────────────────────────────────────

	async post(url, body = {}, options = {}) {
		const loadingId = options.loadingId;
		if (loadingId) this._setLoading(loadingId, true);

		try {
			return await this.fetchWithRetry(url, {
				method: "POST",
				body:   JSON.stringify(body),
				...options,
			});
		} finally {
			if (loadingId) this._setLoading(loadingId, false);
		}
	}

	// ── Mock endpoints (dados locais) ─────────────────────

	async getProducts(filters = {}) {
		// Simula delay de rede (50-200ms)
		await this._delay(50 + Math.random() * 150);

		let data = [...(window.products || [])];

		if (filters.category) data = data.filter((p) => p.category === filters.category);
		if (filters.featured) data = data.filter((p) => p.featured);
		if (filters.inStock)  data = data.filter((p) => p.inStock);
		if (filters.minPrice) data = data.filter((p) => p.price >= filters.minPrice);
		if (filters.maxPrice) data = data.filter((p) => p.price <= filters.maxPrice);
		if (filters.q)        data = data.filter((p) =>
			p.name.toLowerCase().includes(filters.q.toLowerCase()) ||
			(p.description || "").toLowerCase().includes(filters.q.toLowerCase())
		);

		const sort = filters.sort || "default";
		if (sort === "price-asc")  data.sort((a, b) => a.price - b.price);
		if (sort === "price-desc") data.sort((a, b) => b.price - a.price);
		if (sort === "rating")     data.sort((a, b) => b.rating - a.rating);
		if (sort === "name-asc")   data.sort((a, b) => a.name.localeCompare(b.name));

		const page  = filters.page  || 1;
		const limit = filters.limit || data.length;
		const total = data.length;
		const items = data.slice((page - 1) * limit, page * limit);

		return { items, total, page, pages: Math.ceil(total / limit) };
	}

	async getProduct(id) {
		await this._delay(30 + Math.random() * 80);
		const product = (window.products || []).find((p) => p.id === parseInt(id));
		if (!product) throw new Error("Produto não encontrado");
		return product;
	}

	async getCategories() {
		await this._delay(20);
		const cats = [...new Set((window.products || []).map((p) => p.category))];
		return cats.map((c) => ({ name: c, count: (window.products || []).filter((p) => p.category === c).length }));
	}

	// Mock: verifica cupom
	async validateCoupon(code) {
		await this._delay(300 + Math.random() * 200);
		const coupons = {
			TECH10:   { valid: true,  discount: 10,  type: "percent", message: "10% de desconto aplicado!" },
			TECH20:   { valid: true,  discount: 20,  type: "percent", message: "20% de desconto aplicado!" },
			FRETE:    { valid: true,  discount: 0,   type: "shipping", message: "Frete grátis aplicado!" },
			TECHSHOP: { valid: true,  discount: 50,  type: "fixed",   message: "R$ 50 de desconto aplicado!" },
		};
		return coupons[code.toUpperCase()] || { valid: false, message: "Cupom inválido ou expirado." };
	}

	// Mock: simula envio de formulário
	async submitForm(formData) {
		await this._delay(800 + Math.random() * 400);
		// Simula 5% de chance de erro
		if (Math.random() < 0.05) throw new Error("Erro de rede. Tente novamente.");
		return { success: true, message: "Dados enviados com sucesso!" };
	}
}

// Instância global
window.api = new API();

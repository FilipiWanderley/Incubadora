// ========================================
// SEARCH.JS — Issue 37
// Busca em tempo real com debounce e histórico
// ========================================

class Search {
	constructor(inputEl, options = {}) {
		this.input       = typeof inputEl === "string" ? document.querySelector(inputEl) : inputEl;
		if (!this.input) return;

		this.HISTORY_KEY = "techshop_search_history";
		this.MAX_HISTORY = 5;
		this.debounceMs  = options.debounceMs  || 300;
		this.minChars    = options.minChars    || 2;
		this.onSelect    = options.onSelect    || null;

		this.dropdown    = null;
		this._timer      = null;
		this._history    = this._loadHistory();

		this._buildDropdown();
		this._bindEvents();
	}

	// ── Histórico ─────────────────────────────────────────

	_loadHistory() {
		try {
			return JSON.parse(localStorage.getItem(this.HISTORY_KEY)) || [];
		} catch {
			return [];
		}
	}

	_saveHistory(term) {
		if (!term.trim()) return;
		this._history = [term, ...this._history.filter((h) => h !== term)].slice(0, this.MAX_HISTORY);
		try {
			localStorage.setItem(this.HISTORY_KEY, JSON.stringify(this._history));
		} catch {
			// QuotaExceededError — histórico mantido em memória
		}
	}

	clearHistory() {
		this._history = [];
		localStorage.removeItem(this.HISTORY_KEY);
	}

	// ── Dropdown ──────────────────────────────────────────

	_buildDropdown() {
		this.dropdown = document.createElement("div");
		this.dropdown.className = "search-dropdown";
		this.dropdown.setAttribute("role", "listbox");
		this.dropdown.setAttribute("aria-label", "Resultados da busca");
		this.dropdown.setAttribute("aria-live", "polite");
		this.dropdown.setAttribute("aria-atomic", "true");

		const wrap = this.input.closest(".search-wrapper, .header__search, form") || this.input.parentElement;
		wrap.style.position = "relative";
		wrap.appendChild(this.dropdown);
	}

	_showDropdown(html) {
		this.dropdown.innerHTML = html;
		this.dropdown.style.display = "";
		this.input.setAttribute("aria-expanded", "true");
	}

	_hideDropdown() {
		this.dropdown.style.display = "none";
		this.input.setAttribute("aria-expanded", "false");
	}

	// ── Busca ─────────────────────────────────────────────

	_search(term) {
		if (!term || term.length < this.minChars) {
			this._showHistory();
			return;
		}

		const q       = term.toLowerCase();
		const data    = window.products || [];
		const results = data.filter((p) =>
			p.name.toLowerCase().includes(q) ||
			(p.category  || "").toLowerCase().includes(q) ||
			(p.description || "").toLowerCase().includes(q)
		).slice(0, 8);

		this._renderResults(term, results);
	}

	_renderResults(term, results) {
		if (!results.length) {
			this._showDropdown(`
				<div class="search-dropdown__empty">
					<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
					<p>Nenhum resultado para <strong>"${this._escape(term)}"</strong></p>
				</div>
			`);
			return;
		}

		const base = window.location.pathname.includes("/pages/") ? "" : "pages/";
		const html = `
			<div class="search-dropdown__header">
				<span>${results.length} resultado${results.length !== 1 ? "s" : ""} para "${this._escape(term)}"</span>
				<button class="search-dropdown__clear" data-clear-history>Limpar histórico</button>
			</div>
			${results.map((p) => `
				<a href="${base}product-detail.html?id=${p.id}" class="search-dropdown__item" role="option" data-search-item="${p.id}">
					<img src="${p.image}" alt="${p.name}" class="search-dropdown__img" loading="lazy">
					<div class="search-dropdown__info">
						<span class="search-dropdown__name">${this._highlight(p.name, term)}</span>
						<span class="search-dropdown__category">${p.category}</span>
					</div>
					<span class="search-dropdown__price">${formatCurrency(p.price)}</span>
				</a>
			`).join("")}
		`;

		this._showDropdown(html);
		this._bindDropdownEvents();
	}

	_showHistory() {
		if (!this._history.length) {
			this._hideDropdown();
			return;
		}

		const html = `
			<div class="search-dropdown__header">
				<span>Buscas recentes</span>
				<button class="search-dropdown__clear" data-clear-history>Limpar</button>
			</div>
			${this._history.map((h) => `
				<button class="search-dropdown__history-item" data-history-item="${this._escape(h)}">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 .49-3.51"></path></svg>
					${this._escape(h)}
				</button>
			`).join("")}
		`;

		this._showDropdown(html);
		this._bindDropdownEvents();
	}

	_bindDropdownEvents() {
		this.dropdown.querySelector("[data-clear-history]")?.addEventListener("click", (e) => {
			e.stopPropagation();
			this.clearHistory();
			this._hideDropdown();
		});

		this.dropdown.querySelectorAll("[data-history-item]").forEach((btn) => {
			btn.addEventListener("click", () => {
				this.input.value = btn.dataset.historyItem;
				this._search(btn.dataset.historyItem);
			});
		});

		this.dropdown.querySelectorAll("[data-search-item]").forEach((item) => {
			item.addEventListener("click", () => {
				this._saveHistory(this.input.value);
				this._hideDropdown();
				this.onSelect?.(parseInt(item.dataset.searchItem));
			});
		});
	}

	// ── Eventos do input ──────────────────────────────────

	_bindEvents() {
		this.input.setAttribute("autocomplete", "off");
		this.input.setAttribute("aria-autocomplete", "list");
		this.input.setAttribute("aria-expanded", "false");
		this.input.setAttribute("role", "combobox");

		this.input.addEventListener("input", () => {
			clearTimeout(this._timer);
			this._timer = setTimeout(() => this._search(this.input.value.trim()), this.debounceMs);
		});

		this.input.addEventListener("focus", () => {
			if (!this.input.value.trim()) this._showHistory();
		});

		this.input.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				this._hideDropdown();
				this.input.blur();
			}
			if (e.key === "Enter") {
				const term = this.input.value.trim();
				if (term) {
					this._saveHistory(term);
					this._hideDropdown();
				}
			}
		});

		document.addEventListener("click", (e) => {
			if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
				this._hideDropdown();
			}
		});
	}

	// ── Helpers ───────────────────────────────────────────

	_highlight(text, term) {
		// Escapa o texto antes de inserir via innerHTML, depois envolve matches em <mark>
		const escaped = sanitizeHTML(text);
		const escapedTerm = sanitizeHTML(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		return escaped.replace(new RegExp(`(${escapedTerm})`, "gi"), "<mark>$1</mark>");
	}

	_escape(str) {
		return sanitizeHTML(str);
	}
}

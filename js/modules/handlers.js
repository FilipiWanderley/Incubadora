// ========================================
// HANDLERS.JS - Manipuladores de Eventos
// ========================================

function renderFeaturedProducts() {
	const container = document.getElementById("featuredProducts");
	if (!container) return;

	const featured = getFeaturedProducts();
	if (featured.length === 0) {
		container.innerHTML =
			'<p class="text-center">Nenhum produto em destaque.</p>';
		return;
	}

	container.innerHTML = featured.map((p) => createProductCard(p)).join("");
	initFavoriteButtons();
}

function initCartHandlers() {
	// Botão do ícone do carrinho no header → navega para cart.html
	const cartBtn = document.querySelector("[data-cart-btn]");
	if (cartBtn) {
		cartBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const base = window.location.pathname.includes("/pages/") ? "" : "pages/";
			window.location.href = base + "cart.html";
		});
	}

	// Botões "Adicionar ao Carrinho" em qualquer card/página
	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-add-cart]");
		if (!btn) return;
		e.preventDefault();

		const product = {
			id:            parseInt(btn.dataset.addCart) || parseInt(btn.dataset.productId) || Date.now(),
			name:          btn.dataset.productName          || "Produto",
			price:         parseFloat(btn.dataset.productPrice)         || 0,
			originalPrice: parseFloat(btn.dataset.productOriginalPrice) || null,
			image:         btn.dataset.productImage         || "",
			category:      btn.dataset.productCategory      || "",
		};

		// Adiciona ao carrinho persistente
		window.cart?.add(product);

		// Feedback visual no botão
		btn.disabled = true;
		const original = btn.innerHTML;
		btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Adicionado!`;

		setTimeout(() => {
			btn.disabled = false;
			btn.innerHTML = original;
		}, 1500);

		// Toast de confirmação
		if (window.showToast) {
			const base = window.location.pathname.includes("/pages/") ? "" : "pages/";
			window.showToast(
				`<strong>${product.name}</strong> adicionado ao carrinho! <a href="${base}cart.html" style="color:inherit;font-weight:700;text-decoration:underline">Ver carrinho →</a>`,
				"success",
				3000
			);
		}
	});
}

function initQuickViewHandler() {
	document.addEventListener("click", (e) => {
		const btn = e.target.closest("[data-quick-view]");
		if (!btn) return;
		e.preventDefault();

		const id       = parseInt(btn.dataset.quickView);
		const name     = btn.dataset.productName;
		const price    = parseFloat(btn.dataset.productPrice);
		const origPrice = parseFloat(btn.dataset.productOriginalPrice) || null;
		const image    = btn.dataset.productImage;
		const category = btn.dataset.productCategory;
		const rating   = parseFloat(btn.dataset.productRating) || 0;
		const reviews  = btn.dataset.productReviews || 0;
		const discount = btn.dataset.productDiscount || null;

		const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

		const base = window.location.pathname.includes("/pages/") ? "" : "pages/";

		const titleId = `qv-title-${id}`;

		const content = `
			<div class="product-modal">
				<div class="product-modal__gallery">
					<img src="${image}" alt="${name}" class="product-modal__img">
				</div>
				<div class="product-modal__info">
					<button class="modal__close product-modal__close" aria-label="Fechar">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
					</button>
					<span class="product-modal__category">${category}</span>
					<h2 class="product-modal__name" id="${titleId}">${name}</h2>
					<div class="product-modal__rating" aria-label="Avaliação: ${rating} de 5, ${reviews} avaliações">
						<span class="product-modal__stars">★ ${rating}</span>
						<span class="product-modal__reviews">(${reviews} avaliações)</span>
					</div>
					<div class="product-modal__pricing">
						${origPrice && origPrice > price ? `<span class="product-modal__original">${fmt(origPrice)}</span>` : ""}
						<span class="product-modal__price">${fmt(price)}</span>
						${discount ? `<span class="product-modal__discount">-${discount}%</span>` : ""}
					</div>
					<div class="product-modal__actions">
						<div class="qty-control" role="group" aria-label="Quantidade">
							<button class="qty-control__btn" id="qvQtyDec" aria-label="Diminuir quantidade">−</button>
							<input class="qty-control__input" type="number" id="qvQty" value="1" min="1" max="99" aria-label="Quantidade">
							<button class="qty-control__btn" id="qvQtyInc" aria-label="Aumentar quantidade">+</button>
						</div>
						<button class="btn btn--primary btn--lg product-modal__add-cart"
							data-add-cart="${id}"
							data-product-name="${name}"
							data-product-price="${price}"
							data-product-original-price="${origPrice || ""}"
							data-product-image="${image}"
							data-product-category="${category}">
							Adicionar ao Carrinho
						</button>
					</div>
					<a href="${base}product-detail.html?id=${id}" class="product-modal__details-link">
						Ver página completa do produto →
					</a>
				</div>
			</div>
		`;

		const modalId = window.modalSystem.create({
			id:      `quick-view-${id}`,
			title:   "",
			content,
			size:    "product",
		});

		// Override aria-labelledby depois que o modal é criado
		setTimeout(() => {
			const dialog = document.querySelector(`[data-modal-id="quick-view-${id}"] [role="dialog"]`);
			if (dialog) dialog.setAttribute("aria-labelledby", titleId);

			const qtyInput = document.getElementById("qvQty");
			document.getElementById("qvQtyDec")?.addEventListener("click", () => {
				qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
			});
			document.getElementById("qvQtyInc")?.addEventListener("click", () => {
				qtyInput.value = Math.min(99, parseInt(qtyInput.value) + 1);
			});

			// Passa a quantidade para o botão de add-cart
			const addCartBtn = document.querySelector(".product-modal__add-cart");
			if (addCartBtn) {
				addCartBtn.addEventListener("click", () => {
					const qty = parseInt(qtyInput?.value) || 1;
					const product = {
						id,
						name,
						price,
						originalPrice: origPrice,
						image,
						category,
					};
					for (let i = 0; i < qty; i++) window.cart?.add(product);
					window.modalSystem.close(modalId);
				});
			}
		}, 50);
	});
}

function initLoginHandler() {
	const loginBtn = document.querySelector("[data-login-btn]");
	if (!loginBtn) return;

	loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const base = window.location.pathname.includes("/pages/") ? "" : "pages/";

		const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
		const eyeOffIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;

		const content = `
      <div class="auth-modal__hero">
        <button class="auth-modal__hero-close modal__close" aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="auth-modal__hero-logo">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.25)"/>
            <path d="M12 20L18 26L28 14" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          TechShop
        </div>
        <p class="auth-modal__hero-tagline">Sua loja tech favorita</p>
      </div>

      <div class="auth-modal__tabs">
        <button id="authTabLogin" class="auth-modal__tab auth-modal__tab--active">Entrar</button>
        <button id="authTabRegister" class="auth-modal__tab">Criar Conta</button>
      </div>

      <div id="authPanelLogin">
        <div class="auth-modal__social">
          <button type="button" class="auth-modal__social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button type="button" class="auth-modal__social-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.4-57.7-155.5-127.4C46 790.6 0 665.7 0 545.7c0-230.4 149.4-352.6 296.6-352.6 74.1 0 135.7 48.7 182.3 48.7 44.6 0 114.4-52.6 201.2-52.6z"/><path d="M554.4 94.7c0-56.9 40.9-116.8 110.9-116.8 5.1 0 10.2.5 15.3 1.5-2 59.1-43.2 113.9-105.4 131.6-6.8 1.8-13.6 2.8-20.8 2.8z"/></svg>
            Apple
          </button>
        </div>

        <div class="auth-modal__divider"><span>ou continue com e-mail</span></div>

        <form id="modalLoginForm" novalidate>
          <div class="auth-modal__field">
            <label for="ml-email">E-mail <span style="color:var(--primary)">*</span></label>
            <div class="auth-modal__field-wrap">
              <span class="auth-modal__field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <input type="email" id="ml-email" name="email" class="form__input" placeholder="seu@email.com" required autocomplete="email">
            </div>
          </div>
          <div class="auth-modal__field">
            <label for="ml-password">Senha <span style="color:var(--primary)">*</span></label>
            <div class="auth-modal__field-wrap">
              <span class="auth-modal__field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type="password" id="ml-password" name="password" class="form__input" placeholder="••••••••" required minlength="6" autocomplete="current-password">
              <button type="button" class="auth-modal__field-toggle" id="toggleLoginPwd" aria-label="Mostrar senha">${eyeIcon}</button>
            </div>
          </div>
          <div class="auth-modal__remember">
            <label>
              <input type="checkbox" name="remember"> Lembrar-me
            </label>
            <a href="${base}login.html" class="auth-modal__forgot" style="margin:0">Esqueci a senha</a>
          </div>
          <button type="submit" class="auth-modal__submit">Entrar na minha conta</button>
        </form>
      </div>

      <div id="authPanelRegister" style="display:none">
        <form id="modalRegisterForm" novalidate>
          <div class="auth-modal__field">
            <label for="mr-name">Nome completo <span style="color:var(--primary)">*</span></label>
            <div class="auth-modal__field-wrap">
              <span class="auth-modal__field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              <input type="text" id="mr-name" name="fullName" class="form__input" placeholder="João Silva" required minlength="3" autocomplete="name">
            </div>
          </div>
          <div class="auth-modal__field">
            <label for="mr-email">E-mail <span style="color:var(--primary)">*</span></label>
            <div class="auth-modal__field-wrap">
              <span class="auth-modal__field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </span>
              <input type="email" id="mr-email" name="email" class="form__input" placeholder="seu@email.com" required autocomplete="email">
            </div>
          </div>
          <div class="auth-modal__field">
            <label for="mr-password">Senha <span style="color:var(--primary)">*</span></label>
            <div class="auth-modal__field-wrap">
              <span class="auth-modal__field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type="password" id="mr-password" name="password" class="form__input" placeholder="Mínimo 6 caracteres" required minlength="6" autocomplete="new-password">
              <button type="button" class="auth-modal__field-toggle" id="toggleRegPwd" aria-label="Mostrar senha">${eyeIcon}</button>
            </div>
          </div>
          <div class="auth-modal__field">
            <label for="mr-confirm">Confirmar senha <span style="color:var(--primary)">*</span></label>
            <div class="auth-modal__field-wrap">
              <span class="auth-modal__field-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </span>
              <input type="password" id="mr-confirm" name="confirmPassword" class="form__input" placeholder="Repita a senha" required minlength="6" autocomplete="new-password" data-match="password">
              <button type="button" class="auth-modal__field-toggle" id="toggleRegConfirm" aria-label="Mostrar senha">${eyeIcon}</button>
            </div>
          </div>
          <label class="auth-modal__check">
            <input type="checkbox" name="terms" required>
            <span>Li e aceito os <a href="#" style="color:var(--primary);font-weight:600">Termos de Uso</a> e a <a href="#" style="color:var(--primary);font-weight:600">Política de Privacidade</a></span>
          </label>
          <button type="submit" class="auth-modal__submit">Criar conta grátis</button>
        </form>
      </div>
    `;

		const modalId = window.modalSystem.create({
			title: "",
			content,
			actions: [],
		});

		setTimeout(() => {
			const tabLogin = document.getElementById("authTabLogin");
			const tabRegister = document.getElementById("authTabRegister");
			const panelLogin = document.getElementById("authPanelLogin");
			const panelRegister = document.getElementById("authPanelRegister");

			function activateTab(tab) {
				const isLogin = tab === "login";
				tabLogin.classList.toggle("auth-modal__tab--active", isLogin);
				tabRegister.classList.toggle("auth-modal__tab--active", !isLogin);
				panelLogin.style.display = isLogin ? "" : "none";
				panelRegister.style.display = !isLogin ? "" : "none";
			}

			tabLogin.addEventListener("click", () => activateTab("login"));
			tabRegister.addEventListener("click", () => activateTab("register"));

			function togglePassword(inputId, btn, eyeOn, eyeOff) {
				const input = document.getElementById(inputId);
				if (!input || !btn) return;
				btn.addEventListener("click", () => {
					const isText = input.type === "text";
					input.type = isText ? "password" : "text";
					btn.innerHTML = isText ? eyeOn : eyeOff;
				});
			}

			togglePassword("ml-password", document.getElementById("toggleLoginPwd"), eyeIcon, eyeOffIcon);
			togglePassword("mr-password", document.getElementById("toggleRegPwd"), eyeIcon, eyeOffIcon);
			togglePassword("mr-confirm", document.getElementById("toggleRegConfirm"), eyeIcon, eyeOffIcon);

			const loginForm = document.getElementById("modalLoginForm");
			const registerForm = document.getElementById("modalRegisterForm");

			if (loginForm) {
				const v = new FormValidator(loginForm);
				loginForm.addEventListener("submit", (ev) => {
					ev.preventDefault();
					if (v.validateAll()) {
						window.modalSystem.close(modalId);
						window.modalSystem.success({
							title: "Bem-vindo de volta!",
							content: '<p class="modal__text">Login realizado com sucesso.</p>',
							actions: [{ label: "Minha Conta", variant: "primary", onClick: () => (window.location.href = base + "profile.html") }],
						});
					}
				});
			}

			if (registerForm) {
				const v = new FormValidator(registerForm);
				registerForm.addEventListener("submit", (ev) => {
					ev.preventDefault();
					if (v.validateAll()) {
						window.modalSystem.close(modalId);
						window.modalSystem.success({
							title: "Conta criada!",
							content: '<p class="modal__text">Bem-vindo à TechShop! Sua conta está pronta.</p>',
							actions: [{ label: "Acessar minha conta", variant: "primary", onClick: () => (window.location.href = base + "profile.html") }],
						});
					}
				});
			}
		}, 50);
	});
}

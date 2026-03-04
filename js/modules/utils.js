// ========================================
// UTILS.JS - Funções Utilitárias
// ========================================

function formatCurrency(value) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}

function generateStars(rating) {
	const full = Math.floor(rating);
	const half = rating % 1 >= 0.5 ? 1 : 0;
	const empty = 5 - full - half;
	let stars = "";

	for (let i = 0; i < full; i++) {
		stars +=
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
	}

	if (half) {
		stars +=
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" opacity="0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
	}

	for (let i = 0; i < empty; i++) {
		stars +=
			'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
	}

	return stars;
}

function createProductCard(product) {
	const {
		id,
		name,
		price,
		originalPrice,
		discount,
		image,
		category,
		rating,
		reviews,
	} = product;
	const stars = generateStars(rating);
	const priceFormatted = formatCurrency(price);
	const originalPriceFormatted = formatCurrency(originalPrice);

	return `
    <div class="product-card">
      ${discount ? `<span class="product-card__badge">-${discount}%</span>` : ""}
      <div class="product-card__image-wrapper">
        <img src="${image}" alt="${name}" class="product-card__image" loading="lazy">
        <div class="product-card__quick-view">
          <a href="product-detail.html?id=${id}" class="btn btn-white">Ver Detalhes</a>
        </div>
      </div>
      <div class="product-card__content">
        <span class="product-card__category">${category}</span>
        <h3 class="product-card__name"><a href="product-detail.html?id=${id}">${name}</a></h3>
        <div class="product-card__rating">
          <div class="product-card__stars">${stars}</div>
          <span class="product-card__reviews">(${reviews})</span>
        </div>
        <div class="product-card__price-wrapper">
          ${originalPrice > price ? `<span class="product-card__original-price">${originalPriceFormatted}</span>` : ""}
          <span class="product-card__price">${priceFormatted}</span>
        </div>
      </div>
      <div class="product-card__footer">
        <button class="btn btn-primary product-card__btn" data-add-cart data-product-id="${id}" data-product-name="${name}">
          Adicionar ao Carrinho
        </button>
        <button class="product-card__favorite" data-favorite data-product-id="${id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function initFavoriteButtons() {
	const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

	document.querySelectorAll("[data-favorite]").forEach((btn) => {
		const productId = btn.dataset.productId;

		if (favorites.includes(productId)) {
			btn.classList.add("active");
			btn.querySelector("svg").setAttribute("fill", "currentColor");
		}

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			toggleFavorite(productId, btn);
		});
	});
}

function toggleFavorite(productId, btn) {
	let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
	const svg = btn.querySelector("svg");

	if (favorites.includes(productId)) {
		favorites = favorites.filter((id) => id !== productId);
		btn.classList.remove("active");
		svg.setAttribute("fill", "none");
	} else {
		favorites.push(productId);
		btn.classList.add("active");
		svg.setAttribute("fill", "currentColor");
		btn.style.transform = "scale(1.3)";
		setTimeout(() => {
			btn.style.transform = "";
		}, 200);
	}

	localStorage.setItem("favorites", JSON.stringify(favorites));
}

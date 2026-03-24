// ========================================
// VALIDATION-ADVANCED.JS — Issue 43
// CPF, CEP (ViaCEP), força de senha,
// máscaras de input
// ========================================

// ── Validação de CPF ──────────────────────────────────────

function validateCPF(cpf) {
	cpf = cpf.replace(/\D/g, "");
	if (cpf.length !== 11) return false;
	if (/^(\d)\1{10}$/.test(cpf)) return false; // todos os dígitos iguais

	const calc = (cpf, len) => {
		let sum = 0;
		for (let i = 0; i < len; i++) sum += parseInt(cpf[i]) * (len + 1 - i);
		const rem = (sum * 10) % 11;
		return rem === 10 || rem === 11 ? 0 : rem;
	};

	return calc(cpf, 9) === parseInt(cpf[9]) && calc(cpf, 10) === parseInt(cpf[10]);
}

// ── Validação de CNPJ ──────────────────────────────────────

function validateCNPJ(cnpj) {
	cnpj = cnpj.replace(/\D/g, "");
	if (cnpj.length !== 14) return false;
	if (/^(\d)\1{13}$/.test(cnpj)) return false;

	const calc = (cnpj, len) => {
		let sum = 0, pos = len - 7;
		for (let i = len; i >= 1; i--) {
			sum += parseInt(cnpj[len - i]) * pos--;
			if (pos < 2) pos = 9;
		}
		return sum % 11 < 2 ? 0 : 11 - (sum % 11);
	};

	return calc(cnpj, 12) === parseInt(cnpj[12]) && calc(cnpj, 13) === parseInt(cnpj[13]);
}

// ── Consulta ViaCEP ───────────────────────────────────────

async function lookupCEP(cep) {
	const clean = cep.replace(/\D/g, "");
	if (clean.length !== 8) throw new Error("CEP inválido");

	const data = await window.api?.get(`https://viacep.com.br/ws/${clean}/json/`)
		?? await fetch(`https://viacep.com.br/ws/${clean}/json/`).then((r) => r.json());

	if (data.erro) throw new Error("CEP não encontrado");
	return data;
}

// Preenche campos de endereço ao digitar CEP
function initCEPAutofill(cepInput, fieldMap = {}) {
	if (!cepInput) return;

	const defaults = {
		logradouro: "address-street",
		bairro:     "address-neighborhood",
		localidade: "address-city",
		uf:         "address-state",
	};

	const fields = Object.assign({}, defaults, fieldMap);

	cepInput.addEventListener("blur", async () => {
		const val = cepInput.value.replace(/\D/g, "");
		if (val.length !== 8) return;

		try {
			cepInput.classList.add("loading");
			const data = await lookupCEP(val);
			Object.entries(fields).forEach(([key, id]) => {
				const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`);
				if (el && data[key]) el.value = data[key];
			});
		} catch {
			window.showToast?.("CEP não encontrado. Preencha o endereço manualmente.", "warning");
		} finally {
			cepInput.classList.remove("loading");
		}
	});
}

// ── Medidor de força de senha ─────────────────────────────

function measurePasswordStrength(password) {
	let score = 0;
	if (password.length >= 8)  score++;
	if (password.length >= 12) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[a-z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	const levels = [
		{ label: "",        color: "",          width: "0%"   },
		{ label: "Fraca",   color: "var(--error)",   width: "25%"  },
		{ label: "Razoável",color: "var(--warning)",  width: "50%"  },
		{ label: "Boa",     color: "var(--info)",    width: "75%"  },
		{ label: "Forte",   color: "var(--success)", width: "100%" },
	];

	const idx = score <= 1 ? 1 : score <= 2 ? 2 : score <= 4 ? 3 : 4;
	return { score, ...levels[idx] };
}

// Adiciona medidor de força em um campo de senha
function initPasswordStrengthMeter(inputEl, meterContainerId) {
	if (!inputEl) return;

	let container = document.getElementById(meterContainerId);
	if (!container) {
		container = document.createElement("div");
		container.className = "password-strength";
		container.innerHTML = `
			<div class="password-strength__bar">
				<div class="password-strength__fill"></div>
			</div>
			<span class="password-strength__label"></span>
		`;
		inputEl.closest(".form__group, .auth-modal__field")?.appendChild(container);
	}

	const fill  = container.querySelector(".password-strength__fill");
	const label = container.querySelector(".password-strength__label");

	inputEl.addEventListener("input", () => {
		const result = measurePasswordStrength(inputEl.value);
		if (!inputEl.value) {
			fill.style.width      = "0%";
			label.textContent     = "";
			return;
		}
		fill.style.width          = result.width;
		fill.style.background     = result.color;
		label.textContent         = result.label;
		label.style.color         = result.color;
	});
}

// ── Máscaras de input ─────────────────────────────────────

const masks = {
	cpf(value) {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
			.slice(0, 14);
	},
	cnpj(value) {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1/$2")
			.replace(/(\d{4})(\d{1,2})$/, "$1-$2")
			.slice(0, 18);
	},
	cep(value) {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{5})(\d{1,3})/, "$1-$2")
			.slice(0, 9);
	},
	phone(value) {
		const digits = value.replace(/\D/g, "");
		if (digits.length <= 10) {
			return digits
				.replace(/(\d{2})(\d)/, "($1) $2")
				.replace(/(\d{4})(\d)/, "$1-$2")
				.slice(0, 14);
		}
		return digits
			.replace(/(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{5})(\d)/, "$1-$2")
			.slice(0, 15);
	},
	card(value) {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{4})(?=\d)/g, "$1 ")
			.slice(0, 19);
	},
	expiry(value) {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "$1/$2")
			.slice(0, 5);
	},
};

function applyMask(input, type) {
	if (!input || !masks[type]) return;
	input.addEventListener("input", (e) => {
		const masked = masks[type](e.target.value);
		e.target.value = masked;
	});
}

// ── Auto-detecta campos com data-mask ────────────────────

function initMasks() {
	document.querySelectorAll("[data-mask]").forEach((input) => {
		applyMask(input, input.dataset.mask);
	});
}

// ── CEP fields com data-cep ───────────────────────────────

function initCEPFields() {
	document.querySelectorAll("[data-cep]").forEach((input) => {
		applyMask(input, "cep");
		initCEPAutofill(input);
	});
}

// ── Validação de CPF em inputs com data-validate-cpf ─────

function initCPFValidation() {
	document.querySelectorAll("[data-validate-cpf]").forEach((input) => {
		applyMask(input, "cpf");
		input.addEventListener("blur", () => {
			const valid = validateCPF(input.value);
			if (!valid && input.value.replace(/\D/g, "").length === 11) {
				input.classList.add("input-error");
				let err = input.nextElementSibling;
				if (!err || !err.classList.contains("form__error")) {
					err = document.createElement("span");
					err.className = "form__error";
					input.parentNode.insertBefore(err, input.nextSibling);
				}
				err.textContent = "CPF inválido";
			} else {
				input.classList.remove("input-error");
				const err = input.nextElementSibling;
				if (err?.classList.contains("form__error")) err.textContent = "";
			}
		});
	});
}

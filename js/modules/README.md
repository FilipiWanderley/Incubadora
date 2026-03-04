# 📦 Módulos JavaScript

Este diretório contém os módulos JavaScript organizados e modularizados da aplicação.

## 📋 Estrutura

### `modal.js` (Classe Modal)

Sistema completo de modais com suporte a:

- Criar modais personalizados
- Fechar com ESC ou clique no overlay
- Métodos de sucesso, erro e informação
- Animações suaves

**Uso:**

```javascript
window.modalSystem.success({
	title: "Sucesso!",
	content: "Operação realizada.",
	actions: [{ label: "OK", variant: "primary" }],
});
```

---

### `form-validator.js` (Classe FormValidator)

Validação de formulários com suporte a:

- Validação em tempo real (blur e input)
- Validação de tipos (email, texto, etc)
- Mensagens de erro personalizadas
- Integração com formatos específicos

**Uso:**

```javascript
const validator = new FormValidator("#myForm");
validator.validateAll();
```

---

### `navigation.js` (Classe Navigation)

Gerencia navegação e menu com suporte a:

- Menu móvel responsivo
- Toggle hamburger
- Highlight de página ativa
- Scroll detection para efeitos

**Uso:**

```javascript
window.navigation = new Navigation();
```

---

### `utils.js` (Funções Utilitárias)

Funções auxiliares para uso geral:

- `formatCurrency()` - Formata valores monetários
- `generateStars()` - Gera estrelas para rating
- `createProductCard()` - Cria card de produto
- `initFavoriteButtons()` - Inicializa botões favoritos
- `toggleFavorite()` - Alterna favoritismo

**Uso:**

```javascript
const formatted = formatCurrency(99.99);
const stars = generateStars(4.5);
```

---

### `products-gallery.js` (Classe ProductsGallery)

Galeria de produtos com filtros:

- Filtar por categoria
- Filtrar por preço (min/max)
- Ordenação (preço, nome, rating)
- Busca em tempo real
- Contagem de resultados

**Uso:**

```javascript
window.productsGallery = new ProductsGallery();
```

---

### `handlers.js` (Funções de Manipulação)

Handlers de eventos para páginas:

- `renderFeaturedProducts()` - Renderiza produtos em destaque
- `initCartHandlers()` - Gerencia carrinho
- `initLoginHandler()` - Gerencia login

**Uso automático via `app.js`**

---

## 🚀 Como Usar

### Importar nos arquivos HTML:

```html
<!-- Modules -->
<script src="js/modules/modal.js"></script>
<script src="js/modules/form-validator.js"></script>
<script src="js/modules/navigation.js"></script>
<script src="js/modules/utils.js"></script>
<script src="js/modules/products-gallery.js"></script>
<script src="js/modules/handlers.js"></script>

<!-- Data & App -->
<script src="js/products.js"></script>
<script src="js/app.js"></script>
```

### Ordem de Carregamento:

1. **Módulos** - Definem classes e funções
2. **Data** (products.js) - Dados da aplicação
3. **App** (app.js) - Inicializa tudo

---

## 📊 Comparação

| Arquivo                 | Antes      | Depois     | Redução    |
| ----------------------- | ---------- | ---------- | ---------- |
| **app.js**              | 786 linhas | 32 linhas  | **96%** ⬇️ |
| **modal.js**            | (incluso)  | 175 linhas | ➕ Novo    |
| **form-validator.js**   | (incluso)  | 97 linhas  | ➕ Novo    |
| **navigation.js**       | (incluso)  | 73 linhas  | ➕ Novo    |
| **utils.js**            | (incluso)  | 165 linhas | ➕ Novo    |
| **products-gallery.js** | (incluso)  | 178 linhas | ➕ Novo    |
| **handlers.js**         | (incluso)  | 148 linhas | ➕ Novo    |

**Total JS organizado: 868 linhas modulares** vs **786 linhas monolíticas** ✨

---

## 💡 Vantagens

✅ **Organização** - Cada módulo tem uma responsabilidade clara  
✅ **Manutenção** - Mais fácil encontrar e editar código  
✅ **Reutilização** - Classes podem ser usadas em outros projetos  
✅ **Performance** - Carregamento paralelo possível  
✅ **Escalabilidade** - Fácil adicionar novos módulos  
✅ **Limpeza** - app.js fica simples e legível

---

## 🔄 Extensibilidade

Para adicionar novo módulo:

1. Crie arquivo `novo-modulo.js` nesta pasta
2. Defina classe ou funções
3. Adicione import no HTML antes de `app.js`
4. Use em `app.js` ou diretamente no HTML

**Exemplo:**

```javascript
// modules/novo-modulo.js
class NovoModulo {
	constructor() {
		// inicializar
	}
}

// No HTML:
<script src="js/modules/novo-modulo.js"></script>;

// Em app.js:
window.novoModulo = new NovoModulo();
```

---

**Desenvolvido com ❤️ para manutenibilidade e escalabilidade.**

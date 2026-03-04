# 🛒 E-commerce TechShop - Incubadora Nível 1

Um e-commerce moderno e responsivo desenvolvido com **HTML5, CSS3 e JavaScript puro (Vanilla JS)**. Este projeto demonstra práticas de desenvolvimento front-end profissional sem uso de frameworks.

![Status](https://img.shields.io/badge/Status-Completo-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Páginas](#páginas)
- [Componentes](#componentes)
- [Responsividade](#responsividade)

---

## 🎯 Sobre o Projeto

Este é um **e-commerce completo de tecnologia** desenvolvido como parte da Incubadora Nível 1. O projeto foi construído do zero usando apenas HTML, CSS e JavaScript puro, sem dependências de bibliotecas ou frameworks externos.

### Objetivos do Projeto

✅ Demonstrar domínio de HTML5 semântico  
✅ Implementar CSS moderno com variáveis e arquitetura escalável  
✅ Criar JavaScript vanilla organizado e modular  
✅ Garantir responsividade mobile-first  
✅ Implementar validação de formulários  
✅ Criar sistema de modal reutilizável  
✅ Desenvolver interface pixel-perfect

---

## ⚡ Funcionalidades

### Principais Features

- 🏠 **Home Page**: Hero section, produtos em destaque, seção de benefícios
- 🛍️ **Galeria de Produtos**: Sistema de filtros por categoria e preço, busca em tempo real, ordenação
- 📦 **Detalhes do Produto**: Galeria de imagens, especificações técnicas, adicionar ao carrinho
- 🔍 **Busca e Filtros**: Filtros por categoria, faixa de preço e pesquisa textual
- ❤️ **Sistema de Favoritos**: Salvamento em LocalStorage
- 🎨 **Sistema de Modal**: Modais reutilizáveis para alertas, confirmações e formulários
- ✅ **Validação de Formulários**: Validação em tempo real com feedback visual
- 📱 **100% Responsivo**: Layout adaptativo para mobile, tablet e desktop
- 🎭 **Animações**: Transições suaves e animações CSS

### Funcionalidades de UI/UX

- Menu mobile com hamburger
- Scroll suave para âncoras
- Loading states
- Estados de erro
- Feedback visual de ações
- Breadcrumb navigation
- Sticky header
- Rating com estrelas

---

## 📁 Estrutura do Projeto

```
incubadora_nivel1/
│
├── index.html                 # Página inicial
├── products.html              # Galeria de produtos
├── product-detail.html        # Detalhes do produto
├── README.md                  # Documentação
│
├── css/
│   ├── reset.css             # CSS Reset normalizado
│   ├── variables.css         # Design tokens (cores, espaçamentos, etc)
│   ├── global.css            # Estilos globais e elementos base
│   ├── utilities.css         # Classes utilitárias (flexbox, grid, spacing)
│   ├── header.css            # Estilos do cabeçalho/navegação
│   ├── footer.css            # Estilos do rodapé
│   ├── modal.css             # Sistema de modal
│   ├── forms.css             # Estilos de formulários
│   ├── home.css              # Estilos da página home
│   ├── products.css          # Estilos da galeria de produtos
│   ├── product-detail.css    # Estilos da página de detalhes
│   └── responsive.css        # Media queries e responsividade
│
├── js/
│   ├── products-data.js      # Dados dos produtos (Mock API)
│   ├── main.js               # JavaScript principal e utils
│   ├── nav.js                # Navegação e menu mobile
│   ├── modal.js              # Sistema de modal
│   ├── form-validation.js    # Validação de formulários
│   ├── home.js               # JavaScript da home
│   ├── products-gallery.js   # Galeria com filtros
│   └── product-detail.js     # Página de detalhes
│
├── assets/
│   ├── images/               # Imagens do projeto
│   └── icons/                # Ícones customizados
│
└── prints/                   # Screenshots do projeto
```

---

## 🛠️ Tecnologias Utilizadas

### Core

- **HTML5**: Semântico e acessível
- **CSS3**: Variáveis CSS, Flexbox, Grid, Animations
- **JavaScript (ES6+)**: Vanilla JS com classes, arrow functions, template literals

### Técnicas CSS

- CSS Custom Properties (variáveis)
- CSS Grid & Flexbox
- Mobile-first approach
- BEM-like naming convention

---

## 🚀 Como Executar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Live Server (opcional, mas recomendado)

### Instalação

1. **Navegue até o diretório**

   ```bash
   cd "C:\Users\PC GAMER 107\Desktop\incubadora_nivel1"
   ```

2. **Abra com Live Server** (VS Code)
   - Instale a extensão "Live Server"
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"

3. **Ou abra diretamente no navegador**
   - Abra o arquivo `index.html` no seu navegador
   - Navegue pelas páginas através dos links

### URLs Disponíveis

- **Home**: `index.html`
- **Produtos**: `products.html`
- **Detalhes**: `product-detail.html?id=1`

---

## 📄 Páginas

### 1. Home Page (`index.html`)

**Seções:**

- Header fixo com navegação
- Hero section com CTAs e estatísticas
- Produtos em destaque (4 produtos featured)
- Seção de benefícios (frete grátis, pagamento seguro, etc)
- Footer com newsletter

**Arquivos relacionados:**

- `css/home.css`
- `js/home.js`

### 2. Galeria de Produtos (`products.html`)

**Funcionalidades:**

- Filtros por categoria (checkbox)
- Filtro por faixa de preço (min/max)
- Busca em tempo real (debounced)
- Ordenação (preço, nome, rating)
- Grid responsivo com 12 produtos
- Card de produto com hover effects

**Arquivos relacionados:**

- `css/products.css`
- `js/products-gallery.js`

### 3. Detalhes do Produto (`product-detail.html`)

**Funcionalidades:**

- Galeria de imagens com thumbnails
- Informações detalhadas do produto
- Especificações técnicas
- Badge de desconto e status de estoque
- Adicionar ao carrinho
- Adicionar aos favoritos
- Produtos relacionados (mesma categoria)
- Breadcrumb navigation

**Arquivos relacionados:**

- `css/product-detail.css`
- `js/product-detail.js`

---

## 🧩 Componentes

### Header/Navegação

- Logo clicável
- Menu de navegação responsivo
- Ícones de usuário e carrinho
- Menu mobile (hamburger) com overlay
- Efeito de scroll (shadow)
- Active state nos links

### Footer

- Logo e descrição
- Links rápidos organizados
- Redes sociais
- Formulário de newsletter
- Métodos de pagamento
- Copyright

### Modal System

Sistema completo de modais reutilizáveis com métodos helper:

**Tipos:**

- `success()` - Sucesso
- `error()` - Erro
- `warning()` - Aviso
- `info()` - Informação
- `confirm()` - Confirmação (retorna Promise)
- `create()` - Modal customizado

**Exemplo de uso:**

```javascript
// Modal de sucesso
window.modalSystem.success({
	title: "Produto Adicionado!",
	content: "O produto foi adicionado ao carrinho",
	actions: [{ label: "OK", variant: "primary", onClick: () => {} }],
});

// Modal de confirmação
const confirmed = await window.modalSystem.confirm({
	title: "Confirmar",
	content: "Deseja remover este item?",
	confirmLabel: "Sim, remover",
	cancelLabel: "Cancelar",
});
```

### Product Card

Componente reutilizável presente em home e galeria:

- Imagem com zoom no hover
- Badge de desconto (se houver)
- Categoria
- Nome do produto (linha clamp 2)
- Rating com estrelas + reviews
- Preço atual e original (riscado)
- Botão "Adicionar ao Carrinho"
- Botão de favoritar (com persistência)

### Form Validation

Sistema robusto de validação de formulários:

**Validações suportadas:**

- Required fields
- Email format
- Min/Max length
- Pattern (regex)
- Phone number
- Number range (min/max)
- Password confirmation
- Custom validation via data-attribute

**Exemplo:**

```html
<form
	data-validate
	id="myForm">
	<input
		type="email"
		name="email"
		required
		placeholder="seu@email.com" />
	<input
		type="password"
		name="password"
		required
		minlength="6" />
	<button type="submit">Enviar</button>
</form>

<script>
	const validator = new FormValidator("#myForm");
	validator.onSubmit = async (data) => {
		console.log("Form data:", data);
		// Seu código aqui
	};
</script>
```

---

## 📱 Responsividade

### Breakpoints Utilizados

```css
/* Mobile First */
--breakpoint-sm: 480px; /* Small mobile */
--breakpoint-md: 768px; /* Tablet */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Large desktop */
```

### Mobile (< 768px)

- Menu hamburguer lateral
- Grid de produtos 1 coluna
- Botões full-width
- Espaçamentos reduzidos
- Sidebar de filtros em overlay
- Stack vertical de elementos

### Tablet (768px - 1023px)

- Grid de 2 colunas
- Sidebar colapsável
- Layout híbrido
- Espaçamentos médios

### Desktop (> 1024px)

- Grid de 3-4 colunas
- Sidebar fixa e sticky
- Hover effects completos
- Espaçamentos amplos
- Melhor aproveitamento do espaço

---

## ✨ Boas Práticas Implementadas

### HTML

✅ Semântico (header, nav, main, section, article, footer)  
✅ Atributos ARIA para acessibilidade  
✅ Meta tags para SEO e redes sociais  
✅ Lazy loading de imagens (loading="lazy")  
✅ Estrutura hierárquica correta de headings  
✅ Forms acessíveis com labels

### CSS

✅ Variáveis CSS para design system consistente  
✅ Mobile-first approach  
✅ Metodologia BEM-like para nomenclatura  
✅ Modularização por componente  
✅ Utilities classes reutilizáveis  
✅ Performance (transform, will-change)  
✅ Transitions e animations suaves  
✅ Reset CSS normalizado

### JavaScript

✅ Classes ES6 para encapsulamento  
✅ Event delegation para performance  
✅ Debounce na busca para reduzir processamento  
✅ LocalStorage para persistência de favoritos  
✅ Tratamento de erros e edge cases  
✅ Código modular e reutilizável  
✅ Comentários e documentação clara  
✅ Template literals para HTML dinâmico

### Performance

✅ Lazy loading de imagens  
✅ Debounce/Throttle em eventos  
✅ Intersection Observer para animações  
✅ CSS separado por página  
✅ JavaScript modular  
✅ Animações com transform (GPU)

### Acessibilidade

✅ Contraste adequado (WCAG AA)  
✅ Navegação por teclado funcional  
✅ ARIA labels em elementos interativos  
✅ Focus visible customizado  
✅ HTML semântico  
✅ Alt text em todas as imagens  
✅ Formulários acessíveis

---

## 🎨 Design System

### Paleta de Cores

```css
/* Primary Brand */
--primary-color: #ff6b35;
--primary-light: #ff8c5a;
--primary-dark: #e85a28;

/* Secondary */
--secondary-color: #004e89;
--secondary-light: #1a6ba8;
--secondary-dark: #003a66;

/* Neutrals */
--color-white: #ffffff;
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;

/* Status Colors */
--color-success: #10b981;
--color-error: #ef4444;
--color-warning: #f59e0b;
--color-info: #3b82f6;
```

### Tipografia

```css
/* Font Families */
--font-primary: "Inter", sans-serif;
--font-secondary: "Poppins", sans-serif;

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Espaçamento

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
```

### Border Radius

```css
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.5rem; /* 24px */
--radius-full: 9999px; /* Circle */
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
```

---

## 🔧 Funcionalidades Técnicas

### Sistema de Favoritos

- Persiste no LocalStorage
- Sincronizado em todas as páginas
- Visual feedback instantâneo
- Icon fill animation

### Sistema de Busca

- Debounced search (300ms)
- Busca em nome, categoria e descrição
- Case-insensitive
- Resultados em tempo real
- Zero results state

### Sistema de Filtros

- Múltiplos filtros combinados (AND logic)
- Filtro por categoria (checkboxes)
- Filtro por faixa de preço
- Contagem dinâmica de resultados
- Clear all filters
- Filtros persistem durante ordenação

### Sistema de Ordenação

- Por preço (crescente/decrescente)
- Por nome (A-Z / Z-A)
- Por rating (mais avaliado)
- Mantém filtros aplicados
- Atualização instantânea

---

## 📊 Estatísticas do Projeto

### Métricas

- **Total de arquivos**: 20 arquivos
- **Linhas de código**: ~8.500+ linhas
- **Produtos cadastrados**: 12 produtos
- **Categorias**: 9 categorias
- **Páginas HTML**: 3 páginas
- **Componentes CSS**: 12 arquivos CSS
- **Módulos JavaScript**: 7 módulos JS

### Produtos por Categoria

- Eletrônicos: 1
- Wearables: 1
- Fotografia: 1
- Computadores: 1
- Periféricos: 4
- Monitores: 1
- Móveis: 1
- Armazenamento: 1
- Áudio: 1
- Tablets: 1

---

## 🚀 Próximas Melhorias

- [ ] Implementar carrinho de compras funcional com total
- [ ] Sistema de autenticação de usuário
- [ ] Integração com API REST backend
- [ ] Checkout completo com múltiplos steps
- [ ] Sistema de reviews e avaliações
- [ ] Página de wishlist/favoritos
- [ ] Comparação de produtos lado a lado
- [ ] Dark mode toggle
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados (Jest)
- [ ] Histórico de pedidos
- [ ] Filtros avançados (marca, preço range slider)

---

## 📝 Notas Técnicas

### Decisões de Arquitetura

1. **Vanilla JavaScript**: Decisão consciente para demonstrar domínio de JS puro sem frameworks
2. **CSS Modular**: Cada componente isolado em seu próprio arquivo para manutenibilidade
3. **Mobile-First**: Abordagem mobile-first nas media queries
4. **LocalStorage**: Simulação de backend para favoritos (em produção seria API)
5. **Mock Data**: Array de produtos hardcoded (em produção viria de API)
6. **No Build Tools**: Projeto roda diretamente sem necessidade de build/transpilação

### Desafios Técnicos Superados

✅ Sistema de modal completamente reutilizável sem jQuery  
✅ Validação de formulários robusta com múltiplos tipos  
✅ Filtros combinados eficientes com performance  
✅ Responsividade avançada com sidebar overlay mobile  
✅ Gerenciamento de estado sem state management library  
✅ Animações CSS performáticas com GPU acceleration

---

## 👨‍💻 Desenvolvimento

**Desenvolvido como parte da Incubadora de Desenvolvedores - Nível 1**

### Stack Tecnológica

- HTML5
- CSS3
- JavaScript ES6+
- Google Fonts (Inter + Poppins)
- Unsplash (imagens de produto)

---

## 📄 Licença

Este projeto é de código aberto para fins educacionais e de portfólio.

---

## 🙏 Créditos

- **Fontes**: Google Fonts (Inter e Poppins)
- **Imagens**: Unsplash (fotos de produtos)
- **Ícones**: SVG inline (Feather Icons)
- **Inspiração**: Lojas online modernas
- **Documentação**: MDN Web Docs, CSS-Tricks

---

**⭐ Projeto desenvolvido com dedicação e atenção aos detalhes!**

---

_Última atualização: Março 2026_
_Versão: 1.0.0_

### Características Técnicas

- **CSS Modular**: Arquivos separados por componente para fácil manutenção
- **JavaScript Vanilla**: Sem dependências de frameworks
- **Dados Estáticos**: Array de produtos em JavaScript
- **Semantic HTML5**: Estrutura semântica e acessível
- **Cross-browser**: Compatível com navegadores modernos

## 💻 Como Usar

1. **Clone ou baixe o projeto**
2. **Abra no navegador**
   - Método 1: Clique duas vezes em `index.html`
   - Método 2: Use um servidor local (recomendado)

     ```bash
     # Python 3
     python -m http.server 8000

     # Node.js (http-server)
     npx http-server
     ```

3. **Navegue pelo site**
   - Página inicial: Hero section com ofertas em destaque
   - Galeria: Visualize todos os produtos disponíveis
   - Detalhes: Clique em qualquer produto para ver mais informações

## 🎨 Design

O site foi desenvolvido seguindo metodologia **pixel-perfect** baseada nos mockups fornecidos na pasta `prints/`:

- Print 1: Hero section, navbar e ofertas iniciais
- Print 2: Galeria de produtos
- Print 3: Página de oferta individualizada

## 📱 Responsividade

O site utiliza abordagem **desktop-first** com breakpoints:

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔧 Customização

### Alterar Cores

Edite as variáveis CSS em `css/variables.css`:

```css
:root {
	--primary-color: #your-color;
	--secondary-color: #your-color;
}
```

### Adicionar/Editar Produtos

Modifique o array em `js/products-data.js`:

```javascript
const products = [
	{
		id: 1,
		name: "Nome do Produto",
		price: 99.99,
		image: "url-da-imagem",
		// ...
	},
];
```

## 📄 Licença

Projeto educacional - Incubadora Nível 1

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript**

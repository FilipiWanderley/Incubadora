# TechShop — E-commerce Front-end

E-commerce de tecnologia construído com **HTML5, CSS3 e JavaScript puro (Vanilla JS)**, sem frameworks ou dependências externas.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Funcionalidades principais

- **Home** — Hero section, produtos em destaque e seção de benefícios
- **Galeria de produtos** — Filtros por categoria e faixa de preço, busca em tempo real e ordenação
- **Página de produto** — Galeria de imagens, especificações técnicas e produtos relacionados
- **Favoritos** — Adicionar e remover favoritos com persistência em `localStorage`
- **Sistema de Modal** — Modais reutilizáveis para alertas, confirmações e formulários
- **Validação de formulários** — Validação em tempo real com feedback visual
- **Menu mobile** — Hamburger menu com overlay e scroll bloqueado
- **Design responsivo** — Mobile-first, com breakpoints para tablet e desktop

---

## Como rodar

Nenhuma dependência para instalar. Basta abrir o `index.html` no navegador.

**Recomendado:** use a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) do VS Code para evitar problemas com módulos JS.

```bash
python3 scripts/dev_server.py --port 4190
```

Páginas disponíveis:

| Página | Arquivo |
|---|---|
| Home | `index.html` |
| Galeria | `products.html` |
| Produto | `product-detail.html?id=1` |

---

## Estrutura do projeto

```
/
├── index.html
├── products.html
├── product-detail.html
├── css/
│   ├── variables.css       # Design tokens (cores, espaçamentos)
│   ├── global.css
│   ├── header.css / footer.css
│   ├── modal.css / forms.css
│   ├── home.css / products.css / product-detail.css
│   └── responsive.css
├── js/
│   ├── products-data.js    # Mock de dados dos produtos
│   ├── main.js             # Utils globais
│   ├── nav.js / modal.js / form-validation.js
│   ├── home.js / products-gallery.js / product-detail.js
└── assets/
```

---

## Como participar

1. **Faça um fork** deste repositório
2. Clone o seu fork localmente
3. Escolha uma ou mais issues do arquivo [`github-issues.md`](./github-issues.md)
4. Implemente a feature ou melhoria **no seu próprio repositório**
5. Faça commits com mensagens claras descrevendo o que foi feito

As issues estão organizadas por área (`html`, `css`, `javascript`) e por nível de dificuldade (`simples`, `intermediário`, `complexo`). Comece pelas simples e avance conforme se sentir confortável.

---

## Stack

- HTML5 semântico
- CSS3 com Custom Properties, Flexbox e Grid
- JavaScript ES6+ (classes, arrow functions, template literals, Promises)
- Google Fonts — Inter e Poppins
- Sem frameworks, sem build tools, sem dependências

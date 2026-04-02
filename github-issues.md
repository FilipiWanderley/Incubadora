# 📋 45 Issues para GitHub — Copie e Cole

---

## 🟢 HTML — SIMPLES

---

### Issue 1 — Página de Login

**Título:**

```
Criar página de login com formulário de autenticação do usuário
```

**Labels:** `html` `simples` `auth`

**Corpo:**

```markdown
## Descrição

Criar a página `login.html` contendo um formulário de autenticação para usuários.

## A página deve incluir

- Campo de e-mail com tipo `email`
- Campo de senha com tipo `password`
- Botão principal **Entrar**
- Link _Esqueci minha senha_
- Link _Criar conta_ redirecionando para a página de cadastro

## Critérios de conclusão

- [ ] Estrutura HTML semântica
- [ ] Inputs com labels acessíveis
- [ ] Formulário centralizado na página
- [ ] Layout consistente com o design do projeto
```

---

### Issue 2 — Página de Cadastro

**Título:**

```
Criar página de cadastro com formulário de registro de novo usuário
```

**Labels:** `html` `simples` `auth`

**Corpo:**

```markdown
## Descrição

Criar a página `register.html` com formulário completo para criação de conta de novo usuário.

## A página deve incluir

- Campo de nome completo
- Campo de e-mail
- Campo de senha e confirmação de senha
- Campo de telefone (opcional)
- Checkbox de aceite dos termos de uso
- Botão principal **Cadastrar**

## Critérios de conclusão

- [ ] Validação de campos obrigatórios
- [ ] Confirmação de senha compatível
- [ ] Checkbox de termos deve ser obrigatório
- [ ] Layout consistente com login.html
```

---

### Issue 3 — Newsletter no Rodapé

**Título:**

```
Adicionar seção de newsletter no rodapé do index
```

**Labels:** `html` `simples` `newsletter`

**Corpo:**

```markdown
## Descrição

Expandir a seção newsletter existente no rodapé de `index.html` com campos e feedback de inscrição.

## A página deve incluir

- Campo de e-mail com validação nativa (`type="email"`)
- Botão **Inscrever**
- Mensagem de sucesso ou erro após envio
- Checkbox de consentimento de privacidade

## Critérios de conclusão

- [ ] Campo de e-mail com validação HTML5
- [ ] Checkbox de privacidade obrigatório
- [ ] Mensagem de feedback visível ao usuário
- [ ] Responsivo em mobile e desktop
```

---

### Issue 4 — Página Sobre Nós

**Título:**

```
Criar página institucional 'Sobre Nós'
```

**Labels:** `html` `simples` `institucional`

**Corpo:**

```markdown
## Descrição

Criar a página `about.html` apresentando a empresa, sua história e equipe.

## A página deve incluir

- Seção de apresentação da empresa
- Bloco de missão, visão e valores
- Galeria ou grid de fotos da equipe
- Timeline com histórico da empresa
- Links para redes sociais

## Critérios de conclusão

- [ ] Uso de tags semânticas (section, article, aside)
- [ ] Imagens com alt text descritivo
- [ ] Timeline acessível e responsiva
- [ ] Links de redes sociais abrem em nova aba
```

---

### Issue 5 — Página de Contato

**Título:**

```
Criar página de contato com formulário e informações da empresa
```

**Labels:** `html` `simples` `contato`

**Corpo:**

```markdown
## Descrição

Criar a página `contact.html` com formulário de contato e informações institucionais.

## A página deve incluir

- Formulário com campos: nome, e-mail, assunto e mensagem
- Exibição de telefone e endereço da empresa
- Mapa via iframe do Google Maps
- Horário de funcionamento
- Atributo `data-validate` no formulário

## Critérios de conclusão

- [ ] Todos os campos obrigatórios marcados com required
- [ ] Iframe do mapa com título acessível
- [ ] Dados de contato visíveis sem JavaScript
- [ ] Layout de duas colunas em desktop
```

---

## 🟡 HTML — INTERMEDIÁRIO

---

### Issue 6 — Breadcrumb

**Título:**

```
Adicionar breadcrumb de navegação em páginas de produto
```

**Labels:** `html` `intermediario` `seo`

**Corpo:**

```markdown
## Descrição

Implementar navegação por breadcrumb nas páginas `products.html` e `product-detail.html`.

## A página deve incluir

- Estrutura de navegação: Home > Categoria > Subcategoria
- Links clicáveis em cada nível
- Ícone separador entre os itens
- Marcação Schema.org BreadcrumbList para SEO

## Critérios de conclusão

- [ ] Uso correto de `<nav aria-label="breadcrumb">`
- [ ] Último item sem link (página atual)
- [ ] Marcação JSON-LD ou microdados Schema.org
- [ ] Responsivo em telas pequenas
```

---

### Issue 7 — Seção de Depoimentos

**Título:**

```
Adicionar seção de depoimentos de clientes na home
```

**Labels:** `html` `intermediario` `social-proof`

**Corpo:**

```markdown
## Descrição

Inserir na `index.html` uma seção com depoimentos reais de clientes em cards visuais.

## A página deve incluir

- Cards com foto do cliente, nome, avaliação em estrelas e texto do depoimento
- Entre 3 e 5 depoimentos exibidos
- Aspas tipográficas nas citações
- Cargo ou empresa do depoente abaixo do nome

## Critérios de conclusão

- [ ] Uso de `<blockquote>` para acessibilidade
- [ ] Imagens com alt text
- [ ] Estrelas de avaliação com ARIA label de nota
- [ ] Responsivo em grid ou carrossel
```

---

### Issue 8 — Página 404

**Título:**

```
Criar página 404 personalizada e amigável
```

**Labels:** `html` `intermediario` `ux`

**Corpo:**

```markdown
## Descrição

Criar a página `404.html` com visual atrativo e opções de navegação para o usuário não se perder.

## A página deve incluir

- Ilustração ou animação relacionada ao erro
- Mensagem personalizada e amigável
- Botão de retorno para a home
- Links rápidos para seções populares
- Campo de busca opcional

## Critérios de conclusão

- [ ] Código HTTP correto configurado no servidor
- [ ] Mensagem clara e sem termos técnicos
- [ ] Design consistente com o restante do projeto
- [ ] Pelo menos 3 links de navegação alternativos
```

---

### Issue 9 — Meta Tags SEO

**Título:**

```
Melhorar meta tags de SEO e compartilhamento social em todas as páginas
```

**Labels:** `html` `intermediario` `seo`

**Corpo:**

```markdown
## Descrição

Atualizar o `<head>` de todas as páginas com meta tags otimizadas para buscadores e redes sociais.

## A página deve incluir

- Open Graph tags: og:title, og:image, og:description
- Twitter Card tags
- Favicon .ico e .png
- Meta descriptions com palavras-chave relevantes
- Tag canonical para evitar conteúdo duplicado

## Critérios de conclusão

- [ ] og:image com dimensões mínimas de 1200x630px
- [ ] Meta description entre 120 e 160 caracteres
- [ ] Canonical URL absoluta em cada página
- [ ] Validação com Open Graph Debugger do Facebook
```

---

### Issue 10 — FAQ

**Título:**

```
Criar página de perguntas frequentes com accordion por categoria
```

**Labels:** `html` `intermediario` `conteudo`

**Corpo:**

```markdown
## Descrição

Criar a página `faq.html` com perguntas e respostas organizadas em acordeão por categoria.

## A página deve incluir

- Accordion de perguntas e respostas com abertura/fechamento
- Campo de busca para filtrar perguntas
- Categorias: Envios, Pagamento, Devoluções, entre outras
- Links para páginas relacionadas ao fim de cada seção

## Critérios de conclusão

- [ ] Accordion acessível com ARIA (aria-expanded, aria-controls)
- [ ] Busca sem dependência de frameworks externos
- [ ] Âncoras para cada categoria (deep links)
- [ ] Responsivo e fácil de escanear visualmente
```

---

## 🔴 HTML — COMPLEXO

---

### Issue 11 — Carrinho

**Título:**

```
Criar página de carrinho de compras com listagem e resumo do pedido
```

**Labels:** `html` `complexo` `ecommerce`

**Corpo:**

```markdown
## Descrição

Criar a página `cart.html` com todos os elementos necessários para revisão e edição do carrinho antes do checkout.

## A página deve incluir

- Listagem de produtos com imagem, nome e preço
- Campo editável de quantidade por produto
- Cálculo de preço unitário e total por linha
- Campo de cupom de desconto
- Estimativa de frete
- Botão **Finalizar Compra**

## Critérios de conclusão

- [ ] Estrutura semântica com `<table>` ou `<ul>` para a listagem
- [ ] Subtotal atualizado ao mudar quantidade (JS)
- [ ] Campo de CEP para cálculo de frete
- [ ] Resumo fixo ou visível em mobile
```

---

### Issue 12 — Checkout

**Título:**

```
Criar página de checkout com etapas de entrega, pagamento e resumo
```

**Labels:** `html` `complexo` `ecommerce`

**Corpo:**

```markdown
## Descrição

Criar a página `checkout.html` com formulário multietapas para conclusão de compra.

## A página deve incluir

- Formulário de endereço de entrega (CEP, rua, complemento)
- Seleção de modalidade de frete
- Opções de forma de pagamento (cartão, boleto, Pix)
- Resumo lateral do pedido com itens e valores
- Validação de todos os campos antes do envio

## Critérios de conclusão

- [ ] Separação visual entre as etapas
- [ ] Resumo sempre visível em telas grandes
- [ ] Máscaras de entrada para CEP, CPF e cartão
- [ ] Botão de envio desabilitado até validação completa
```

---

### Issue 13 — Perfil do Usuário

**Título:**

```
Criar página de perfil do usuário com histórico e preferências
```

**Labels:** `html` `complexo` `auth`

**Corpo:**

```markdown
## Descrição

Criar a página `profile.html` com área completa de gerenciamento de conta do usuário.

## A página deve incluir

- Formulário de dados pessoais editáveis
- Histórico de pedidos com status de cada um
- CRUD de endereços salvos
- Gerenciamento de métodos de pagamento
- Configurações de notificações e preferências
- Botão de logout

## Critérios de conclusão

- [ ] Abas ou seções bem delimitadas por funcionalidade
- [ ] Ações de salvar e cancelar em cada formulário
- [ ] Status de pedido com badge colorido
- [ ] Confirmação antes de excluir endereço ou cartão
```

---

### Issue 14 — Blog

**Título:**

```
Criar seção de blog com listagem de artigos e paginação
```

**Labels:** `html` `complexo` `conteudo`

**Corpo:**

```markdown
## Descrição

Criar a página `blog.html` com listagem visual de artigos, filtros por categoria e paginação.

## A página deve incluir

- Cards com thumbnail, título, data de publicação e resumo
- Listagem com paginação numérica
- Links para a página de detalhe de cada artigo
- Tags e categorias por post
- Campo de busca de posts

## Critérios de conclusão

- [ ] Cards com proporção de imagem consistente
- [ ] Paginação acessível com aria-label
- [ ] Tags clicáveis para filtrar por categoria
- [ ] Layout em grid responsivo (1, 2 ou 3 colunas)
```

---

### Issue 15 — Wishlist

**Título:**

```
Criar página de wishlist compartilhável
```

**Labels:** `html` `complexo` `ecommerce`

**Corpo:**

```markdown
## Descrição

Criar a página `wishlist.html` com a lista de favoritos do usuário e opções de compartilhamento.

## A página deve incluir

- Listagem de produtos favoritados com imagem e preço
- Botões de compartilhamento via link, WhatsApp e e-mail
- Botão de remover item da wishlist
- Botão **Adicionar ao Carrinho** por produto
- Opção de notificação de desconto por produto

## Critérios de conclusão

- [ ] URL de compartilhamento com parâmetros únicos
- [ ] Estado vazio com call-to-action para explorar produtos
- [ ] Sincronização com localStorage
- [ ] Feedback visual ao adicionar ao carrinho
```

---

## 🟢 CSS — SIMPLES

---

### Issue 16 — Hover nos Cards

**Título:**

```
Adicionar efeito hover nos cards de produto
```

**Labels:** `css` `simples` `ui`

**Corpo:**

```markdown
## Descrição

Melhorar o visual dos product cards com efeitos de hover fluidos e elegantes.

## Deve incluir

- Sombra dinâmica com `box-shadow` ao passar o mouse
- Leve elevação com `transform: translateY(-4px)`
- Transição de 0.3s com ease
- Overlay semitransparente sobre a imagem no hover

## Critérios de conclusão

- [ ] Transição suave sem travamentos
- [ ] Efeito não interfere na acessibilidade por teclado
- [ ] Compatível com os principais navegadores
- [ ] Não altera o tamanho do card (sem layout shift)
```

---

### Issue 17 — Scrollbar Customizada

**Título:**

```
Customizar scrollbar para seguir a identidade visual do projeto
```

**Labels:** `css` `simples` `ui`

**Corpo:**

```markdown
## Descrição

Estilizar a barra de rolagem do navegador com a paleta de cores do projeto.

## Deve incluir

- Largura entre 8px e 10px
- Cor primária do projeto na thumb
- Fundo sutil no track
- Border-radius nos cantos da thumb

## Critérios de conclusão

- [ ] Estilo aplicado via `::-webkit-scrollbar`
- [ ] Fallback definido para Firefox com `scrollbar-color`
- [ ] Não remove a scrollbar em nenhum breakpoint
- [ ] Visual consistente com o design system do projeto
```

---

### Issue 18 — Badge NOVO

**Título:**

```
Adicionar badge 'NOVO' nos cards de produtos recentes
```

**Labels:** `css` `simples` `ui`

**Corpo:**

```markdown
## Descrição

Criar um badge visual para destacar produtos novos nos cards da listagem.

## Deve incluir

- Posicionado no canto superior direito do card
- Fundo laranja (#FF9500)
- Texto branco em caixa-alta
- Tamanho pequeno e discreto sem cobrir o produto

## Critérios de conclusão

- [ ] Uso de `position: absolute` no card com `position: relative`
- [ ] Badge não interfere no clique do card
- [ ] Responsivo em todos os breakpoints
- [ ] Pode ser adicionado/removido via classe CSS
```

---

### Issue 19 — Botão Voltar ao Topo

**Título:**

```
Criar botão fixo de 'Voltar ao Topo'
```

**Labels:** `css` `simples` `ux`

**Corpo:**

```markdown
## Descrição

Implementar um botão flutuante que aparece após scroll e leva o usuário de volta ao topo da página.

## Deve incluir

- Posição fixa no canto inferior direito
- Visível apenas após 300px de scroll
- Animação de fade ou slide na entrada e saída
- Ícone de seta apontando para cima
- Background com a cor primária do projeto

## Critérios de conclusão

- [ ] z-index acima dos demais elementos
- [ ] Animação de scroll suave (`scroll-behavior: smooth`)
- [ ] Acessível via teclado com aria-label
- [ ] Responsivo e não bloqueia conteúdo em mobile
```

---

### Issue 20 — Spinner CSS

**Título:**

```
Criar spinner de loading em CSS puro
```

**Labels:** `css` `simples` `ui`

**Corpo:**

```markdown
## Descrição

Implementar animação de carregamento sem imagens, usando apenas CSS com as cores do projeto.

## Deve incluir

- Círculo girando com `animation` e `border`
- Sem dependência de imagens externas
- Cores baseadas na paleta do projeto
- 3 variações de tamanho: small, medium e large

## Critérios de conclusão

- [ ] Animação fluida com @keyframes
- [ ] Centralizado no contêiner pai
- [ ] Acessível com `role="status"` e aria-label
- [ ] Funciona nos principais navegadores sem prefixos extras
```

---

## 🟡 CSS — INTERMEDIÁRIO

---

### Issue 21 — Inputs com Foco

**Título:**

```
Estilizar inputs de formulário com foco visual e label flutuante
```

**Labels:** `css` `intermediario` `ux`

**Corpo:**

```markdown
## Descrição

Melhorar a experiência de preenchimento de formulários com foco visual claro e label animado.

## Deve incluir

- Borda colorida ao focar no input
- Box-shadow sutil no estado de foco
- Transição de 0.2s
- Label flutuante acima do campo ao digitar (CSS puro)

## Critérios de conclusão

- [ ] Foco visível e acessível (WCAG 2.4.7)
- [ ] Label não sobrepõe o texto digitado
- [ ] Estilo de erro com cor vermelha (classe .input-error)
- [ ] Funciona sem JavaScript para o efeito de label
```

---

### Issue 22 — Grid Utilities

**Título:**

```
Criar sistema de grid utilitário responsivo
```

**Labels:** `css` `intermediario` `layout`

**Corpo:**

```markdown
## Descrição

Desenvolver classes utilitárias de grid para compor layouts de forma flexível e responsiva.

## Deve incluir

- Classes .col-1 até .col-12 para largura em grid de 12 colunas
- Classes .gap-1 até .gap-5 para espaçamento entre itens
- Breakpoints: md (768px), lg (1024px) e xl (1280px)
- Grid automático responsivo com auto-fill

## Critérios de conclusão

- [ ] Baseado em CSS Grid ou Flexbox
- [ ] Classes responsivas no formato .col-md-6
- [ ] Sem dependências externas
- [ ] Documentado com comentários no CSS
```

---

### Issue 23 — Efeito no Menu Header

**Título:**

```
Adicionar animações e indicador ativo nos links do menu header
```

**Labels:** `css` `intermediario` `ui`

**Corpo:**

```markdown
## Descrição

Melhorar a navegação principal com efeitos visuais nos links e destaque para a página ativa.

## Deve incluir

- Underline animado deslizando da esquerda para a direita
- Mudança de cor no hover
- Transição suave de 0.3s
- Indicador visual do link da página atual (classe .active)

## Critérios de conclusão

- [ ] Efeito via pseudo-elemento ::after
- [ ] Cor de foco visível para navegação por teclado
- [ ] Indicador .active nunca some após hover
- [ ] Compatível com menu mobile
```

---

### Issue 24 — Alert Box

**Título:**

```
Criar componente de alert box reutilizável
```

**Labels:** `css` `intermediario` `ui`

**Corpo:**

```markdown
## Descrição

Implementar alertas visuais padronizados para feedback de ações do sistema.

## Deve incluir

- 4 variações: success (verde), error (vermelho), warning (amarelo) e info (azul)
- Ícone à esquerda + texto da mensagem
- Botão de fechar (×) à direita
- Padding e margin padronizados com variáveis CSS

## Critérios de conclusão

- [ ] Acessível com `role="alert"` e aria-live
- [ ] Cor de texto com contraste adequado (WCAG AA)
- [ ] Botão de fechar com aria-label
- [ ] Animação de entrada e saída ao aparecer/fechar
```

---

### Issue 25 — Responsividade Mobile

**Título:**

```
Melhorar responsividade geral para dispositivos móveis
```

**Labels:** `css` `intermediario` `responsivo`

**Corpo:**

```markdown
## Descrição

Otimizar toda a interface para uso confortável em telas pequenas (smartphones).

## Deve incluir

- Ajuste de font-size para legibilidade em mobile
- Espaçamento adequado (mínimo 44px para áreas de toque)
- Imagens com srcset para diferentes densidades
- Menu adaptado para mobile com comportamento correto

## Critérios de conclusão

- [ ] Sem overflow horizontal em nenhuma tela
- [ ] Botões e links com área mínima de 44x44px (WCAG 2.5.5)
- [ ] Fonte legível sem necessidade de zoom
- [ ] Testado em larguras de 320px, 375px e 414px
```

---

## 🔴 CSS — COMPLEXO

---

### Issue 26 — Dark Mode

**Título:**

```
Implementar dark mode completo com toggle e detecção de preferência do SO
```

**Labels:** `css` `complexo` `tema`

**Corpo:**

```markdown
## Descrição

Criar um sistema de tema escuro completo cobrindo todos os elementos da interface.

## Deve incluir

- Variáveis CSS para todas as cores do modo escuro
- Toggle visível no header para alternar o tema
- Detecção automática via `prefers-color-scheme`
- Preferência salva em localStorage
- Transição suave de 0.3s entre os temas

## Critérios de conclusão

- [ ] Todas as cores da UI cobertas por variáveis
- [ ] Tema aplicado antes do render (sem flash)
- [ ] Contraste adequado no modo escuro (WCAG AA)
- [ ] Toggle com estado acessível (aria-pressed)
```

---

### Issue 27 — Animações Avançadas

**Título:**

```
Adicionar animações avançadas de parallax, scroll e skeleton screen
```

**Labels:** `css` `complexo` `animacao`

**Corpo:**

```markdown
## Descrição

Implementar animações sofisticadas que melhoram a percepção de desempenho e o apelo visual.

## Deve incluir

- Efeito parallax em seções de destaque da home
- Fade-in progressivo ao entrar na viewport (Intersection Observer)
- Skeleton screens durante carregamento de conteúdo
- Shimmer effect nos placeholders de imagem
- Microinterações de bounce e pulse em elementos de CTA

## Critérios de conclusão

- [ ] Parallax desativado com prefers-reduced-motion
- [ ] Skeleton com proporções fiéis ao conteúdo real
- [ ] Animações não bloqueiam interatividade
- [ ] Performance acima de 60fps em dispositivos médios
```

---

### Issue 28 — Carousel Avançado

**Título:**

```
Criar componente slider/carousel avançado com suporte a touch
```

**Labels:** `css` `complexo` `componente`

**Corpo:**

```markdown
## Descrição

Implementar um carousel totalmente funcional, acessível e compatível com gestos touch.

## Deve incluir

- Autoplay configurável com intervalo definido
- Navegação por setas e por dots indicadores
- Suporte a swipe/touch em dispositivos móveis
- Pausa automática ao passar o mouse (hover)
- Transições suaves entre slides

## Critérios de conclusão

- [ ] Acessível com `role="region"` e aria-label
- [ ] Botões de navegação com aria-label descritivo
- [ ] Funciona com teclado (setas esquerda/direita)
- [ ] Não depende de bibliotecas externas
```

---

### Issue 29 — Sistema de Tipografia

**Título:**

```
Organizar sistema de tipografia com escala harmônica e acessibilidade
```

**Labels:** `css` `complexo` `design-system`

**Corpo:**

```markdown
## Descrição

Criar hierarquia tipográfica consistente, legível e acessível para todo o projeto.

## Deve incluir

- Escala harmônica de tamanhos de fonte (ex: ratio 1.25)
- Line-height otimizado entre 1.5 e 1.6 para corpo de texto
- Letter-spacing ajustado por nível de hierarquia
- Contraste mínimo de 4.5:1 para textos normais (WCAG AA)
- Tipografia responsiva com `clamp()` ou media queries

## Critérios de conclusão

- [ ] Todos os tamanhos definidos com variáveis CSS
- [ ] Contraste verificado com ferramenta como Contrast Checker
- [ ] Fonte base de 16px mínimo
- [ ] Funciona com zoom de 200% sem perda de legibilidade
```

---

### Issue 30 — Sistema de Temas

**Título:**

```
Criar sistema de temas/skins com seletor e persistência
```

**Labels:** `css` `complexo` `tema`

**Corpo:**

```markdown
## Descrição

Implementar múltiplos esquemas de cores que o usuário pode escolher e que são salvos entre sessões.

## Deve incluir

- 3 a 5 esquemas de cores pré-definidos
- Seletor de tema visível no header
- Persistência da escolha via localStorage
- Transição suave ao trocar de tema
- CSS Variables dinâmicas por tema

## Critérios de conclusão

- [ ] Tema aplicado via atributo `data-theme` no `<html>`
- [ ] Cada tema cobre todas as variáveis de cor
- [ ] Preferência carregada antes do primeiro render
- [ ] Seletor acessível via teclado
```

---

## 🟢 JavaScript — SIMPLES

---

### Issue 31 — Adicionar ao Carrinho

**Título:**

```
Implementar funcionalidade de adicionar item ao carrinho
```

**Labels:** `javascript` `simples` `ecommerce`

**Corpo:**

```markdown
## Descrição

Criar a lógica para adicionar produtos ao carrinho com feedback visual e persistência.

## Deve incluir

- Clique no botão **Adicionar ao Carrinho** dispara a ação
- Modal ou toast de confirmação de sucesso
- Contador de itens no ícone do carrinho no header
- Dados do carrinho salvos em localStorage

## Critérios de conclusão

- [ ] Contador atualizado imediatamente após clique
- [ ] Modal fecha automaticamente após 3 segundos
- [ ] Produto não duplicado — quantidade incrementada
- [ ] localStorage estruturado com id, nome, preço e quantidade
```

---

### Issue 32 — Menu Mobile

**Título:**

```
Tornar o menu mobile hamburger totalmente funcional
```

**Labels:** `javascript` `simples` `ui`

**Corpo:**

```markdown
## Descrição

Implementar a lógica de abertura e fechamento do menu mobile com experiência fluida.

## Deve incluir

- Clique no botão hamburger abre e fecha o menu
- Menu fecha ao clicar em qualquer link interno
- Overlay escuro fecha o menu ao ser clicado
- Animação de abertura e fechamento suave

## Critérios de conclusão

- [ ] Estado aberto/fechado controlado por classe CSS
- [ ] Scroll do body bloqueado enquanto menu está aberto
- [ ] Acessível: botão com aria-expanded e aria-controls
- [ ] Funciona em todos os breakpoints mobile
```

---

### Issue 33 — Validação de Formulários

**Título:**

```
Adicionar validação básica em formulários do projeto
```

**Labels:** `javascript` `simples` `forms`

**Corpo:**

```markdown
## Descrição

Implementar validação de campos obrigatórios e formatos com mensagens de erro claras.

## Deve incluir

- Verificação de campos obrigatórios antes do envio
- Validação de formato de e-mail
- Exibição de mensagens de erro por campo
- Dados preservados no formulário após erro

## Critérios de conclusão

- [ ] Erro exibido abaixo do campo correspondente
- [ ] Foco movido para o primeiro campo inválido
- [ ] Formulário não enviado com campos inválidos
- [ ] Validação executada também no submit (não só no blur)
```

---

### Issue 34 — Slider Simples

**Título:**

```
Criar slider simples com navegação por setas e autoplay
```

**Labels:** `javascript` `simples` `ui`

**Corpo:**

```markdown
## Descrição

Implementar um carousel básico para banners ou imagens com controles manuais e automáticos.

## Deve incluir

- Setas de navegação anterior e próximo
- Navegação por índice com dots clicáveis
- Transição suave entre slides
- Autoplay com intervalo configurável

## Critérios de conclusão

- [ ] Autoplay pausado no hover
- [ ] Loop contínuo ao chegar no último slide
- [ ] Slide ativo marcado no dot correspondente
- [ ] Funciona sem dependências externas
```

---

### Issue 35 — Filtro por Categoria

**Título:**

```
Implementar filtro de produtos por categoria
```

**Labels:** `javascript` `simples` `ecommerce`

**Corpo:**

```markdown
## Descrição

Permitir que o usuário filtre os produtos exibidos clicando nas categorias disponíveis.

## Deve incluir

- Clique em categoria mostra apenas produtos daquela categoria
- Mostrar e ocultar cards com transição
- Atualização do contador de resultados visíveis
- Estado do filtro persistido na URL via query params

## Critérios de conclusão

- [ ] Filtro ativo visualmente destacado
- [ ] Estado "Todos" reseta o filtro
- [ ] URL atualizada sem recarregar a página (history.pushState)
- [ ] Funcionamento correto com 0 resultados (mensagem de vazio)
```

---

## 🟡 JavaScript — INTERMEDIÁRIO

---

### Issue 36 — Ordenação de Produtos

**Título:**

```
Adicionar ordenação dinâmica de produtos por preço, nome e avaliação
```

**Labels:** `javascript` `intermediario` `ecommerce`

**Corpo:**

```markdown
## Descrição

Implementar dropdown de ordenação que reorganiza os cards de produto em tempo real.

## Deve incluir

- Dropdown com opções: preço crescente, preço decrescente, nome A-Z e avaliação
- Grid de produtos reordenado dinamicamente sem reload
- Opção selecionada visualmente destacada
- Seleção persistida em localStorage

## Critérios de conclusão

- [ ] Reordenação via manipulação do DOM (sem reload)
- [ ] Acessível com teclado e aria-sort
- [ ] Estado de ordenação refletido na URL
- [ ] Compatível com o filtro por categoria
```

---

### Issue 37 — Busca em Tempo Real

**Título:**

```
Implementar busca em tempo real com debounce e histórico
```

**Labels:** `javascript` `intermediario` `ux`

**Corpo:**

```markdown
## Descrição

Criar campo de busca avançado que filtra produtos enquanto o usuário digita, com histórico recente.

## Deve incluir

- Filtragem de resultados com debounce de 300ms
- Exibição dos resultados em dropdown ou grid
- Histórico com as últimas 5 buscas realizadas
- Mensagem amigável para nenhum resultado encontrado

## Critérios de conclusão

- [ ] Debounce implementado sem bibliotecas externas
- [ ] Histórico salvo em localStorage
- [ ] Busca por nome, categoria e descrição do produto
- [ ] Acessível com aria-live para anunciar resultados
```

---

### Issue 38 — Toggle de Senha

**Título:**

```
Adicionar funcionalidade de mostrar e ocultar senha nos campos de senha
```

**Labels:** `javascript` `intermediario` `forms`

**Corpo:**

```markdown
## Descrição

Implementar toggle para alternar visibilidade da senha com feedback visual acessível.

## Deve incluir

- Ícone de olho clicável ao lado direito do input
- Alternância do type do input entre password e text
- Animação suave na troca do ícone
- Labels ARIA atualizados conforme o estado

## Critérios de conclusão

- [ ] aria-label atualizado para "Mostrar senha" ou "Ocultar senha"
- [ ] Funciona em todos os campos de senha do projeto
- [ ] Ícone não desalinha o layout do formulário
- [ ] Acessível via teclado (Enter ou Space no botão)
```

---

### Issue 39 — Contador de Quantidade

**Título:**

```
Criar contador de quantidade com botões + e - para produtos
```

**Labels:** `javascript` `intermediario` `ecommerce`

**Corpo:**

```markdown
## Descrição

Implementar controle de quantidade de produto com validação de mínimo, máximo e atualização de preço.

## Deve incluir

- Botões + e - para incrementar e decrementar
- Mínimo permitido: 1; máximo permitido: 99
- Validação em tempo real da entrada manual no campo
- Atualização automática do preço total ao mudar quantidade

## Critérios de conclusão

- [ ] Botão - desabilitado quando quantidade = 1
- [ ] Botão + desabilitado quando quantidade = 99
- [ ] Input aceita apenas números inteiros positivos
- [ ] Preço total formatado em BRL (R$ X.XXX,XX)
```

---

### Issue 40 — Modal de Produto

**Título:**

```
Criar modal de detalhes do produto acionado pelo clique no card
```

**Labels:** `javascript` `intermediario` `ux`

**Corpo:**

```markdown
## Descrição

Abrir popup com informações completas do produto ao clicar em um card, sem navegar para outra página.

## Deve incluir

- Clique no card abre modal com imagem ampliada, nome, preço e descrição
- Botão **Adicionar ao Carrinho** dentro do modal
- Botão de fechar com × e tecla ESC
- Overlay escuro com fechamento ao clicar fora

## Critérios de conclusão

- [ ] Foco preso dentro do modal enquanto aberto (focus trap)
- [ ] Scroll do body bloqueado com modal aberto
- [ ] aria-modal, role=dialog e aria-labelledby configurados
- [ ] Animação de abertura e fechamento
```

---

## 🔴 JavaScript — COMPLEXO

---

### Issue 41 — Sistema Completo de Carrinho

**Título:**

```
Implementar sistema completo de carrinho com CRUD e cálculo de totais
```

**Labels:** `javascript` `complexo` `ecommerce`

**Corpo:**

```markdown
## Descrição

Desenvolver um carrinho de compras persistente e funcional com todas as operações e cálculos em tempo real.

## Deve incluir

- CRUD completo de produtos no localStorage
- Cálculo de subtotal, descontos e total geral
- Validação e aplicação de cupons de desconto reais
- Badge contador sempre atualizado no header
- Sincronização entre abas do navegador via StorageEvent

## Critérios de conclusão

- [ ] Carrinho consistente entre reloads
- [ ] Desconto percentual e absoluto suportados
- [ ] Sem itens duplicados (quantidade somada)
- [ ] Sincronização entre abas funcional sem conflito
```

---

### Issue 42 — Filtros Avançados

**Título:**

```
Implementar sistema de filtros avançados e simultâneos com URL state
```

**Labels:** `javascript` `complexo` `ecommerce`

**Corpo:**

```markdown
## Descrição

Criar sistema robusto de filtros múltiplos que podem ser combinados, com estado refletido na URL.

## Deve incluir

- Filtros simultâneos por: categoria, faixa de preço e avaliação mínima
- Atualização da URL com query params para compartilhamento
- Botão e lógica para limpar todos os filtros de uma vez
- Exibição dos filtros ativos como tags removíveis

## Critérios de conclusão

- [ ] URL legível e compartilhável com todos os filtros aplicados
- [ ] Filtros restaurados ao carregar a URL com parâmetros
- [ ] Contagem de resultados atualizada em tempo real
- [ ] Compatível com ordenação (issue #36)
```

---

### Issue 43 — Validação Avançada

**Título:**

```
Criar validação de formulário avançada em tempo real para todos os campos
```

**Labels:** `javascript` `complexo` `forms`

**Corpo:**

```markdown
## Descrição

Implementar validação robusta com regras específicas por campo, feedback imediato e controle de submissão.

## Deve incluir

- Validação de e-mail, CPF, CEP e telefone com formatação
- Medidor de força de senha (fraca, média, forte)
- Verificação de igualdade entre senha e confirmação
- Erros dinâmicos exibidos abaixo de cada campo
- Botão de submit desabilitado até todos os campos serem válidos

## Critérios de conclusão

- [ ] CPF validado com algoritmo de dígitos verificadores
- [ ] CEP com consulta à API ViaCEP para autopreenchimento
- [ ] Força de senha baseada em comprimento, maiúsculas, números e símbolos
- [ ] Nenhum dado perdido em caso de erro no envio
```

---

### Issue 44 — Favoritos com Sincronização

**Título:**

```
Implementar sistema de favoritos com animação e persistência
```

**Labels:** `javascript` `complexo` `ecommerce`

**Corpo:**

```markdown
## Descrição

Criar wishlist funcional com animação de coração, contador no header e página dedicada.

## Deve incluir

- Botão de coração em cada card para adicionar/remover dos favoritos
- Animação de like ao favoritar (escala + cor)
- Página dedicada de favoritos com listagem completa
- Persistência em localStorage
- Contador de favoritos no header

## Critérios de conclusão

- [ ] Estado do coração consistente ao navegar entre páginas
- [ ] Animação fluida sem impacto na performance
- [ ] Página de favoritos vazia com CTA para explorar produtos
- [ ] Contador zerado ao remover todos os favoritos
```

---

### Issue 45 — API Integration Mock

**Título:**

```
Integrar API mock com fetch, loading states e tratamento de erros
```

**Labels:** `javascript` `complexo` `api`

**Corpo:**

```markdown
## Descrição

Simular integração com APIs externas usando fetch, com estados de carregamento, erros e cache local.

## Deve incluir

- Requisições fetch para URLs mock ou JSON local
- Loading states visuais durante cada requisição
- Tratamento de erros com mensagem amigável ao usuário
- Retry automático em caso de falha (até 3 tentativas)
- Cache local dos dados para evitar requisições repetidas

## Critérios de conclusão

- [ ] Loading exibido antes da resposta e removido após
- [ ] Erros de rede não travam a interface
- [ ] Retry com backoff exponencial (1s, 2s, 4s)
- [ ] Cache invalidado após 5 minutos ou ação do usuário
```

---

_45 issues — HTML (15) · CSS (15) · JavaScript (15)_

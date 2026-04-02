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


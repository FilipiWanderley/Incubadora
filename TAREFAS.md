# 📋 Tarefas de Melhorias - Projeto E-commerce

## 🌐 HTML - 15 Tarefas

### SIMPLES (1-5)

#### 1. Página de Login

Criar login.html com formulário básico:

- Campo de e-mail
- Campo de senha
- Botão "Entrar"
- Link "Esqueci minha senha"
- Link "Criar conta"

#### 2. Página de Cadastro

Criar Register.html com:

- Nome completo
- E-mail
- Senha e confirmar senha
- Telefone (opcional)
- Checkbox de termos
- Botão "Cadastrar"

#### 3. Adicionar Newsletter no Rodapé

Expandir seção newsletter em index.html:

- Campo de e-mail com validação
- Botão "Inscrever"
- Mensagem de sucesso/erro
- Checkbox de privacidade

#### 4. Página "Sobre Nós"

Criar about.html com:

- Apresentação da empresa
- Missão, visão e valores
- Fotos de equipe
- Histórico timeline
- Links para redes sociais

#### 5. Página de Contato

Criar contact.html com:

- Formulário (nome, e-mail, assunto, mensagem)
- Telefone e endereço da empresa
- Mapa com localização (iframe Google Maps)
- Horário de funcionamento
- Formulário data-validate

---

### INTERMEDIÁRIO (6-10)

#### 6. Breadcrumb em Páginas

Adicionar breadcrumb em products.html e product-detail.html:

- Navegação estilo: Home > Categoria > Subcategoria
- Links clicáveis
- Ícones de navegação
- Schema.org BreadcrumbList

#### 7. Seção de Depoimentos

Na index.html, adicionar:

- Cards com foto, nome, estrelas, depoimento
- 3-5 depoimentos
- Citações com aspas
- Cargo/empresa do depoente

#### 8. Página 404 Customizada

Criar 404.html com:

- Ilustração ou animação divertida
- Mensagem personalizante
- Botão para voltar à home
- Links para seções populares
- Formulário de "Página não encontrada"

#### 9. Melhorar Meta Tags

Atualizar todas as páginas com:

- Open Graph tags (og:title, og:image, og:description)
- Twitter Cards
- Favicon
- Descrições KW-friendly
- Canonical URLs

#### 10. Seção de FAQ

Criar faq.html com:

- Accordion de perguntas frequentes
- Busca dentro do FAQ
- Categorias (Envios, Pagamento, Devoluções, etc)
- Links para páginas relacionadas

---

### COMPLEXO (11-15)

#### 11. Página de Carrinho

Criar cart.html com:

- Listagem de produtos com imagens
- Quantidade editável
- Preço unitário e total
- Cupom de desconto
- Estimativa de frete
- Botão "Finalizar Compra"

#### 12. Página de Checkout

Criar checkout.html com:

- Dados de entrega (endereço, CEP, complemento)
- Seleção de endereço e frete
- Formas de pagamento
- Resumo do pedido
- Validação de dados

#### 13. Página de Perfil do Usuário

Criar profile.html com:

- Dados pessoais editáveis
- Histórico de pedidos com status
- Endereços salvos (CRUD)
- Métodos de pagamento
- Notificações e preferências
- Logout button

#### 14. Blog/Notícias

Criar blog.html com:

- Cards com thumbnail, título, data, resumo
- Listagem com paginação
- Links para detalhes do artigo
- Tags/categorias
- Busca de posts

#### 15. Página de Wishlist Compartilhável

Criar wishlist.html com:

- Lista de favoritos do usuário
- Botão de compartilhamento (link/whatsapp/email)
- Opção de remover do wishlist
- Adicionar ao carrinho direto
- Notificar quando em desconto

---

## 🎨 CSS - 15 Tarefas

### SIMPLES (1-5)

#### 1. Efeito Hover nos Cards

Melhorar visual dos product cards:

- Sombra dinâmica (box-shadow)
- Elevação suave (transform translateY)
- Transição de 0.3s
- Overlay no hover

#### 2. Customizar Scrollbar

Estilizar barra de rolagem do projeto:

- Largura 8-10px
- Cor primária do projeto
- Fundo suave
- Raio nos cantos

#### 3. Badge de "NOVO"

Adicionar badge em produtos novos:

- Posicionado no canto superior direito
- Fundo laranja (#FF9500)
- Texto branco
- Pequeno e elegante

#### 4. Botão "Voltar ao Topo"

Criar botão fixo em baixo à direita:

- Aparece após scroll de 300px
- Animação de entrada/saída
- Ícone seta para cima
- Background primário

#### 5. Spinner CSS Puro

Criar animação de loading:

- Círculo rotativo
- Sem imagens (apenas CSS)
- Baseado em cores do projeto
- 3 tamanhos (small, medium, large)

---

### INTERMEDIÁRIO (6-10)

#### 6. Estilizar Inputs com Foco

Melhorar UX de formulários:

- Borda colorida ao focar
- Box-shadow sutil
- Transição de 0.2s
- Label flutuante (CSS puro)

#### 7. Sistema de Grid Utilities

Criar classes de layout:

- .col-1 até .col-12
- .gap-1 até .gap-5
- Breakpoints: md, lg, xl
- Grid responsivo automático

#### 8. Efeito no Menu Header

Adicionar animações nos links do menu:

- Underline slider
- Cor de hover
- Transição suave 0.3s
- Ativa indicador de página

#### 9. Componente Alert Box

Criar alertas reutilizáveis:

- 4 variações: success, error, warning, info
- Ícone + mensagem
- Botão de fechar
- Padding e margin padronizados

#### 10. Melhorar Responsividade Mobile

Otimizar para telas pequenas:

- Ajustar font-size para legibilidade
- Spacing adequado (touch: 44px min)
- Imagens responsivas (srcset)
- Menu otimizado para mobile

---

### COMPLEXO (11-15)

#### 11. Dark Mode Completo

Implementar tema escuro:

- Variáveis CSS para modo escuro
- Toggle com localStorage
- Detectar preferência do SO
- Transição suave entre temas
- Todas as cores dos elementos

#### 12. Animações Avançadas

Adicionar efeitos sofisticados:

- Parallax em seções
- Fade-in ao scroll (Intersection Observer)
- Skeleton screens para loading
- Shimmer effect em imagens
- Bounce/pulse microinterações

#### 13. Componente Slider/Carousel

Criar carousel avançado:

- Autoplay configurável
- Navegação setas + dots
- Touch/swipe para mobile
- Pause ao hover
- Transições suaves

#### 14. Sistema de Tipografia

Organizar hierarquia visual:

- Escala harmônica de fontes
- Line-height otimizado (1.5-1.6)
- Letter-spacing perfeito
- Contrast de cor adequado (WCAG)
- Responsive typography

#### 15. Tema Compartilhável

Sistema de temas/skins:

- 3-5 esquemas de cores pré-definidos
- Selector de tema no header
- Salvar preferência (localStorage)
- Transição entre temas
- CSS Variables dinâmicas

---

## ⚡ JavaScript - 15 Tarefas

### SIMPLES (1-5)

#### 1. Adicionar Item ao Carrinho

Implementar funcionalidade básica:

- Clicar em "Adicionar ao Carrinho"
- Modal de sucesso
- Atualizar contador no header
- Salvar em localStorage

#### 2. Menu Mobile Funcional

Fazer hamburger funcionar:

- Click para abrir/fechar
- Fechar ao clicar em link
- Overlay para fechar
- Animação suave

#### 3. Validar Formulários

Adicionar validação básica:

- Required fields
- Email válido
- Mensagens de erro
- Salvar dados antes de enviar

#### 4. Slider Simples

Criar carousel básico:

- Setas de navegação
- Navegação por índice
- Transição suave
- Autoplay opcional

#### 5. Filtro por Categoria

Implementar filtro funcional:

- Clicar em categoria
- Mostrar/ocultar produtos
- Atualizar contador
- Manter estado na URL

---

### INTERMEDIÁRIO (6-10)

#### 6. Ordenação de Produtos

Adicionar dropdown de sort:

- Ordenar por: preço (asc/desc), nome, rating
- Atualizar grid dinamicamente
- Manter seleção ativa
- Persistir em localStorage

#### 7. Busca em Tempo Real

Implementar busca avançada:

- Input com debounce (300ms)
- Filtrar enquanto digita
- Mostrar/ocultar resultados
- Histórico de buscas (últimas 5)

#### 8. Toggle de Senha

Mostrar/ocultar senha:

- Ícone olho clicável
- Trocar tipo input (password/text)
- Animação suave do ícone
- Acessível (ARIA labels)

#### 9. Contador de Quantidade

Botões + e - para produtos:

- Aumentar/diminuir quantidade
- Mínimo 1, máximo 99
- Validação em tempo real
- Atualizar preço total

#### 10. Modal de Produto

Abrir detalhes em popup:

- Clicar em produto
- Mostrar imagem, nome, preço, descrição
- Botão "Adicionar ao Carrinho"
- Fechar com X ou ESC

---

### COMPLEXO (11-15)

#### 11. Sistema Completo de Carrinho

Carrinho persistente e funcional:

- CRUD de produtos no localStorage
- Calcular subtotal, desconto, total
- Cupom de desconto (de verdade)
- Atualizar badge contador
- Sincronizar entre abas

#### 12. Filtros Avançados e Múltiplos

Sistema de filtros robusto:

- Categoria + Preço + Rating
- Múltiplos filtros simultâneos
- Atualizar URL com query params
- Botão "Limpar filtros"
- Mostrar filtros aplicados

#### 13. Validação de Formulário Avançada

Validação robusta em tempo real:

- Email, CPF, CEP, telefone
- Validar força de senha
- Confirmar senha igual
- Mostrar erros dinâmicos
- Desabilitar submit se inválido

#### 14. Favoritos com Sincronização

Sistema de wishlist completo:

- Adicionar/remover favoritos
- Coração com animação (like)
- Página de favoritos separada
- Persistir em localStorage
- Contador no header

#### 15. API Integration Mock

Simular requisições a APIs:

- Usar fetch com URLs mock
- Loading states
- Tratamento de erros
- Retry automático
- Cache local de dados

---

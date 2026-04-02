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


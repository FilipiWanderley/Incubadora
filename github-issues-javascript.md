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

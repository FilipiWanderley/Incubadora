# Estrutura CSS Modular

Este projeto utiliza uma arquitetura CSS modular para melhor organização e manutenção.

## 📁 Estrutura de Arquivos

```
css/
├── main.css              # Arquivo principal com imports
├── reset.css             # Reset CSS básico
├── variables.css         # Variáveis CSS (cores, espaçamentos, etc)
├── base.css              # Estilos base (tipografia, container)
├── layout.css            # Estruturas de layout e seções
├── utilities.css         # Classes utilitárias
├── responsive.css        # Media queries
├── styles.css            # [DEPRECATED] Arquivo antigo monolítico
└── components/
    ├── buttons.css       # Estilos de botões
    ├── header.css        # Cabeçalho e navegação
    ├── footer.css        # Rodapé
    ├── hero.css          # Hero section
    ├── product-card.css  # Cards de produtos
    ├── modal.css         # Modais e overlays
    └── forms.css         # Formulários e inputs
```

## 🎯 Ordem de Importação

A ordem dos imports no `main.css` é importante:

1. **Reset** - Normalização básica
2. **Variables** - Tokens de design
3. **Base** - Estilos fundamentais
4. **Components** - Componentes reutilizáveis
5. **Layout** - Estruturas de página
6. **Utilities** - Classes auxiliares
7. **Responsive** - Media queries (sempre por último)

## 📝 Como Usar

Importe apenas o arquivo `main.css` no seu HTML:

```html
<link
	rel="stylesheet"
	href="../css/main.css" />
```

## ✨ Vantagens da Modularização

- **Manutenção facilitada**: Cada arquivo tem uma responsabilidade clara
- **Reutilização**: Componentes isolados podem ser reutilizados
- **Performance**: Carregamento otimizado com imports
- **Organização**: Código mais limpo e fácil de navegar
- **Escalabilidade**: Fácil adicionar novos componentes

## 🔧 Adicionar Novo Componente

1. Crie um novo arquivo em `components/nome-componente.css`
2. Adicione o import no `main.css` na seção de componentes
3. Siga a convenção BEM para nomenclatura de classes

## 📦 Arquivo Antigo

O arquivo `styles.css` foi mantido para referência mas não é mais usado. Toda a estilização foi dividida nos arquivos modulares.

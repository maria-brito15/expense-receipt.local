<div align="center">

# 🧾 Recibo de Gastos

**controle seus gastos como um recibo de papel — na hora.**
*sem instalar · sem conta · sem servidor · so abrir e digitar*

[abrir o app →](https://maria-brito15.github.io/expense-receipt/index.html)

</div>

---

## ✨ por que isso existe

sabe aquele momento em que voce precisa separar o que gastou no mercado, planejar o orcamento de uma viagem, ou simplesmente descobrir quanto saiu esse mes — e as opcoes sao:

> pedir pra uma IA montar a lista e somar, ou digitar tudo na calculadora na mao

os dois sao *chato demais*. um e repetitivo, o outro exige abrir mais uma aba e ficar explicando o contexto. devia ser so uma pagina que voce abre e ja vai digitando.

entao sim — nasceu da preguica pura. tem um ditado que diz: *de a tarefa dificil pra pessoa preguicosa, porque ela vai achar um jeito mais facil de fazer.* e exatamente isso.

esse projeto tambem faz parte de uma serie de ferramentas pequenas que seguem a mesma filosofia: **"e chato fazer na mao, por que nao construir algo que faca por mim?"** — assim como o [padronizador de nomes de arquivo](https://github.com/maria-brito15/file-name-standardizer) que veio antes.

---

## 🚀 como usar

**online** — sem instalacao, so abrir o link:

> 🔗 [maria-brito15.github.io/expense-receipt/index.html](https://maria-brito15.github.io/expense-receipt/index.html)

**localmente** — clone o repositorio e abra o arquivo direto no navegador:

```bash
git clone https://github.com/maria-brito15/expense-receipt.git
# depois abra index.html no seu navegador
```

```
digita item + preco + categoria  →  adiciona  →  ve o total  →  exporta PDF
```

---

## 🗂️ categorias

| categoria | cor |
|---|---|
| 🍽 Alimentacao | Laranja |
| 🏠 Moradia | Azul |
| 🚌 Transporte | Verde |
| 💊 Saude | Vermelho |
| 🎬 Lazer | Roxo |
| 📚 Educacao | Verde-azulado |
| 👔 Vestuario | Laranja queimado |
| 📦 Outros | Cinza |

---

## 🎛️ funcionalidades

- **adicionar lancamentos** — nome do item, preco e categoria. aperta `+` e ja ta na lista.
- **editar no lugar** — clica no lapiszinho de qualquer linha pra alterar nome, preco ou categoria sem sair da pagina.
- **pesquisa** — filtra a lista em tempo real enquanto voce digita.
- **filtros por categoria** — aparecem automaticamente conforme voce adiciona itens. clica em um pra isolar aquela categoria.
- **ordenacao** — por data (mais novo/mais antigo), valor (maior/menor) ou A-Z.
- **graficos de gastos** — alterna entre pizza e barras. atualiza sozinho.
- **barras de distribuicao** — cada categoria mostra sua fatia do total como uma barra de progresso.
- **exportar PDF** — abre o dialogo de impressao do navegador com um layout limpo de recibo (toda a interface some).
- **armazenamento persistente** — tudo fica no `localStorage`. sobrevive a atualizacoes e reinicializacoes, nada e enviado pra lugar nenhum.

---

## 🏗️ arquitetura do codigo

JS puro, zero dependencias, um arquivo so:

```
loadItems / saveItems     le e escreve no localStorage
getFilteredSorted()       aplica busca, filtro de categoria e ordenacao
render()                  reconstroi a lista, resumo, distribuicao e grafico
buildInlineEdit()         injeta o formulario de edicao na linha do item
updateChart()             destroi e recria a instancia do Chart.js
addItem / removeItem      alteram o array de itens e disparam save + render
```

todo o estado vive em quatro variaveis: `items`, `searchQuery`, `sortMode` e `activeCat`.

---

## 🛠️ tecnologias

```
HTML5  ·  CSS3 custom properties  ·  vanilla JS ES6+
IBM Plex Mono  ·  Chart.js 4.4.1  ·  localStorage  ·  sem etapa de build
```

---

## 📁 estrutura do projeto

```
index.html         <- o app inteiro (HTML + CSS + JS em um so arquivo)
README.pt-BR.md    <- este arquivo
README.md          <- versao em ingles
```

---

<div align="center">

feito com 💙 · roda em qualquer navegador · sem internet apos o primeiro acesso

</div>

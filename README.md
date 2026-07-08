<div align="center">

# 🧾 Recibo de Gastos

**controle suas entradas e saídas como um recibo de papel — na hora.**
_sem instalar · sem conta · sem servidor · só abrir e digitar_

[🇧🇷 ler em inglês](README.md) · [abrir o app →](https://maria-brito15.github.io/expense-receipt.local/index.html)

</div>

---

## ✨ por que isso existe

sabe aquele momento em que você precisa separar o que gastou no mercado, planejar o orçamento de uma viagem, ou simplesmente descobrir quanto sobrou esse mês — e as opções são:

> pedir pra uma IA montar a lista e somar, ou digitar tudo na calculadora na mão

os dois são _chato demais_. um é repetitivo, o outro exige abrir mais uma aba e ficar explicando o contexto. devia ser só uma página que você abre e já vai digitando.

então sim — nasceu da preguiça pura. tem um ditado que diz: _dê a tarefa difícil pra pessoa preguiçosa, porque ela vai achar um jeito mais fácil de fazer._ é exatamente isso.

esse projeto também faz parte de uma série de ferramentas pequenas que seguem a mesma filosofia: **"é chato fazer na mão, por que não construir algo que faça por mim?"** — assim como o [padronizador de nomes de arquivo](https://github.com/maria-brito15/file-name-standardizer) que veio antes.

---

## 🚀 como usar

**online** — sem instalação, só abrir o link:

> 🔗 [maria-brito15.github.io/expense-receipt.local/index.html](https://maria-brito15.github.io/expense-receipt.local/index.html)

**localmente** — clone o repositório e abra o arquivo direto no navegador:

```bash
git clone https://github.com/maria-brito15/expense-receipt.git
# depois abra index.html no seu navegador
```

```
digita valor + descrição  →  marca como entrada ou saída  →  escolhe uma cor  →  adiciona
```

---

## 🎛️ funcionalidades

- **adicionar lançamentos** — valor, descrição e se é entrada (`+`) ou saída (`-`). um toque e já tá no recibo.
- **editar lançamentos** — toque no lápis de qualquer item pra carregá-lo de volta no formulário, ajustar valor, descrição, tipo ou cor, e salvar a alteração no lugar.
- **saldo inicial** — define o saldo com que o mês começou uma vez só; ele entra direto na conta do saldo final, sem você ter que somar na mão.
- **cores de marca-texto** — destaca qualquer lançamento com uma cor, igual grifar algo num recibo de papel de verdade.
- **pesquisa** — filtra a lista em tempo real enquanto você digita.
- **filtro entradas / saídas** — chips pra isolar entradas, saídas, ou ver tudo junto.
- **ordenação** — por data (mais novo/mais antigo), valor (maior/menor) ou A–Z.
- **resumo ao vivo** — saldo inicial, total de entradas, total de saídas e saldo final, sempre visíveis no rodapé do recibo.
- **importar csv** — traz lançamentos de um arquivo `.csv`; saldo inicial e nome do mês também são lidos se estiverem presentes, e os lançamentos são somados direto na sua lista.
- **exportar csv** — baixa toda a sua lista como um arquivo `.csv` — incluindo nome do mês e saldo inicial como linhas de metadados — pronto pra reabrir aqui ou numa planilha.
- **exportar pdf** — abre o diálogo de impressão do navegador com um layout limpo de recibo (toda a interface some).
- **modo claro e escuro** — alterna no topo da tela, e é lembrado nas próximas visitas.
- **instalável como pwa** — adiciona na tela inicial ou no desktop e roda como um app nativo, funciona até offline.
- **totalmente responsivo** — o mesmo layout de recibo se adapta de celulares pequenos até tablet e desktop.
- **sempre atualizado** — os arquivos têm cache-busting e o service worker busca primeiro na rede, então você sempre pega a versão mais nova quando está online, caindo pro cache só quando offline.
- **armazenamento persistente** — tudo fica no `localStorage` como json. sobrevive a atualizações e reinicializações, nada é enviado pra lugar nenhum.

---

## 🏗️ arquitetura do código

JS puro, zero dependências, dividido em três arquivos:

```
loadItems / saveItems                 lê e escreve a lista no localStorage como json
loadSaldoInicial / saveSaldoInicial    lê e escreve o saldo inicial no localStorage
getFilteredSorted()                    aplica busca, filtro de entrada/saída e ordenação
render()                               reconstrói a lista, os chips de categoria e o resumo
renderSwatches()                       desenha o seletor de cores de marca-texto
startEdit() / cancelEdit()             carrega um lançamento de volta no formulário pra editar, ou reseta o formulário
parseCsvLine()                         transforma uma linha importada de csv num lançamento
applyTheme()                            alterna e salva o modo claro/escuro
```

todo o estado vive em algumas variáveis: `items`, `searchQuery`, `sortMode`, `activeCat`, `currentType`, `currentColor`, `editingId` e `saldoInicial`.

---

## 📄 formato do csv

```
descricao_mes,gastos e ganhos de julho
saldo_inicial,1200.00
tipo,valor,descricao,cor,data
entrada,3500.00,salário julho,#a8e0b8,2026-07-01T09:00:00.000Z
saida,89.90,mensalidade spotify,#f4a6c6,2026-07-02T10:15:00.000Z
```

as duas primeiras linhas são metadados opcionais (nome do mês e saldo inicial) — tanto a exportação quanto a importação entendem elas em qualquer ordem, e csvs antigos sem essas linhas continuam sendo importados normalmente.

---

## 🛠️ tecnologias

```
HTML5  ·  CSS3 custom properties  ·  vanilla JS ES6+
IBM Plex Mono  ·  localStorage  ·  sem etapa de build
```

---

## 📁 estrutura do projeto

```
index.html         <- marcação e estrutura
style.css          <- tema, layout e regras responsivas
script.js          <- estado, renderização, import de csv e tema
sw.js              <- service worker, cache network-first pra uso offline (tem que ficar na raiz)
pwa/
  manifest.json          <- metadados do pwa, comportamento de instalação
  icon-192.png            <- ícone do app
  icon-512.png            <- ícone do app
  icon-512-maskable.png   <- ícone adaptativo pro android
README.pt-BR.md    <- este arquivo
README.md          <- versão em inglês
```

---

<div align="center">

feito com 💙 · roda em qualquer navegador · sem internet após o primeiro acesso

</div>

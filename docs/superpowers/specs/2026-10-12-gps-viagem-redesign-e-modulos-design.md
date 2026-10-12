# GPS de Viagem Amsterdam ⇄ Paris — redesign visual e módulos novos

**Data:** 2026-10-12
**Status:** aprovado para implementação
**Viagem:** 02 a 08 de dezembro de 2026

---

## 1. Objetivo

O site hoje é um manual de transporte auditado, com sete rotas verificadas contra fontes
oficiais (NS, GVB, Île-de-France Mobilités, Eurostar). Duas coisas mudam:

1. **Visual e dinâmica refeitos** na direção "cartão de embarque / painel de estação".
2. **Seis módulos novos** que transformam o manual de transporte em um companheiro de
   viagem completo — sem comprometer a confiança que o conteúdo auditado construiu.

---

## 2. Regras invioláveis

Estas regras têm precedência sobre qualquer decisão de design ou implementação.

### 2.1 Os dados auditados não mudam

`ROUTES`, `HOST_NOTE`, `NC` e `CHECKLIST_ITEMS` migram do `index.html` atual para
`js/data.js` **por extração automática**, nunca por digitação. As hospedagens
(Volkshotel e 12 Av. de l'Observatoire), hoje escritas direto no HTML, viram `STAYS`
pelo mesmo processo.

Um verificador (`scripts/verify-data.mjs`) compara o `ROUTES` original — lido do git via
`git show <commit-base>:index.html` — com o novo `js/data.js`, campo por campo. Diferença
de um caractere em qualquer horário, parada, direção, tarifa ou aviso faz o script sair
com código diferente de zero. **O verificador roda antes de cada commit e no fim da
implementação; sua saída é mostrada ao Miguel.**

### 2.2 Zero invenção de dado

Não entram no site, escritos por mim:

- horário de funcionamento de qualquer lugar
- preço de ingresso, passeio ou refeição
- data de evento
- duração de passeio
- endereço que não esteja na fonte original

Onde essa informação seria útil, o site entrega **um botão para o site oficial**, onde o
Miguel confere. O conteúdo editorial diz o que é o lugar e onde fica, nada mais.

Exceções, por serem conhecimento estável e não fato variável: números de emergência
(112), frases e pronúncia dos idiomas, e as tarifas que **já estão** no dado auditado
(GVB €3,40, RER €2,55).

### 2.3 Links oficiais são verificados ao vivo

Nenhum botão "site oficial" entra sem ter sido testado respondendo de verdade. Um link
quebrado é pior que link ausente, porque o Miguel clicaria contando com ele no meio da
viagem. Estado da verificação na seção 8.

### 2.4 Separação entre auditado e editorial

As abas **Agora**, **Viagem** e **Frases** carregam dado auditado ou conhecimento estável.
A aba **Guia** é editorial e abre com uma faixa fixa declarando isso. A faixa não é
decoração — é o contrato do site com o usuário.

---

## 3. Direção visual

### 3.1 Conceito

Cartão de embarque e painel de partidas. O app deixa de ser um diário ilustrado e vira
um instrumento: hora grande, dado em monoespaçada, cor indicando o país.

### 3.2 Paleta

Chão quente, sem azul e sem dourado — o cinza-azulado padrão de dashboard sai.

| Token | Claro | Escuro | Papel |
|---|---|---|---|
| Chão | `#F4F1EA` papel osso | `#16120F` carvão quente | Fundo da página |
| Superfície | `#FFFFFF` | `#1E1916` | Cartões |
| Tinta | `#1A1613` | `#EDE8DF` | Texto principal |
| Tinta suave | `#5C534A` | `#A89C8F` | Texto secundário |
| Fio | `#DCD5C8` | `#332A23` | Bordas e divisórias |
| Amsterdam | `#B4531F` rust | `#D4733C` | Acento dos trechos NL |
| Paris | `#7A2233` oxblood | `#C4697C` | Acento dos trechos FR |
| Internacional | `#4F6B3A` musgo | `#8BAE6E` | Acento Eurostar + confirmado |
| Sinal | `#C2410C` | `#E0683A` | Alerta e não confirmado |

**Resolução de colisão:** rust é Amsterdam *e* alerta; musgo é internacional *e*
confirmado. Resolvido por forma, não por cor — acento de categoria é sempre barra de 3 px
na borda do cartão, status é sempre chip em caixa-alta. O rust de Amsterdam nunca
preenche área; o alerta usa chão escurecido (`#2A1410` escuro / `#FBEAE4` claro).

Os três temas são tratados: `:root` define o claro completo,
`@media (prefers-color-scheme: dark)` guardado como `:root:not([data-theme="light"])`
redefine só os tokens, e `:root[data-theme="dark"]` redefine de novo para o toggle.

### 3.3 Tipografia

- **Archivo** — títulos, rótulos e corpo. Grotesca de viés industrial.
- **IBM Plex Mono** — todo dado tabular: horário, duração, preço, código de rota, sigla.

Regra única: se é informação que se conferiria num painel de estação, é mono; se é texto
que se lê, é sans. Fraunces e Work Sans saem.

### 3.4 Motivos estruturais

1. **Linha perfurada** — divisória tracejada com entalhes semicirculares nas laterais,
   separando o talão do corpo de dados. Assinatura visual, aparece no detalhe de rota.
2. **Grid de dados** — rótulo em micro-caixa-alta + valor. Os oito campos existentes
   (`ondeEstou`, `oQuePegar`, `direcao`, `paradas`, `ondeDescer`, `saida`, `caminhada`,
   `destino`) caem nele sem adaptação.
3. **Chips de status** — `NÃO CONFIRMADO` deixa de ser texto perdido no meio do valor e
   vira chip de contorno tracejado. O texto permanece idêntico; muda só a pintura.
   `Reserva confirmada` vira chip musgo.

### 3.5 Fotografia

Uso pontual. `img/hero.webp` entra como **faixa no topo da tela Agora** (opção A,
escolhida pelo Miguel na comparação visual). `img/diario.webp` fecha a aba Guia. Saem os
fundos de página inteira, o parallax e as camadas de vidro sobre foto.

### 3.6 Movimento

Movimento diz de onde a informação veio; não enfeita.

- **Split-flap** no horário-chave da tela Agora: uma vez por sessão, ~600 ms. Só ali.
- **Detalhe de rota** sobe como bilhete puxado da carteira: `translateY(100%)` → `0`,
  280 ms, saída desacelerada. Arrastar para baixo fecha no celular.
- **Cascata** de 40 ms nas linhas do painel de partidas, só na primeira abertura da aba.
- **Checklist** marca com pop de escala de 120 ms; barra de progresso por transição.
- Tudo cai para opacidade simples ou nada sob `prefers-reduced-motion`.

---

## 4. Arquitetura de informação

### 4.1 Barra inferior — cinco abas

```
AGORA · VIAGEM · FRASES · GASTOS · GUIA
```

Três reposicionamentos deliberados:

**A checklist sobe para Agora.** Ela se chama "antes de sair" e Agora é a tela sobre
sair. O site atual as separava, forçando troca de aba no exato momento de pressa.

**Emergência não é aba.** O requisito dela é velocidade sob estresse, não navegação.
Vira acesso fixo na barra do topo, visível em todas as telas, abrindo em sobreposição.

**Frases ganha aba própria.** O uso real é virar a tela para outra pessoa ler enquanto
se está no balcão. Dois níveis abaixo de "Guia" inviabilizaria o módulo.

### 4.2 Roteamento

Hashes novos: `#agora`, `#viagem`, `#frases`, `#gastos`, `#guia`, `#rota-N`, `#sos`.
Hashes antigos (`#inicio`, `#rotas`, `#eurostar`, `#checklist`) redirecionam, para não
quebrar link já salvo no celular.

A aba Eurostar deixa de existir: os dois trechos aparecem na linha do tempo com acento
musgo e chip de reserva confirmada, mais a nota de chegada recomendada.

---

## 5. Módulos

### 5.1 Agora

Tela de status, aberta por padrão.

- Barra superior: `AMS ⇄ PAR`, contagem de dias até a partida (**calculada** a partir de
  `orderISO`, não escrita), acesso SOS.
- Faixa de foto com identificação da viagem.
- **Cartão de embarque da próxima rota**, com `oQuePegar`, `direcao` e `ondeDescer`
  trazidos para a superfície — hoje exigem abrir o detalhe, e o momento de uso real é
  estar parado na plataforma decidindo se embarca.
- Tira fixa **LINHA / DIREÇÃO / DESTINO**.
- **Checklist da próxima rota** (seção 6).
- Alerta da hospedagem faltante de 07/12.
- Nota qualitativa de luz do dia: "em dezembro escurece cedo por aqui — planeje passeio
  para a primeira metade do dia". **Sem horário**, por decisão do Miguel.

Quando a viagem termina (`orderISO` todos no passado), a tela mostra estado de conclusão.

### 5.2 Viagem

Painel de partidas cronológico, agrupado por dia (02, 04, 07, 08 DEZ).

Cada evento é uma linha: hora em mono, título, modo, status. Rotas abrem o detalhe.
Check-in e checkout das hospedagens entram como linhas na mesma coluna temporal, com
acento neutro.

**O conflito de 04/12 fica visível por geometria:** o Eurostar das 11:10 aparece acima do
checkout das 12:00 do Volkshotel, com marcador conectando os dois. Hoje isso é uma frase
dentro de uma nota que só se lê abrindo a rota certa.

O detalhe de rota é sobreposição de tela cheia no formato do cartão completo: cabeçalho,
linha perfurada, grid por trecho, Tempo/Bilhete/Mala, `confirmedTime`, `checkinNote`,
`recNote`, `stayNotes`, `hostNote`, bloco "Não confunda" e botão do Maps.

### 5.3 Frases

**As duas línguas não têm o mesmo peso, e o módulo reflete isso.** Em Amsterdam o inglês
resolve tudo e o holandês é cortesia; em Paris o francês muda a qualidade do atendimento
e há gente que não fala inglês. O bloco francês é maior e funcional; o holandês é curto
e social.

Agrupamento por momento real, não por categoria gramatical: comprar bilhete, perguntar
plataforma, pedir ajuda quando errou o trem, check-in, restaurante, farmácia, emergência.

Pronúncia escrita para ouvido brasileiro, não alfabeto fonético:
`Dank je wel` → "dánk ye vél". Toque amplia a frase para mostrar a outra pessoa.

### 5.4 Gastos

Duas funções separadas: **orçamento previsto** e **registro do gasto real**.
Persistência em `localStorage`, como a checklist.

**Conversão EUR→BRL:** o site é estático e usado offline, então não há cotação ao vivo.
O Miguel fixa a cotação uma vez; o app guarda o valor e a data, e exibe "cotação de
DD/MM" ao lado de todo valor convertido — assim nenhum número é confundido com cotação
do dia.

As tarifas já auditadas (GVB €3,40, RER €2,55) entram como ponto de partida do orçamento.

Exportar/importar o registro em JSON, para o dado sobreviver a limpeza de navegador.

### 5.5 Guia

Editorial. Abre com a faixa de contrato: *"Aqui são sugestões. Horário e preço se
confirmam no site oficial — este guia não exibe nenhum dos dois."*

Contém:

- **Lugares** (seção 8): nome, bairro, uma linha do que é, e dois botões —
  **"site oficial"** e **"como chegar daqui"**.
- **Avisos práticos**: cartão de crédito x débito na Holanda, gorjeta, banheiro pago, e o
  alerta de sites falsos de ingresso (seção 8.3). Todos marcados "confirme antes", nunca
  como auditado.
- **Não confunda** global: os três cards (Amsterdam, Paris, RER B).
- **Se eu me perder**: o procedimento dos três itens e o que fazer ao embarcar errado.

**"Como chegar daqui"** é o botão mais importante do módulo e a extensão natural da
competência do site: abre o Google Maps com origem no alojamento correto para a cidade e
a data (Wibautstraat 150 ou 12 Av. de l'Observatoire) e destino no lugar. Nenhuma rota é
inventada — o cálculo fica com o app que tem trânsito real do dia.

### 5.6 Emergência (sobreposição, acesso fixo)

- **112** — emergência em ambos os países.
- Consulado brasileiro em Amsterdam e em Paris.
- Dados do seguro viagem (preenchidos pelo Miguel).
- O que fazer ao perder passaporte, bilhete do Eurostar ou cartão.
- Endereço dos dois alojamentos, para mostrar a um taxista.

---

## 6. Checklist por rota

### 6.1 O problema da checklist atual

A lista fixa de oito itens tem três defeitos:

1. **Duplica a tela.** "Confirmar linha / direção / destino" já é a tira permanente
   LINHA/DIREÇÃO/DESTINO. Marcar caixa do que está à frente é trabalho duplicado.
2. **Verbo sem objeto.** "Conferir interrupções" não diz onde conferir nem quando se
   pode considerar pronto.
3. **Igual para as sete rotas.** Pegar o metrô até Centraal e embarcar em trem
   internacional com controle de passaporte geram a mesma lista.

Além disso o estado é global: marca-se uma vez e fica marcado para sempre.

### 6.2 A regra

**Todo item nomeia um objeto concreto e falha de forma concreta.** Se não é possível
dizer o que dá errado ao pular o item, ele não entra.

A checklist passa a ser **derivada por rota** do dado auditado, e **zera a cada partida**
(estado em `localStorage` com chave por `id` de rota).

Item informativo não entra. "Estar ciente de X" não é tarefa: marcar a caixa não muda
nada no mundo. Onde a informação importa, o item vira a decisão que ela exige.

### 6.3 Itens por rota

Todos derivados dos campos existentes.

**Universais (toda rota)**
- Bateria do celular carregada — o guia e os bilhetes estão nele
- Captura de tela do bilhete salva — funciona sem internet

**Rota 01 · Schiphol → Wibautstraat 150**
- Bilhete NS resolvido (app NS, máquina ou OVpay)
- Painel do trem diz **Amsterdam Centraal**
- No metrô, sentido **Gaasperplas** ou **Gein**
- Plano definido para a brecha das 14:55 às 16:00 — o quarto só abre às 16:00 e você
  chega com mala (o Volkshotel guarda bagagem antes do check-in?)

**Rota 02 · Wibautstraat 150 → Amsterdam Centraal**
- Checkout do Volkshotel feito (limite 12:00)
- Metrô sentido **Centraal Station** — não Gaasperplas/Gein
- Toda a bagagem com você: daqui vai direto para o Eurostar

**Rota 03 · Eurostar 11:10 → Paris**
- Passaporte na mão — há controle antes do embarque
- QR code do Eurostar aberto ou salvo no celular
- Na estação entre 09:40 e 09:55
- Checkout do Volkshotel feito

**Rota 04 · Gare du Nord → 12 Av. de l'Observatoire**
- Bilhete RER B (€2,55) comprado e validado na catraca
- RER B sentido **sul** — Robinson / Saint-Rémy-lès-Chevreuse / Massy-Palaiseau
- Descer em **Port-Royal**, não em Denfert-Rochereau
- Plano definido para a brecha das 14:35 às 16:00 — o Eurostar chega antes do check-in
  do Airbnb, e você estará com mala no 6ᵉ

**Rota 05 · 12 Av. de l'Observatoire → Gare du Nord**
- Checkout do Airbnb feito (limite 11:00)
- Nada esquecido no alojamento
- Bilhete RER B comprado e validado
- RER B sentido **norte** — Mitry-Claye / CDG, oposto da ida

**Rota 06 · Eurostar 09:24 → Amsterdam**
- Passaporte na mão
- QR code do Eurostar acessível
- Na estação entre 07:54 e 08:09

**Rota 07 · Amsterdam Centraal → Schiphol**
- Hospedagem da noite de 07/12 resolvida *(risco em aberto, ver seção 10)*
- Bilhete NS resolvido
- Painel confirma que o trem **para em Schiphol Airport**
- Mala pronta para o voo das 20:35

---

## 7. Estrutura de arquivos

```
index.html          estrutura e <head>
css/style.css       tokens, componentes, temas
js/data.js          ROUTES, HOST_NOTE, NC, STAYS  (extraído, nunca digitado)
js/content.js       frases, lugares, avisos  (conteúdo novo)
js/app.js           render, navegação, checklist, gastos
scripts/verify-data.mjs
img/
vercel.json         sem alteração — tudo continua estático
```

`vercel.json` não muda: não há `buildCommand`, e CSS e JS novos são apenas mais arquivos
estáticos. O cache agressivo (`immutable`) cobre só `/img/`, então CSS e JS novos não
ficam presos no celular durante o desenvolvimento.

Separar `data.js` de `content.js` é deliberado: o primeiro é intocável e verificado por
script; o segundo é editorial e livre. A fronteira fica legível no diff.

---

## 8. Lugares propostos

Nome, bairro e uma linha. **Nenhum horário, preço ou data.** Miguel corta o que não
quiser antes da construção.

### 8.1 Amsterdam

**Amsterdam tem mais tempo que Paris, não menos.** Chegada 02/12 à tarde, 03/12 inteiro,
manhã do 04/12, volta em 07/12 às 13:50 com a tarde livre, e 08/12 quase inteiro até sair
para o Schiphol. São cerca de três dias úteis contra dois em Paris.

A lista é organizada por distância do Volkshotel (Wibautstraat 150, Amsterdam Oost),
porque essa é a informação que só este site tem.

**Perto do alojamento — Oost e De Pijp**

| Lugar | O que é | Link |
|---|---|---|
| Oosterpark | Parque ao lado do hotel | — (espaço público) |
| Tropenmuseum | Culturas do mundo, dentro do Oosterpark | ✅ 200 |
| Albert Cuyp Markt | Mercado de rua em De Pijp | ✅ 200 |
| Brouwerij 't IJ | Cervejaria dentro de um moinho de vento | ✅ 200 |

**Museumplein**

| Lugar | O que é | Link |
|---|---|---|
| Rijksmuseum | Arte e história holandesa | ✅ 200 |
| Van Gogh Museum | Maior acervo do pintor | ✅ 200 |
| Stedelijk Museum | Arte moderna e design | ✅ 202 |
| Moco Museum | Arte urbana e contemporânea | ⏳ domínio resolve, bloqueia automação |

**Centro e canais**

| Lugar | O que é | Link |
|---|---|---|
| Anne Frank Huis | Casa-museu no Jordaan | ✅ 200 |
| Museum Het Rembrandthuis | Casa e ateliê de Rembrandt | ✅ 200 |
| Paleis op de Dam | Palácio real na praça Dam | ✅ 200 |
| Het Scheepvaartmuseum | Museu marítimo | ✅ 200 |

**Do outro lado do IJ** — balsa gratuita atrás da Centraal

| Lugar | O que é | Link |
|---|---|---|
| Eye Filmmuseum | Cinema e arquitetura | ✅ 200 |
| A'DAM Lookout | Mirante sobre a cidade | ✅ 200 |

**Outros**

| Lugar | O que é | Link |
|---|---|---|
| Artis | Zoológico, um dos mais antigos da Europa | ✅ 200 |
| Micropia | Museu de micro-organismos, no mesmo complexo | ✅ 200 |
| NEMO Science Museum | Ciência, com terraço de vista | ✅ 200 |
| Heineken Experience | Antiga cervejaria | ⏳ domínio resolve, bloqueia automação |
| Zaanse Schans | Moinhos de vento, bate-volta de trem | ✅ 200 |

**Específico de dezembro**

| Lugar | O que é | Link |
|---|---|---|
| Amsterdam Light Festival | Percurso de arte em luz pelos canais, temporada de inverno | ✅ 200 |

O Light Festival é o item mais característico da sua janela de viagem — mas as datas e o
percurso mudam a cada edição e **não entram escritos no site**: só o link oficial.

Fora da lista por não ter sido possível verificar: **Foam** (fotografia) devolve 429
persistente. **Keukenhof** não entra de propósito — é jardim de tulipas, abre só na
primavera.

### 8.2 Paris

Chegada 04/12 às 14:35, saída 07/12 cedo. Dias cheios: 05 e 06/12.

| Lugar | Onde | Link verificado |
|---|---|---|
| Jardin du Luxembourg | **a pé do alojamento** | ✅ 200 |
| Catacombes de Paris | Denfert-Rochereau, perto do alojamento | ✅ 200 |
| Musée d'Orsay | 7ᵉ, beira-Sena | ✅ confirmado no navegador |
| Musée de l'Orangerie | Tuileries | ✅ 200 |
| Louvre | 1ᵉʳ | ✅ 200 |
| Sainte-Chapelle | Île de la Cité | ✅ 200 |
| Sacré-Cœur / Montmartre | 18ᵉ | ✅ 200 |
| Centre Pompidou | Beaubourg | ⚠️ link responde, mas há reforma de longa duração anunciada — **confirmar antes** |
| Tour Eiffel | 7ᵉ | ⏳ não verificado — domínio bloqueia automação |
| Notre-Dame de Paris | Île de la Cité | ⏳ não verificado — domínio bloqueia automação |

**Observação de proximidade:** 12 Av. de l'Observatoire fica colado no Jardin du
Luxembourg e a poucos minutos de Denfert-Rochereau — a mesma estação em que a Rota 04
manda **não** descer. Vale o site deixar isso explícito para não gerar confusão: errada
para chegar em casa vindo do Gare du Nord, certa para visitar as Catacumbas.

### 8.3 Avisos práticos

- **Sites falsos de ingresso.** O próprio site do Musée d'Orsay alerta que existem
  revendas falsas e que a bilheteria legítima é `billetterie.musee-orsay.fr`. Vale como
  princípio geral: comprar só pelo link do site oficial.
- **Cartão na Holanda.** Muito estabelecimento holandês historicamente não aceita crédito
  internacional, só débito Maestro. Marcado como "confirme antes", não como auditado.
- **Gorjeta e banheiro pago** nos dois países.

---

## 9. Verificação

| O quê | Como |
|---|---|
| Dados auditados | `scripts/verify-data.mjs` compara `ROUTES` do git com `js/data.js`, campo a campo. Falha trava o commit. |
| Links oficiais | Cada URL testada respondendo antes de entrar. Resultado na seção 8. |
| Temas | Varredura do CSS por cor declarada só dentro de media query ou `[data-theme]`. |
| Visual | Site rodando e conferido ao vivo no navegador, em largura de celular, antes de declarar pronto. |

---

## 10. Riscos e pendências

1. **Noite de 07/12 em Amsterdam sem hospedagem.** O Volkshotel cobre 02–04/12 e as
   reservas enviadas não incluem a volta. Risco real, não de software. Aparece como
   alerta na tela Agora e como item da checklist da Rota 07.
2. **Sem funcionamento offline.** O Miguel optou por deixar PWA e service worker fora do
   escopo. Consequência concreta: em estação sem sinal o site pode não abrir, e as fontes
   do Google não carregam. Mitigado parcialmente pelo item de checklist "captura de tela
   do bilhete salva". Candidato óbvio a uma fase 2.
3. **Dois links não verificados** (Tour Eiffel, Notre-Dame). Resolver antes da entrega —
   liberando os domínios na extensão ou com o Miguel confirmando no próprio navegador.
4. **Centre Pompidou** pode estar fechado para reforma na data da viagem.
5. **Dados do seguro viagem e consulado** dependem do Miguel fornecer.

---

## 11. Fora de escopo

Tradutor embutido, mapa desenhado dentro do site, lista de restaurantes e previsão do
tempo. Os três primeiros o Google Maps faz melhor e estará aberto de qualquer forma;
previsão do tempo com semanas de antecedência não existe. Incluir só aumentaria a
superfície de conteúdo desatualizado.

PWA / offline: fora desta fase por decisão do Miguel (ver risco 2).

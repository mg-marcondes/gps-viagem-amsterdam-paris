/* =========================================================
   CONTEÚDO EDITORIAL — frases, lugares, avisos, emergência.

   Diferente de data.js, este arquivo é livre para editar.
   Regra do projeto: NENHUM horário de funcionamento, preço,
   data de evento ou duração de passeio é escrito aqui.
   Essa informação vem do botão "site oficial".
   ========================================================= */

/* ---------------------------------------------------------
   FRASES
   As duas línguas não têm o mesmo peso. Em Amsterdam o inglês
   resolve tudo e o holandês é cortesia; em Paris o francês tem
   peso funcional. O bloco francês é maior de propósito.
   Pronúncia escrita para ouvido brasileiro, não alfabeto fonético.
   --------------------------------------------------------- */

const PHRASES = {
  nl: {
    lang: "Holandês",
    flag: "🇳🇱",
    accent: "nl",
    intro:
      "Em Amsterdam praticamente todo mundo fala inglês muito bem — você <b>não vai precisar</b> de holandês. Essas frases são cortesia: abrem sorriso e mudam o tom do atendimento. Use as três primeiras e já está ótimo.",
    groups: [
      {
        title: "O básico que vale a pena",
        items: [
          { pt: "Obrigado", xx: "Dank je wel", say: "dánk ye vél" },
          { pt: "Por favor / aqui está", xx: "Alsjeblieft", say: "áls-ye-blíft" },
          { pt: "Olá / bom dia", xx: "Hallo / Goedemorgen", say: "ralô / rúde-mórrên" },
          { pt: "Tchau", xx: "Doei", say: "dúi" },
          { pt: "Desculpa", xx: "Sorry", say: "sórri" },
          { pt: "Com licença (para passar)", xx: "Pardon", say: "pardón" },
        ],
      },
      {
        title: "Na estação",
        items: [
          { pt: "Você fala inglês?", xx: "Spreekt u Engels?", say: "sprêkt u êngêls" },
          { pt: "Onde fica a plataforma?", xx: "Waar is het perron?", say: "vár is ret perrón" },
          { pt: "Este trem vai para…?", xx: "Gaat deze trein naar…?", say: "rát dêze tráin nár" },
          { pt: "Saída", xx: "Uitgang", say: "áut-rang" },
          { pt: "Entrada", xx: "Ingang", say: "ín-rang" },
        ],
      },
      {
        title: "Comendo e comprando",
        items: [
          { pt: "A conta, por favor", xx: "De rekening, alsjeblieft", say: "de rékêning, áls-ye-blíft" },
          { pt: "Posso pagar com cartão?", xx: "Kan ik met creditcard betalen?", say: "kan ik met crédit-cart betálên" },
          { pt: "Sem carne", xx: "Geen vlees", say: "rêin vlês" },
          { pt: "Água da torneira", xx: "Kraanwater", say: "krán-váter" },
        ],
      },
      {
        title: "Se der problema",
        items: [
          { pt: "Pode me ajudar?", xx: "Kunt u mij helpen?", say: "kunt u mái rélpên" },
          { pt: "Estou perdido", xx: "Ik ben verdwaald", say: "ik ben ferdváuld" },
          { pt: "Chame a polícia", xx: "Bel de politie", say: "bel de polítsi" },
          { pt: "Preciso de um médico", xx: "Ik heb een dokter nodig", say: "ik rep ên dóktêr nôdêr" },
        ],
      },
    ],
  },

  fr: {
    lang: "Francês",
    flag: "🇫🇷",
    accent: "fr",
    intro:
      "Em Paris o francês tem <b>peso real</b>: muda a qualidade do atendimento e você vai encontrar gente que não fala inglês. Comece toda interação com <b>Bonjour</b> — pular isso é considerado grosseria, e é o erro número um de turista.",
    groups: [
      {
        title: "A regra de ouro",
        items: [
          { pt: "Bom dia (sempre comece por aqui)", xx: "Bonjour", say: "bonjúr" },
          { pt: "Boa noite (a partir do fim da tarde)", xx: "Bonsoir", say: "bonsuár" },
          { pt: "Por favor", xx: "S'il vous plaît", say: "si vu plé" },
          { pt: "Obrigado", xx: "Merci", say: "mercí" },
          { pt: "Com licença / desculpe", xx: "Excusez-moi", say: "ekskúze-muá" },
          { pt: "Tchau", xx: "Au revoir", say: "ô revuár" },
        ],
      },
      {
        title: "Quando não entende",
        items: [
          { pt: "Você fala inglês?", xx: "Parlez-vous anglais ?", say: "parlê-vu anglé" },
          { pt: "Não falo francês", xx: "Je ne parle pas français", say: "jê nê parl pá fransé" },
          { pt: "Não entendi", xx: "Je ne comprends pas", say: "jê nê comprán pá" },
          { pt: "Mais devagar, por favor", xx: "Plus lentement, s'il vous plaît", say: "plü lantmán, si vu plé" },
          { pt: "Pode escrever?", xx: "Pouvez-vous l'écrire ?", say: "puvê-vu lekrír" },
        ],
      },
      {
        title: "Metrô e RER",
        items: [
          { pt: "Um bilhete, por favor", xx: "Un ticket, s'il vous plaît", say: "ãn tiquê, si vu plé" },
          { pt: "Este trem vai para Port-Royal?", xx: "Ce train va à Port-Royal ?", say: "sê trãn va a por-ruaiál" },
          { pt: "Qual direção?", xx: "Quelle direction ?", say: "kél direksión" },
          { pt: "Onde fica a saída?", xx: "Où est la sortie ?", say: "u é la sortí" },
          { pt: "Preciso trocar de trem?", xx: "Je dois changer ?", say: "jê duá chanjê" },
          { pt: "O bilhete não funciona", xx: "Mon ticket ne marche pas", say: "mon tiquê nê marsh pá" },
        ],
      },
      {
        title: "Restaurante e café",
        items: [
          { pt: "Uma mesa para dois", xx: "Une table pour deux", say: "ün tabl pur dê" },
          { pt: "O cardápio, por favor", xx: "La carte, s'il vous plaît", say: "la kart, si vu plé" },
          { pt: "A conta, por favor", xx: "L'addition, s'il vous plaît", say: "ladisión, si vu plé" },
          { pt: "Uma água da torneira", xx: "Une carafe d'eau", say: "ün karáf dô" },
          { pt: "Sem carne / sou vegetariano", xx: "Sans viande / je suis végétarien", say: "sãn viánd / jê sui vejetariãn" },
          { pt: "Tenho alergia a…", xx: "Je suis allergique à…", say: "jê sui alerjík a" },
          { pt: "Estava ótimo", xx: "C'était très bon", say: "sêté tré bón" },
        ],
      },
      {
        title: "Comprando",
        items: [
          { pt: "Quanto custa?", xx: "C'est combien ?", say: "sé combiãn" },
          { pt: "Aceita cartão?", xx: "Vous acceptez la carte ?", say: "vuz aksêptê la kart" },
          { pt: "Só estou olhando", xx: "Je regarde seulement", say: "jê regárd sêlmán" },
          { pt: "Onde fica o banheiro?", xx: "Où sont les toilettes ?", say: "u son lê tualét" },
        ],
      },
      {
        title: "Se der problema",
        items: [
          { pt: "Pode me ajudar?", xx: "Pouvez-vous m'aider ?", say: "puvê-vu medê" },
          { pt: "Estou perdido", xx: "Je suis perdu", say: "jê sui perdü" },
          { pt: "Perdi minha bagagem", xx: "J'ai perdu mes bagages", say: "jê perdü mê bagáj" },
          { pt: "Roubaram minha carteira", xx: "On m'a volé mon portefeuille", say: "on ma volê mon portfói" },
          { pt: "Chame a polícia", xx: "Appelez la police", say: "aplê la polís" },
          { pt: "Preciso de um médico", xx: "J'ai besoin d'un médecin", say: "jê bezuãn dãn medsãn" },
        ],
      },
    ],
  },
};

/* ---------------------------------------------------------
   LUGARES
   Nome, bairro e uma linha do que é. Sem horário, sem preço.
   `official` é null quando o link não pôde ser verificado ao vivo.
   `pending` marca domínio que existe mas bloqueia verificação automática.
   --------------------------------------------------------- */

const PLACES = [
  // ---------------- Amsterdam ----------------
  {
    city: "ams",
    group: "Perto do alojamento — Oost e De Pijp",
    items: [
      { name: "Oosterpark", area: "Oost", what: "Parque logo ao lado do Volkshotel.", official: null, note: "Espaço público, sem site de visitação." },
      { name: "Tropenmuseum", area: "Oosterpark", what: "Culturas do mundo, num prédio monumental dentro do parque.", official: "https://www.tropenmuseum.nl/en" },
      { name: "Albert Cuyp Markt", area: "De Pijp", what: "Mercado de rua, o maior da cidade.", official: "https://albertcuyp-markt.amsterdam/" },
      { name: "Brouwerij 't IJ", area: "Oost", what: "Cervejaria instalada dentro de um moinho de vento.", official: "https://www.brouwerijhetij.nl/en" },
    ],
  },
  {
    city: "ams",
    group: "Museumplein",
    items: [
      { name: "Rijksmuseum", area: "Museumplein", what: "Arte e história holandesa, de Rembrandt a Vermeer.", official: "https://www.rijksmuseum.nl/en" },
      { name: "Van Gogh Museum", area: "Museumplein", what: "O maior acervo do pintor no mundo.", official: "https://www.vangoghmuseum.nl/en" },
      { name: "Stedelijk Museum", area: "Museumplein", what: "Arte moderna e design.", official: "https://www.stedelijk.nl/en" },
      { name: "Moco Museum", area: "Museumplein", what: "Arte urbana e contemporânea, Banksy incluso.", official: "https://www.mocomuseum.com/", pending: true },
    ],
  },
  {
    city: "ams",
    group: "Centro e canais",
    items: [
      { name: "Anne Frank Huis", area: "Jordaan", what: "A casa do anexo secreto.", official: "https://www.annefrank.org/en/museum/" },
      { name: "Museum Het Rembrandthuis", area: "Centro", what: "Casa e ateliê onde Rembrandt viveu e trabalhou.", official: "https://www.rembrandthuis.nl/en/" },
      { name: "Paleis op de Dam", area: "Praça Dam", what: "Palácio real do século XVII.", official: "https://www.paleisamsterdam.nl/en/" },
      { name: "Het Scheepvaartmuseum", area: "Centro", what: "Museu marítimo, com réplica de navio da Companhia das Índias.", official: "https://www.hetscheepvaartmuseum.com/" },
    ],
  },
  {
    city: "ams",
    group: "Do outro lado do IJ — balsa gratuita atrás da Centraal",
    items: [
      { name: "Eye Filmmuseum", area: "Noord", what: "Cinema e arquitetura, com vista para a água.", official: "https://www.eyefilm.nl/en" },
      { name: "A'DAM Lookout", area: "Noord", what: "Mirante sobre a cidade inteira.", official: "https://www.adamlookout.com/" },
    ],
  },
  {
    city: "ams",
    group: "Outros",
    items: [
      { name: "Artis", area: "Plantage", what: "Zoológico, um dos mais antigos da Europa.", official: "https://www.artis.nl/en" },
      { name: "Micropia", area: "Plantage", what: "Museu de micro-organismos, no mesmo complexo do Artis.", official: "https://www.micropia.nl/en/" },
      { name: "NEMO Science Museum", area: "Centro", what: "Ciência para mexer, com terraço de vista livre.", official: "https://www.nemosciencemuseum.nl/en/" },
      { name: "Heineken Experience", area: "De Pijp", what: "A antiga cervejaria, hoje visitação.", official: "https://www.heinekenexperience.com/en/", pending: true },
      { name: "Zaanse Schans", area: "Bate-volta de trem", what: "Moinhos de vento e casas de madeira à beira do rio.", official: "https://www.zaanseschans.nl/en/" },
    ],
  },
  {
    city: "ams",
    group: "Específico de dezembro",
    items: [
      {
        name: "Amsterdam Light Festival",
        area: "Pelos canais",
        what: "Percurso de arte em luz pelos canais, na temporada de inverno. O item mais característico da sua janela de viagem.",
        official: "https://amsterdamlightfestival.com/en",
        note: "Datas e percurso mudam a cada edição — confirme no site oficial.",
      },
    ],
  },

  // ---------------- Paris ----------------
  {
    city: "par",
    group: "A pé do alojamento",
    items: [
      { name: "Jardin du Luxembourg", area: "6ᵉ — colado em você", what: "O jardim do Senado, logo ali.", official: "https://www.senat.fr/visite/jardin/" },
      {
        name: "Catacombes de Paris",
        area: "Denfert-Rochereau",
        what: "Os ossários sob a cidade.",
        official: "https://www.catacombes.paris.fr/en",
        note: "Fica em Denfert-Rochereau — a estação em que a Rota 04 manda NÃO descer. Errada para chegar em casa, certa para vir aqui.",
      },
    ],
  },
  {
    city: "par",
    group: "Museus",
    items: [
      { name: "Musée d'Orsay", area: "7ᵉ, beira-Sena", what: "Impressionistas, numa antiga estação de trem.", official: "https://www.musee-orsay.fr/en" },
      { name: "Musée de l'Orangerie", area: "Tuileries", what: "As Ninfeias de Monet, em salas ovais feitas para elas.", official: "https://www.musee-orangerie.fr/en" },
      { name: "Louvre", area: "1ᵉʳ", what: "Não precisa de apresentação.", official: "https://www.louvre.fr/en" },
      { name: "Centre Pompidou", area: "Beaubourg", what: "Arte moderna, no prédio do avesso.", official: "https://www.centrepompidou.fr/en/", warn: "Há reforma de longa duração anunciada — confirme se está aberto antes de ir." },
    ],
  },
  {
    city: "par",
    group: "Monumentos",
    items: [
      { name: "Sainte-Chapelle", area: "Île de la Cité", what: "Vitrais do século XIII do chão ao teto.", official: "https://www.sainte-chapelle.fr/en" },
      { name: "Sacré-Cœur e Montmartre", area: "18ᵉ", what: "A basílica branca e o bairro em ladeira.", official: "https://www.sacre-coeur-montmartre.com/english/" },
      { name: "Tour Eiffel", area: "7ᵉ", what: "A torre.", official: "https://www.toureiffel.paris/en", pending: true },
      { name: "Notre-Dame de Paris", area: "Île de la Cité", what: "A catedral, reaberta após o incêndio.", official: "https://www.notredamedeparis.fr/en/", pending: true },
    ],
  },
];

/* ---------------------------------------------------------
   AVISOS PRÁTICOS
   Nada aqui é auditado. Todos marcados para confirmar.
   --------------------------------------------------------- */

const TIPS = [
  {
    icon: "🎫",
    title: "Compre ingresso só pelo site oficial",
    body:
      "O próprio site do Musée d'Orsay alerta que existem revendas falsas se passando por bilheteria oficial. Vale como princípio para os dois países: use o botão <b>Site oficial</b> deste guia e compre a partir dali — nunca por link de busca patrocinada.",
  },
  {
    icon: "💳",
    title: "Cartão na Holanda pode recusar",
    body:
      "Muito estabelecimento holandês historicamente aceita só débito (Maestro), não crédito internacional — supermercado e comércio pequeno especialmente. Leve alternativa e <b>confirme antes de pedir a conta</b>. Não é informação auditada.",
  },
  {
    icon: "🚰",
    title: "Água da torneira",
    body:
      "Potável nos dois países. Na França, pedir <i>une carafe d'eau</i> é normal e gratuito — garrafa vem cobrada. Na Holanda, <i>kraanwater</i>.",
  },
  {
    icon: "🚻",
    title: "Banheiro costuma ser pago",
    body:
      "Em estação, rodoviária e parte dos cafés, cobra-se alguns centavos. Vale manter moeda pequena no bolso em vez de depender de cartão.",
  },
  {
    icon: "🗣️",
    title: "Comece sempre com Bonjour",
    body:
      "Na França, entrar numa loja ou abordar alguém sem dizer <b>Bonjour</b> antes é lido como grosseria, e muda o atendimento. É o erro mais comum de turista e o mais fácil de evitar.",
  },
  {
    icon: "🌇",
    title: "Em dezembro escurece cedo",
    body:
      "Nos dois países o dia é curto nesta época e anoitece bem antes do jantar. Passeio ao ar livre e foto de rua rendem muito mais na <b>primeira metade do dia</b> — vale inverter a ordem do que você planejaria no Brasil.",
  },
];

/* ---------------------------------------------------------
   EMERGÊNCIA
   `null` em valor = pendente, o Miguel preenche.
   --------------------------------------------------------- */

const EMERGENCY = {
  primary: {
    label: "Emergência — polícia, ambulância, bombeiro",
    value: "112",
    sub: "Funciona na Holanda e na França. Atende em inglês.",
    tel: "112",
  },
  blocks: [
    {
      title: "Consulado do Brasil",
      items: [
        { k: "Amsterdam / Haia", v: null, hint: "Preencher com o contato atual do consulado" },
        { k: "Paris", v: null, hint: "Preencher com o contato atual do consulado" },
      ],
    },
    {
      title: "Seguro viagem",
      items: [
        { k: "Seguradora", v: null, hint: "Preencher" },
        { k: "Número da apólice", v: null, hint: "Preencher" },
        { k: "Telefone de assistência", v: null, hint: "Preencher" },
      ],
    },
    {
      title: "Onde eu estou hospedado",
      items: [
        { k: "Amsterdam", v: "Volkshotel — Wibautstraat 150" },
        { k: "Paris", v: "12 Avenue de l'Observatoire, 75006" },
      ],
      note: "Mostre esta tela ao taxista se precisar voltar e não conseguir explicar.",
    },
  ],
  procedures: [
    {
      title: "Perdeu o passaporte",
      steps: [
        "Registre boletim de ocorrência na polícia local — o consulado vai pedir.",
        "Contate o consulado brasileiro para emissão de autorização de retorno.",
        "Avise a companhia aérea: pode haver exigência adicional no embarque.",
      ],
    },
    {
      title: "Perdeu o bilhete do Eurostar",
      steps: [
        "O bilhete é nominal e vinculado ao passaporte — o balcão da Eurostar consegue reemitir.",
        "Chegue com ainda mais folga: resolver isso leva tempo e há controle de passaporte depois.",
      ],
    },
    {
      title: "Perdeu ou roubaram o cartão",
      steps: [
        "Bloqueie pelo app do banco antes de qualquer outra coisa.",
        "Registre ocorrência se houve roubo.",
        "Tenha um segundo meio de pagamento guardado em lugar separado da carteira.",
      ],
    },
    {
      title: "Embarcou no trem errado",
      steps: [
        "Desça na próxima parada e volte — as linhas rodam nos dois sentidos com frequência alta.",
        "Confirme LINHA, DIREÇÃO e DESTINO antes de entrar no próximo.",
      ],
    },
  ],
};

/* ---------------------------------------------------------
   GASTOS — categorias iniciais.
   Os dois valores pré-carregados vêm do dado auditado.
   --------------------------------------------------------- */

const EXPENSE_CATEGORIES = [
  { id: "transporte", label: "Transporte", icon: "🚇" },
  { id: "comida", label: "Comida", icon: "🍽️" },
  { id: "passeio", label: "Passeios e ingressos", icon: "🎟️" },
  { id: "compras", label: "Compras", icon: "🛍️" },
  { id: "hospedagem", label: "Hospedagem", icon: "🏨" },
  { id: "outros", label: "Outros", icon: "•" },
];

/* Tarifas que já estão no dado auditado, oferecidas como atalho de lançamento. */
const KNOWN_FARES = [
  { label: "Metrô GVB 1h (Amsterdam)", eur: 3.4, cat: "transporte", src: "auditado" },
  { label: "RER B (Paris)", eur: 2.55, cat: "transporte", src: "auditado" },
];

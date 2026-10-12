/* =========================================================
   DADOS AUDITADOS — NÃO EDITAR À MÃO.
   Extraído automaticamente do index.html original.
   Qualquer alteração aqui é detectada por scripts/verify-data.mjs,
   que compara este arquivo com a versão do git campo a campo.
   ========================================================= */

const NC = "NÃO CONFIRMADO";

const HOST_NOTE = "<b>Instruções do anfitrião (reserva Airbnb):</b> RER B, estação Port-Royal · Metrô linhas 4 e 6, estação Raspail · Ônibus 91 e 38, parada Observatoire Port Royal · Ônibus 83, parada Observatoire Assas. A rota auditada neste guia é a do RER B.";

function mapsLink(query){
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

const ROUTES = [
  {
    id:1, code:"ROTA 01", title:"Schiphol → Wibautstraat 150",
    dateLabel:"02 DEZ", orderISO:"2026-12-02T14:55:00", keyTime:"14:55 (chegada do voo)",
    country:"nl", modeIcon:"✈️", durationLabel:"~25–30 min (2 trechos)",
    mapsQuery:"Volkshotel, Wibautstraat 150, Amsterdam",
    stayNotes:["🏨 <b>Volkshotel: check-in a partir das 16:00</b> (reserva). O voo pousa às 14:55."],
    chain:[
      {place:"Schiphol Airport"}, {mode:"🚆 NS"},
      {place:"Amsterdam Centraal"}, {mode:"🚇 Metro 53/54"},
      {place:"Wibautstraat"}
    ],
    legs:[
      { label:"Trecho 1 — Trem", accent:"nl",
        ondeEstou:"Schiphol Airport (estação de trem, dentro do aeroporto)",
        oQuePegar:"Trem NS (Sprinter)",
        direcao:"Trem que para em <b>Amsterdam Centraal</b> (direto)",
        paradas:["Amsterdam Lelylaan","Amsterdam Sloterdijk"],
        ondeDescer:"Amsterdam Centraal",
        saida:NC,
        caminhada:"Não se aplica (troca direto para o metrô, mesma estação)",
        destino:"Amsterdam Centraal",
        duracao:"16–17 min",
        ticket:"App NS, máquina, ou OVpay — tarifa " + NC,
        mala:"Compatível. Elevador na plataforma: " + NC
      },
      { label:"Trecho 2 — Metrô", accent:"nl",
        ondeEstou:"Amsterdam Centraal, nível do metrô",
        oQuePegar:"Metrô GVB — linha 53 ou 54",
        direcao:"<b>Gaasperplas</b> (linha 53) ou <b>Gein</b> (linha 54)",
        paradas:["Nieuwmarkt","Waterlooplein","Weesperplein"],
        ondeDescer:"Wibautstraat",
        saida:NC,
        caminhada:NC,
        destino:"Volkshotel Amsterdam — Wibautstraat 150",
        duracao:"7–8 min",
        ticket:"GVB 1h = €3,40/pessoa, ou OVpay",
        mala:"Compatível. Elevador na estação: " + NC
      }
    ],
    naoConfunda:[
      "No trem, confirme que o destino no painel é <b>Amsterdam Centraal</b>.",
      "No metrô, a direção certa é <b>Gaasperplas ou Gein</b> — nunca \"Isolatorweg\" (é outra linha)."
    ]
  },
  {
    id:2, code:"ROTA 02", title:"Wibautstraat 150 → Amsterdam Centraal",
    dateLabel:"", orderISO:"2026-12-04T08:00:00",
    country:"nl", modeIcon:"🚇", durationLabel:"7–8 min",
    mapsQuery:"Amsterdam Centraal",
    stayNotes:["🏨 <b>Volkshotel: checkout até 12:00</b> (reserva). O Eurostar sai às 11:10 — faça o checkout antes de sair para a estação."],
    chain:[{place:"Volkshotel (Wibautstraat 150)"},{mode:"🚇 Metro 53/54"},{place:"Amsterdam Centraal"}],
    legs:[
      { label:null, accent:"nl",
        ondeEstou:"Volkshotel Amsterdam — Wibautstraat 150",
        oQuePegar:"Metrô GVB — linha 53 ou 54",
        direcao:"<b>Centraal Station</b>",
        paradas:["Weesperplein","Waterlooplein","Nieuwmarkt"],
        ondeDescer:"Amsterdam Centraal (estação terminal)",
        saida:NC,
        caminhada:NC + " (distância até a estação Wibautstraat)",
        destino:"Amsterdam Centraal",
        duracao:"7–8 min",
        ticket:"GVB 1h = €3,40/pessoa, ou OVpay",
        mala:"Compatível"
      }
    ],
    naoConfunda:["Confirme na plataforma que a direção é <b>Centraal Station</b>. Se aparecer Gaasperplas ou Gein, é o sentido contrário."]
  },
  {
    id:3, code:"ROTA 03", title:"Amsterdam Centraal → Paris Gare du Nord",
    dateLabel:"04 DEZ", orderISO:"2026-12-04T11:10:00",
    country:"intl", modeIcon:"🚄", durationLabel:"~3h25 (11:10 → 14:35)",
    mapsQuery:"Gare du Nord, Paris",
    chain:[{place:"Amsterdam Centraal"},{mode:"🚄 Eurostar"},{place:"Paris Gare du Nord"}],
    legs:[
      { label:null, accent:"eurostar",
        ondeEstou:"Amsterdam Centraal, área Eurostar",
        oQuePegar:"Eurostar — trem que para em Paris Gare du Nord",
        direcao:"Direto, sem baldeação",
        paradas:"Não se aplica (trem internacional direto)",
        ondeDescer:"Paris Gare du Nord",
        saida:NC + " (plataforma de embarque)",
        caminhada:"Não se aplica",
        destino:"Paris Gare du Nord",
        duracao:"~3h25",
        ticket:"Já reservado — leve o bilhete/QR code e o passaporte",
        mala:"Standard/Plus: 2 peças de bagagem + 1 item de mão, sem limite de peso (desde que transportável)"
      }
    ],
    confirmedTime:{ tag:"Reserva confirmada", dep:"11:10", arr:"14:35", sub:"~3h25 de viagem" },
    checkinNote:"<b>Chegada recomendada: 09:40–09:55</b> (~75–90 min antes). Há controle de passaporte antes do embarque — confirme no e-mail/app da sua reserva se o tempo mínimo é este.",
    naoConfunda:["O horário certo é <b>11:10</b>, não meio-dia — foi o erro mais grave do manual antigo. Chegue com folga por causa do controle de passaporte."]
  },
  {
    id:4, code:"ROTA 04", title:"Gare du Nord → 12 Av. de l'Observatoire",
    dateLabel:"04 DEZ", orderISO:"2026-12-04T14:35:00",
    country:"fr", modeIcon:"🚈", durationLabel:"15–20 min",
    mapsQuery:"12 Avenue de l'Observatoire, Paris 75006",
    stayNotes:["🏨 <b>Check-in a partir das 16:00</b> (reserva Airbnb). O Eurostar chega às 14:35."],
    hostNote:HOST_NOTE,
    chain:[{place:"Paris Gare du Nord"},{mode:"🚈 RER B"},{place:"Port-Royal"},{mode:"🚶 3 min"},{place:"12 Av. de l'Observatoire"}],
    legs:[
      { label:null, accent:"fr",
        ondeEstou:"Paris Gare du Nord",
        oQuePegar:"RER B",
        direcao:"Sentido sul — <b>Robinson / Saint-Rémy-lès-Chevreuse / Massy-Palaiseau</b>",
        paradas:NC + " (número exato de paradas não verificado nesta auditoria)",
        ondeDescer:"<b>Port-Royal</b> (não Denfert-Rochereau)",
        saida:NC,
        caminhada:"<b>~181 m / ~3 min</b> (confirmado no Île-de-France Mobilités)",
        destino:"12 Avenue de l'Observatoire",
        duracao:"15–20 min de trem",
        ticket:"€2,55/pessoa — comprar em máquina ou app IDFM, validar na catraca",
        mala:"Compatível"
      }
    ],
    naoConfunda:[
      "❌ Não desça em <b>Denfert-Rochereau</b>. A estação certa é <b>Port-Royal</b>.",
      "Confirme sentido <b>sul</b> antes de embarcar.",
      "RER B tem obras só à noite (22h45+, dias úteis) — não afeta este trajeto de manhã."
    ]
  },
  {
    id:5, code:"ROTA 05", title:"12 Av. de l'Observatoire → Gare du Nord",
    dateLabel:"07 DEZ", orderISO:"2026-12-07T07:30:00",
    country:"fr", modeIcon:"🚈", durationLabel:"15–20 min",
    mapsQuery:"Gare du Nord, Paris",
    stayNotes:["🏨 <b>Checkout até 11:00</b> (reserva Airbnb). O Eurostar sai às 09:24."],
    hostNote:HOST_NOTE,
    chain:[{place:"12 Av. de l'Observatoire"},{mode:"🚶 3 min"},{place:"Port-Royal"},{mode:"🚈 RER B"},{place:"Paris Gare du Nord"}],
    legs:[
      { label:null, accent:"fr",
        ondeEstou:"12 Avenue de l'Observatoire",
        oQuePegar:"Caminhada até Port-Royal, depois RER B",
        direcao:"Sentido norte — <b>Mitry-Claye / Aéroport Charles de Gaulle</b>",
        paradas:NC + " (número exato de paradas não verificado nesta auditoria)",
        ondeDescer:"Paris Gare du Nord",
        saida:"Siga sinalização \"Eurostar\" dentro da estação",
        caminhada:"<b>~181 m / ~3 min</b> até Port-Royal (confirmado)",
        destino:"Paris Gare du Nord",
        duracao:"15–20 min de trem",
        ticket:"€2,55/pessoa — comprar em máquina ou app IDFM, validar na catraca",
        mala:"Compatível"
      }
    ],
    recNote:"🕗 <b>Saída recomendada do alojamento (estimativa própria, não oficial):</b> ~07:50–08:00, para chegar em Gare du Nord com folga antes do Eurostar das 09:24.",
    naoConfunda:["Embarque em Port-Royal sentido <b>norte</b> (Mitry-Claye / CDG) — o oposto da Rota 04."]
  },
  {
    id:6, code:"ROTA 06", title:"Paris Gare du Nord → Amsterdam Centraal",
    dateLabel:"07 DEZ", orderISO:"2026-12-07T09:24:00",
    country:"intl", modeIcon:"🚄", durationLabel:"~4h26 (09:24 → 13:50)",
    mapsQuery:"Amsterdam Centraal",
    chain:[{place:"Paris Gare du Nord"},{mode:"🚄 Eurostar"},{place:"Amsterdam Centraal"}],
    legs:[
      { label:null, accent:"eurostar",
        ondeEstou:"Paris Gare du Nord, área Eurostar",
        oQuePegar:"Eurostar — trem que para em Amsterdam Centraal",
        direcao:"Direto, sem baldeação",
        paradas:"Não se aplica (trem internacional direto)",
        ondeDescer:"Amsterdam Centraal",
        saida:NC + " (plataforma de embarque)",
        caminhada:"Não se aplica",
        destino:"Amsterdam Centraal",
        duracao:"~4h26",
        ticket:"Já reservado — leve o bilhete/QR code e o passaporte",
        mala:"Standard/Plus: 2 peças de bagagem + 1 item de mão, sem limite de peso (desde que transportável)"
      }
    ],
    confirmedTime:{ tag:"Reserva confirmada", dep:"09:24", arr:"13:50", sub:"~4h26 de viagem" },
    checkinNote:"<b>Chegada recomendada: 07:54–08:09</b> (~75–90 min antes). Há controle de passaporte antes do embarque — confirme no e-mail/app da sua reserva se o tempo mínimo é este.",
    naoConfunda:["Horário certo é <b>09:24 da manhã</b>, bem mais cedo que o meio-dia do manual antigo — programe a saída de Paris com antecedência."]
  },
  {
    id:7, code:"ROTA 07", title:"Amsterdam Centraal → Schiphol",
    dateLabel:"08 DEZ", orderISO:"2026-12-08T16:00:00",
    country:"nl", modeIcon:"✈️", durationLabel:"15–17 min",
    mapsQuery:"Schiphol Airport",
    chain:[{place:"Amsterdam Centraal"},{mode:"🚆 NS"},{place:"Schiphol Airport"}],
    legs:[
      { label:null, accent:"nl",
        ondeEstou:"Amsterdam Centraal",
        oQuePegar:"Trem NS (Sprinter)",
        direcao:"Trem que para em <b>Schiphol Airport</b> (direto)",
        paradas:["Amsterdam Sloterdijk","Amsterdam Lelylaan"],
        ondeDescer:"Schiphol Airport (estação dentro do aeroporto)",
        saida:"Siga sinalização do terminal / check-in",
        caminhada:"Não se aplica",
        destino:"Schiphol Airport — voo São Paulo 20:35",
        duracao:"15–17 min",
        ticket:"App NS, máquina ou OVpay — tarifa " + NC,
        mala:"Compatível"
      }
    ],
    recNote:"🕗 <b>Saída recomendada de Amsterdam Centraal (estimativa própria, não oficial):</b> ~17:15–17:45, para chegar ao Schiphol com ~2h30–3h de antecedência do voo. Ajuste conforme a política de check-in internacional da companhia.",
    naoConfunda:["Confirme no painel que o trem <b>PARA em Schiphol Airport</b>. O horário de saída acima é estimativa, não reserva — confira o trem real no app NS no dia."]
  }
];

/* STAYS: extraído por parsing dos cards de hospedagem do HTML original.
   checkinISO/checkoutISO são derivados dos próprios rótulos exibidos. */
const STAYS = [
  {
    id:"volkshotel",
    accent:"nl",
    kicker:"🇳🇱 Amsterdam · 02–04 dez",
    name:"Volkshotel Amsterdam",
    addr:"Wibautstraat 150 · Quarto XS",
    checkinLabel:"Qua 02/12 · a partir 16:00",
    checkoutLabel:"Sex 04/12 · até 12:00",
    checkinISO:"2026-12-02T16:00:00",
    checkoutISO:"2026-12-04T12:00:00",
    src:"Fonte: reserva Airbnb",
  },
  {
    id:"paris",
    accent:"fr",
    kicker:"🇫🇷 Paris · 04–07 dez",
    name:"Acomodação em Paris (anfitrião Walid)",
    addr:"12 Avenue de l'Observatoire, 75006",
    checkinLabel:"Sex 04/12 · 16:00",
    checkoutLabel:"Seg 07/12 · 11:00",
    checkinISO:"2026-12-04T16:00:00",
    checkoutISO:"2026-12-07T11:00:00",
    src:"Fonte: reserva Airbnb",
  },
];

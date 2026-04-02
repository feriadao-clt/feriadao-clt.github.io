const getDayAndMonth = date => {
  const day = date.getDate();
  const month = monthNames[date.getDay()];
  return `${day} de ${month}`;
};

const yyyymmdd = date => [date.getFullYear(), ('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2)].join("-");
const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const addDays = (date, days) => new Date(date.setDate(date.getDate() + days));
const getISODate = date => (new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000))).toISOString().split(".")[0];

// Algorithm for calculating "Easter Sunday" …
const getEasterSundayDate = year => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  
  return new Date(year, month, day);
};

// fe => Feriados Estaduais
const fe = (year, uf_sigla) => {
  let Feriados = [];
  
  // UF: ACRE
  Feriados.push({
    uf: { nome: "Acre", sigla: "AC" },
    evento: "Dia do Evangélico",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-01-23T00:00:00"
    // 23 de Janeiro
  }, {
    uf: { nome: "Acre", sigla: "AC" },
    evento: "Alusivo ao Dia Internacional da Mulher",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-03-08T00:00:00"
    // 8 de Março
  }, {
    uf: { nome: "Acre", sigla: "AC" },
    evento: "Aniversário do estado (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-06-15T00:00:00"
    // 15 de Junho
  }, {
    uf: { nome: "Acre", sigla: "AC" },
    evento: "Dia da Amazônia",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-09-05T00:00:00"
    // 5 de Setembro 
  }, {
    uf: { nome: "Acre", sigla: "AC" },
    evento: "Assinatura do Tratado de Petrópolis",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-11-17T00:00:00"
    // 17 de Novembro
  });
  
  // UF: ALAGOAS
  Feriados.push({
    uf: { nome: "Alagoas", sigla: "AL" },
    evento: "São João",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-06-24T00:00:00"
    // 24 de Junho 
  }, {
    uf: { nome: "Alagoas", sigla: "AL" },
    evento: "São Pedro",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-06-29T00:00:00"
    // 29 de Junho 
  }, {
    uf: { nome: "Alagoas", sigla: "AL" },
    evento: "Emancipação política (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-09-16T00:00:00"
    // 16 de Setembro 
  });
  
  // UF: AMAZONAS
  Feriados.push({
    uf: { nome: "Amazonas", sigla: "AM" },
    evento: "Elevação do Amazonas à categoria de província (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-09-05T00:00:00"
    // 5 de Setembro
  }, {
    uf: { nome: "Amazonas", sigla: "AM" },
    evento: "Nossa Senhora da Conceição",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-12-08T00:00:00"
    // 8 de Dezembro 
  });
  
  // UF: AMAPÁ
  Feriados.push({
    uf: { nome: "Amapá", sigla: "AP" },
    evento: "Dia de São José, santo padroeiro do Estado do Amapá",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-03-19T00:00:00"
    // 19 de Março 
  }, {
    uf: { nome: "Amapá", sigla: "AP" },
    evento: "Criação do Território Federal (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-09-13T00:00:00"
    // 13 de Setembro 
  });
  
  // UF: BAHIA
  Feriados.push({
    uf: { nome: "Bahia", sigla: "BA" },
    evento: "Independência da Bahia (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-07-02T00:00:00"
    // 2 de Julho 
  });
  
  // UF: CEARÁ
  Feriados.push({
    uf: { nome: "Ceará", sigla: "CE" },
    evento: "Dia de São José (Padroeiro do Ceará)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-03-19T00:00:00"
    // 19 de Março 
  }, {
    uf: { nome: "Ceará", sigla: "CE" },
    evento: "Data Magna do Ceará (Abolição da escravidão no Ceará)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-03-25T00:00:00"
    // 25 de Março 
  });
  
  // UF: Distrito Federal
  Feriados.push({
    uf: { nome: "Distrito Federal", sigla: "DF" },
    evento: "Dia do Evangélico",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-11-30T00:00:00"
    // 30 de Novembro
  });
  
  // UF: Espírito Santo
  Feriados.push({
    uf: { nome: "Espírito Santo", sigla: "ES" },
    evento: "Dia de Nossa Senhora da Penha, padroeira do estado (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: getISODate(addDays(getEasterSundayDate(year), 8))
    // 8 dias após o "Domingo de Páscoa"
  }, {
    uf: { nome: "Espírito Santo", sigla: "ES" },
    evento: "Dia da Colonização do Solo Espírito-Santense",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-05-23T00:00:00"
    // 23 de Maio
  }, {
    uf: { nome: "Espírito Santo", sigla: "ES" },
    evento: "Dia do Evangélico",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-11-30T00:00:00"
    // 30 de Novembro 
  });
  
  // UF: GOIÁS 
  Feriados.push({
    uf: { nome: "Goiás", sigla: "GO" },
    evento: "Dia da Nossa Senhora Auxiliadora (Padroeira de Goiânia)",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-05-24T00:00:00"
    // 24 de Maio
  }, {
    uf: { nome: "Goiás", sigla: "GO" },
    evento: "Fundação da cidade de Goiás - Dia da Nossa Senhora de Sant'Anna (Padroeira de Goiás)",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-07-26T00:00:00"
    // 26 de Julho
  }, {
    uf: { nome: "Goiás", sigla: "GO" },
    evento: "Pedra fundamental de Goiânia (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-10-24T00:00:00"
    // 24 de Outubro 
  }, {
    uf: { nome: "Goiás", sigla: "GO" },
    evento: "Dia do Servidor Público",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-10-28T00:00:00"
    // 28 de Outubro 
  });
  
  // UF: MARANHÃO 
  Feriados.push({
    uf: { nome: "Maranhão", sigla: "MA" },
    evento: "Adesão do Maranhão à independência do Brasil (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-07-28T00:00:00"
    // 28 de Julho
  });
  
  // UF: Mato Grosso do Sul 
  Feriados.push({
    uf: { nome: "Mato Grosso do Sul", sigla: "MS" },
    evento: "Criação do estado (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-10-11T00:00:00"
    // 11 de Outubro 
  });
  
  // UF: PARÁ 
  Feriados.push({
    uf: { nome: "Pará", sigla: "PA" },
    evento: "Adesão do Pará à independência do Brasil (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-08-15T00:00:00"
    // 15 de Agosto 
  });
  
  // UF: PARAÍBA 
  Feriados.push({
    uf: { nome: "Paraíba", sigla: "PB" },
    evento: "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-08-05T00:00:00"
    // 5 de Agosto
  });
  
  // UF: PERNAMBUCO 
  Feriados.push({
    uf: { nome: "Pernambuco", sigla: "PE" },
    evento: "Revolução Pernambucana de 1817 (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-03-06T00:00:00"
    // 6 de Março 
  }, {
    uf: { nome: "Pernambuco", sigla: "PE" },
    evento: "Festa de São João (Festa Junina)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-06-24T00:00:00"
    // 24 de Junho 
  });
  
  // UF: PIAUÍ 
  Feriados.push({
    uf: { nome: "Piauí", sigla: "PI" },
    evento: "Dia do Piauí",
    tipo: "Feriado  Estadual (Piauí)",
    datetime: "YYYY-10-19T00:00:00"
    // 19 de Outubro 
  });
  
  // UF: Rio de Janeiro 
  Feriados.push({
    uf: { nome: "Rio de Janeiro", sigla: "RJ" },
    evento: "Terça-feira de Carnaval",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: getISODate(addDays(getEasterSundayDate(year), -47))
    // 47 dias antes ao "Domingo de Páscoa"
  }, {
    uf: { nome: "Rio de Janeiro", sigla: "RJ" },
    evento: "Dia de São Jorge",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-04-23T00:00:00"
    // 23 de Abril
  }, {
    uf: { nome: "Rio de Janeiro", sigla: "RJ" },
    evento: "Dia do Comércio",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: (() => {
      // 3º segunda-feira do mês de Outubro 
      const date = new Date(year, 9, 1);
      
      while (true) {
        if (date.getDay() === 1) break;
        else date.setDate(date.getDate() + 1);
      }
      
      date.setDate(date.getDate() + 14);
      return getISODate(date);
    })()
  });
  
  // UF: Rio Grande do Norte
  Feriados.push({
    uf: { nome: "Rio Grande do Norte", sigla: "RN" },
    evento: "Dia do Rio Grande do Norte",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-08-07T00:00:00"
    // 7 de Agosto
  }, {
    uf: { nome: "Rio Grande do Norte", sigla: "RN" },
    evento: "Mártires de Cunhaú e Uruaçu (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-10-03T00:00:00"
    // 3 de Outubro
  });
  
  // UF: RONDÔNIA 
  Feriados.push({
    uf: { nome: "Rondônia", sigla: "RO" },
    evento: "Criação do estado (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-01-04T00:00:00"
    // 4 de Janeiro 
  }, {
    uf: { nome: "Rondônia", sigla: "RO" },
    evento: "Dia do Evangélico",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-06-18T00:00:00"
    // 18 de Junho 
  });
  
  // UF: RORAIMA 
  Feriados.push({
    uf: { nome: "Roraima", sigla: "RR" },
    evento: "Criação do estado (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-10-05T00:00:00"
    // 5 de Outubro 
  });
  
  // UF: Rio Grande do Sul
  Feriados.push({
    uf: { nome: "Rio Grande do Sul", sigla: "RS" },
    evento: "Dia do Gaúcho (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-09-20T00:00:00"
    // 20 de Setembro
  });
  
  // UF: Santa Catarina 
  Feriados.push({
    uf: { nome: "Santa Catarina", sigla: "SC" },
    evento: "Dia de Santa Catarina (criação da capitania, separando-se de São Paulo) (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-08-11T00:00:00"
    // 11 de Agosto 
  }, {
    uf: { nome: "Santa Catarina", sigla: "SC" },
    evento: "Dia de Santa Catarina de Alexandria",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-11-25T00:00:00"
    // 25 de Novembro 
  });
  
  // UF: São Paulo 
  Feriados.push({
    uf: { nome: "São Paulo", sigla: "SP" },
    evento: "Revolução Constitucionalista de 1932 (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-07-09T00:00:00"
    // 9 de Julho 
  });
  
  // UF: SERGIPE 
  Feriados.push({
    uf: { nome: "Sergipe", sigla: "SE" },
    evento: "Emancipação política de Sergipe (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-07-08T00:00:00"
    // 8 de Julho 
  });
  
  // UF: TOCANTINS 
  Feriados.push({
    uf: { nome: "Tocantins", sigla: "TO" },
    evento: "Autonomia do Estado (criação da Comarca do Norte)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-03-18T00:00:00"
    // 18 de Março 
  }, {
    uf: { nome: "Tocantins", sigla: "TO" },
    evento: "Padroeira do Estado (Nossa Senhora da Natividade)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-09-08T00:00:00"
    // 8 de Setembro 
  }, {
    uf: { nome: "Tocantins", sigla: "TO" },
    evento: "Criação do estado (Data Magna)",
    tipo: "estadual",
    observacao: "Feriado Estadual",
    datetime: "YYYY-10-05T00:00:00"
    // 5 de Outubro
  });
  
  uf_sigla = typeof uf_sigla === "string" && uf_sigla.toLocaleUpperCase().trim();
  
  if (!uf_sigla) return [];
  
  Feriados = Feriados.filter(feriado => feriado.uf.sigla === uf_sigla);
  
  return Feriados.forEach(feriado => feriado.datetime = feriado.datetime.replace("YYYY", year)), Feriados;
};

// ff => Feriados Fixos
const ff = year => {
  let Feriados = [];
  
  Feriados.push({
    // 1º de Janeiro …
    evento: "Confraternização Universal",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-01-01T00:00:00"
  });
  
  Feriados.push({
    // 8 de Março …
    evento: "Dia Internacional da Mulher",
    tipo: "comemorativa",
    observacao: "Data Comemorativa",
    datetime: "YYYY-03-08T00:00:00"
  });
  
  Feriados.push({
    // Véspera de 21 de Abril ("Tiradentes") …
    evento: "20 de Abril",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-04-20T00:00:00"
  });
  
  Feriados.push({
    // 21 de Abril …
    evento: "Tiradentes",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-04-21T00:00:00"
  });
  
  Feriados.push({
    // 1º de Maio …
    evento: "Dia Mundial do Trabalho",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-05-01T00:00:00"
  });
  
  Feriados.push({
    // 12 de Junho …
    evento: "Dia dos Namorados",
    tipo: "comemorativa",
    observacao: "Data Comemorativa",
    datetime: "YYYY-06-12T00:00:00"
  });
  
  Feriados.push({
    // 7 de Setembro …
    evento: "Independência do Brasil",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-09-07T00:00:00"
  });
  
  Feriados.push({
    // 12 de Outubro …
    evento: "Nossa Senhora Aparecida (Dia das Crianças)",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-10-12T00:00:00"
  });
  
  Feriados.push({
    // 15 de Outubro …
    evento: "Dia do Professor",
    tipo: "comemorativa",
    observacao: "Data Comemorativa",
    datetime: "YYYY-10-15T00:00:00"
  });
  
  Feriados.push({
    // 28 de Outubro …
    evento: "Dia do Servidor Público Federal",
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: "YYYY-10-28T00:00:00"
  });
  
  Feriados.push({
    // 2 de Novembro …
    evento: "Finados",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-11-02T00:00:00"
  });
  
  Feriados.push({
    // 15 de Novembro …
    evento: "Proclamação da República",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-11-15T00:00:00"
  });
  
  Feriados.push({
    // 20 de Novembro …
    evento: "Dia Nacional de Zumbi e da Consciência Negra",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-11-20T00:00:00"
  });
  
  Feriados.push({
    // 24 de Dezembro …
    evento: "Véspera de Natal",
    tipo: "facultativo",
    observacao: "Ponto Facultativo (a partir das 14 horas)",
    datetime: "YYYY-12-24T00:00:00"
  });
  
  Feriados.push({
    // 25 de Dezembro …
    evento: "Natal",
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: "YYYY-12-25T00:00:00"
  });
  
  Feriados.push({
    // 31 de Dezembro …
    evento: "Véspera de Ano Novo",
    tipo: "facultativo",
    observacao: "Ponto Facultativo (a partir das 14 horas)",
    datetime: "YYYY-12-31T00:00:00"
  });
  
  return Feriados.forEach(feriado => feriado.datetime = feriado.datetime.replace("YYYY", year)), Feriados;
};

// fm => Feriados Móveis
const fm = year => {
  let Feriados = [];
  
  Feriados.push({
    evento: "Segunda-feira de Carnaval",
    // 48 dias antes ao "Domingo de Páscoa" …
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: getISODate(addDays(getEasterSundayDate(year), -48))
  });
  
  Feriados.push({
    evento: "Terça-feira de Carnaval",
    // 47 dias antes ao "Domingo de Páscoa" …
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: getISODate(addDays(getEasterSundayDate(year), -47))
  });
  
  Feriados.push({
    evento: "Quarta-feira de Cinzas",
    // 46 dias antes ao "Domingo de Páscoa" …
    tipo: "facultativo",
    observacao: "Ponto Facultativo (até as 14 horas)",
    datetime: getISODate(addDays(getEasterSundayDate(year), -46))
  });
  
  Feriados.push({
    evento: "Paixão de Cristo (Sexta-feira Santa)",
    // 2 dias antes ao "Domingo de Páscoa" …
    tipo: "nacional",
    observacao: "Feriado Nacional",
    datetime: getISODate(addDays(getEasterSundayDate(year), -2))
  });
  
  Feriados.push({
    // getEasterSundayDate(year: number);
    // Algoritmo para calcular o "Domingo de Páscoa" …
    evento: "Domingo de Páscoa",
    tipo: "comemorativa",
    observacao: "Data Comemorativa",
    datetime: getISODate(getEasterSundayDate(year))
  });
  
  Feriados.push({
    evento: "Corpus Christi",
    // 60 dias após "Domingo de Páscoa" …
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: getISODate(addDays(getEasterSundayDate(year), 60))
  });
  
  Feriados.push({
    // Dia seguinte após "Corpus Christi" …
    tipo: "facultativo",
    observacao: "Ponto Facultativo",
    datetime: getISODate(addDays(getEasterSundayDate(year), 61)),
    evento: (() => {
      const date = addDays(getEasterSundayDate(year), 61);
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      return day + " de " + month;
    })(),
    
  });
  
  Feriados.push({
    // 2º domingo de Maio …
    evento: "Dia das Mães",
    tipo: "comemorativa",
    observacao: "Data Comemorativa",
    datetime: (() => {
      const may = new Date(year, 4, 1);
      const firstSunday = new Date(may.setDate(1 + ((7 - may.getDay()) % 7)));
      const secondSunday = new Date(
        firstSunday.setDate(firstSunday.getDate() + 7)
      );
      
      return getISODate(secondSunday);
    })()
  });
  
  Feriados.push({
    // 2º domingo de Agosto …
    evento: "Dia dos Pais",
    tipo: "comemorativa",
    observacao: "Data Comemorativa",
    datetime: (() => {
      const aug = new Date(year, 7, 1);
      const firstSunday = new Date(aug.setDate(1 + ((7 - aug.getDay()) % 7)));
      const secondSunday = new Date(
        firstSunday.setDate(firstSunday.getDate() + 7)
      );
      
      return getISODate(secondSunday);
    })()
  });
  
  return Feriados;
};

const yearParse = year => { if (!/^(19\d\d|2[01]\d\d)$/.test(year)) throw new Error('Ano fora do intervalo suportado: 1900 … 2199'); return true; };
const feriadosNacionais = async (year, uf_sigla) => yearParse(year) && ff(year).concat(fm(year).concat(fe(year, uf_sigla))).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

export default feriadosNacionais;
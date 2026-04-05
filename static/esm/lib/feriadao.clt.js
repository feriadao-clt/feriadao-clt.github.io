/**
 * @param {number} year - e.g., 2024
 * @param {number} month - 0-indexed (0 = Jan, 3 = Apr)
 * @param {number} nth - e.g., 2 for the second occurrence
 * @param {number} weekday - 0 (Sun) to 6 (Sat)
 */

const locale = navigator.language;
const helpers = {
  date() { return new Date(...arguments); },
  
  // Date helpers
  addDays(date, days) { return new Date(date.setDate(date.getDate() + days)); },
  
  // Date helpers
  yyyymmdd(date) { return [date.getFullYear(), ('0' + (date.getMonth() + 1)).slice(-2), ('0' + date.getDate()).slice(-2)].join("-"); },
  
  // Parser year
  yearParse(year) {
    const rgx = /^(19\d\d|2[01]\d\d)$/;
    return rgx.test(year) ? Number(year) : new Error('Ano fora do intervalo suportado: 1900 … 2199');
  },
  
  // Date helpers
  getISODate(date, only) {
    date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
    date = date.toISOString().split(".")[0];
    date = (only === true ? date.split("T") : [date])[0];
    
    return date;
  },
  
  // Date helpers
  dateWeekRange(year, month, weekday, times) {
    let i = 0;
    let self = helpers.date(year, month, 1);
    const date = helpers.date(self);
    
    while (date.getMonth() === month) {
      if (date.getDay() === weekday) self = helpers.date(date), i++;
      if (i === times) break;
      else date.setDate(date.getDate() + 1);
    }
    
    return self;
  },
  
  
  // Date helpers
  dayAndMonthFormat(date) {
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long"
    })
  },
  
  // Array.sort
  sortDateByAscending(array) { return array.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)); },
  
  // Algorithm for calculating "Easter Sunday" …
  getEasterSundayDate(year) {
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
  }
};

/**
 * @param {number} year - YYYY
 * @param {Array<string>} stateCodes - AC, AL, AP...
 * @returns {Promise<Array>}
 */
const holidays = async function(year, ...stateCodes) {
  const nationalHolidays = () => {
    const data = [];
    const fixedHolidays = (() => {
      data.push({
        // 1º de Janeiro …
        evento: "Confraternização Universal",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-01-01T00:00:00`
      });
      
      data.push({
        // 8 de Março …
        evento: "Dia Internacional da Mulher",
        tipo: "comemorativa",
        observacao: "Data Comemorativa",
        datetime: `${year}-03-08T00:00:00`
      });
      
      data.push({
        // Véspera de 21 de Abril ("Tiradentes") …
        evento: "20 de abril",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-04-20T00:00:00`
      });
      
      data.push({
        // 21 de Abril …
        evento: "Tiradentes",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-04-21T00:00:00`
      });
      
      data.push({
        // 1º de Maio …
        evento: "Dia Mundial do Trabalho",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-05-01T00:00:00`
      });
      
      data.push({
        // 12 de Junho …
        evento: "Dia dos Namorados",
        tipo: "comemorativa",
        observacao: "Data Comemorativa",
        datetime: `${year}-06-12T00:00:00`
      });
      
      data.push({
        // 7 de Setembro …
        evento: "Independência do Brasil",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-09-07T00:00:00`
      });
      
      data.push({
        // 12 de Outubro …
        evento: "Nossa Senhora Aparecida (Dia das Crianças)",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-10-12T00:00:00`
      });
      
      data.push({
        // 15 de Outubro …
        evento: "Dia do Professor",
        tipo: "comemorativa",
        observacao: "Data Comemorativa",
        datetime: `${year}-10-15T00:00:00`
      });
      
      data.push({
        // 28 de Outubro …
        evento: "Dia do Servidor Público Federal",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-10-28T00:00:00`
      });
      
      data.push({
        // 2 de Novembro …
        evento: "Finados",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-11-02T00:00:00`
      });
      
      data.push({
        // 15 de Novembro …
        evento: "Proclamação da República",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-11-15T00:00:00`
      });
      
      data.push({
        // 20 de Novembro …
        evento: "Dia Nacional de Zumbi e da Consciência Negra",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-11-20T00:00:00`
      });
      
      data.push({
        // 24 de Dezembro …
        evento: "Véspera de Natal",
        tipo: "facultativo",
        observacao: "Ponto Facultativo (a partir das 14 horas)",
        datetime: `${year}-12-24T00:00:00`
      });
      
      data.push({
        // 25 de Dezembro …
        evento: "Natal",
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: `${year}-12-25T00:00:00`
      });
      
      data.push({
        // 31 de Dezembro …
        evento: "Véspera de Ano Novo",
        tipo: "facultativo",
        observacao: "Ponto Facultativo (a partir das 14 horas)",
        datetime: `${year}-12-31T00:00:00`
      });
    })();
    
    const movableHolidays = (() => {
      data.push({
        evento: "Segunda-feira de Carnaval",
        // 48 dias antes ao "Domingo de Páscoa" …
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), -48))
      });
      
      data.push({
        evento: "Terça-feira de Carnaval",
        // 47 dias antes ao "Domingo de Páscoa" …
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), -47))
      });
      
      data.push({
        evento: "Quarta-feira de Cinzas",
        // 46 dias antes ao "Domingo de Páscoa" …
        tipo: "facultativo",
        observacao: "Ponto Facultativo (até as 14 horas)",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), -46))
      });
      
      data.push({
        evento: "Paixão de Cristo (Sexta-feira Santa)",
        // 2 dias antes ao "Domingo de Páscoa" …
        tipo: "nacional",
        observacao: "Feriado Nacional",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), -2))
      });
      
      data.push({
        // getEasterSundayDate(year: number);
        // Algoritmo para calcular o "Domingo de Páscoa" …
        evento: "Domingo de Páscoa",
        tipo: "comemorativa",
        observacao: "Data Comemorativa",
        datetime: helpers.getISODate(helpers.getEasterSundayDate(year))
      });
      
      data.push({
        evento: "Corpus Christi",
        // 60 dias após "Domingo de Páscoa" …
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), 60))
      });
      
      data.push({
        // Dia seguinte após "Corpus Christi" …
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), 61)),
        evento: helpers.dayAndMonthFormat(helpers.addDays(helpers.getEasterSundayDate(year), 61)),
      });
      
      data.push({
        // 2º domingo de Maio …
        evento: "Dia das Mães",
        tipo: "comemorativa",
        observacao: "Data Comemorativa",
        datetime: helpers.getISODate(helpers.dateWeekRange(year, 4, 0, 2))
      });
      
      data.push({
        // 2º domingo de Agosto …
        evento: "Dia dos Pais",
        tipo: "comemorativa",
        observacao: "Data Comemorativa",
        datetime: helpers.getISODate(helpers.dateWeekRange(year, 7, 0, 2))
      });
    })();
    
    return data;
  };
  
  const stateHolidays = () => {
    const data = [];
    const fixedHolidays = (() => {
      // UF: ACRE
      data.push({
        uf: { nome: "Acre", sigla: "AC" },
        evento: "Dia do Evangélico",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-01-23T00:00:00`
        // 23 de Janeiro
      }, {
        uf: { nome: "Acre", sigla: "AC" },
        evento: "Alusivo ao Dia Internacional da Mulher",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-03-08T00:00:00`
        // 8 de Março
      }, {
        uf: { nome: "Acre", sigla: "AC" },
        evento: "Aniversário do estado (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-06-15T00:00:00`
        // 15 de Junho
      }, {
        uf: { nome: "Acre", sigla: "AC" },
        evento: "Dia da Amazônia",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-09-05T00:00:00`
        // 5 de Setembro 
      }, {
        uf: { nome: "Acre", sigla: "AC" },
        evento: "Assinatura do Tratado de Petrópolis",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-11-17T00:00:00`
        // 17 de Novembro
      });
      
      // UF: ALAGOAS
      data.push({
        uf: { nome: "Alagoas", sigla: "AL" },
        evento: "São João",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-06-24T00:00:00`
        // 24 de Junho 
      }, {
        uf: { nome: "Alagoas", sigla: "AL" },
        evento: "São Pedro",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-06-29T00:00:00`
        // 29 de Junho 
      }, {
        uf: { nome: "Alagoas", sigla: "AL" },
        evento: "Emancipação política (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-09-16T00:00:00`
        // 16 de Setembro 
      });
      
      // UF: AMAZONAS
      data.push({
        uf: { nome: "Amazonas", sigla: "AM" },
        evento: "Elevação do Amazonas à categoria de província (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-09-05T00:00:00`
        // 5 de Setembro
      }, {
        uf: { nome: "Amazonas", sigla: "AM" },
        evento: "Nossa Senhora da Conceição",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-12-08T00:00:00`
        // 8 de Dezembro 
      });
      
      // UF: AMAPÁ
      data.push({
        uf: { nome: "Amapá", sigla: "AP" },
        evento: "Dia de São José, santo padroeiro do Estado do Amapá",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-03-19T00:00:00`
        // 19 de Março 
      }, {
        uf: { nome: "Amapá", sigla: "AP" },
        evento: "Criação do Território Federal (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-09-13T00:00:00`
        // 13 de Setembro 
      });
      
      // UF: BAHIA
      data.push({
        uf: { nome: "Bahia", sigla: "BA" },
        evento: "Independência da Bahia (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-07-02T00:00:00`
        // 2 de Julho 
      });
      
      // UF: CEARÁ
      data.push({
        uf: { nome: "Ceará", sigla: "CE" },
        evento: "Dia de São José (Padroeiro do Ceará)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-03-19T00:00:00`
        // 19 de Março 
      }, {
        uf: { nome: "Ceará", sigla: "CE" },
        evento: "Data Magna do Ceará (Abolição da escravidão no Ceará)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-03-25T00:00:00`
        // 25 de Março 
      });
      
      // UF: Distrito Federal
      data.push({
        uf: { nome: "Distrito Federal", sigla: "DF" },
        evento: "Dia do Evangélico",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-11-30T00:00:00`
        // 30 de Novembro
      });
      
      data.push({
        uf: { nome: "Espírito Santo", sigla: "ES" },
        evento: "Dia da Colonização do Solo Espírito-Santense",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-05-23T00:00:00`
        // 23 de Maio
      }, {
        uf: { nome: "Espírito Santo", sigla: "ES" },
        evento: "Dia do Evangélico",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-11-30T00:00:00`
        // 30 de Novembro 
      });
      
      // UF: GOIÁS 
      data.push({
        uf: { nome: "Goiás", sigla: "GO" },
        evento: "Dia da Nossa Senhora Auxiliadora (Padroeira de Goiânia)",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-05-24T00:00:00`
        // 24 de Maio
      }, {
        uf: { nome: "Goiás", sigla: "GO" },
        evento: "Fundação da cidade de Goiás - Dia da Nossa Senhora de Sant'Anna (Padroeira de Goiás)",
        tipo: "facultativo",
        observacao: "Ponto Facultativo",
        datetime: `${year}-07-26T00:00:00`
        // 26 de Julho
      }, {
        uf: { nome: "Goiás", sigla: "GO" },
        evento: "Pedra fundamental de Goiânia (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-10-24T00:00:00`
        // 24 de Outubro 
      }, {
        uf: { nome: "Goiás", sigla: "GO" },
        evento: "Dia do Servidor Público",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-10-28T00:00:00`
        // 28 de Outubro 
      });
      
      // UF: MARANHÃO 
      data.push({
        uf: { nome: "Maranhão", sigla: "MA" },
        evento: "Adesão do Maranhão à independência do Brasil (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-07-28T00:00:00`
        // 28 de Julho
      });
      
      // UF: Mato Grosso do Sul 
      data.push({
        uf: { nome: "Mato Grosso do Sul", sigla: "MS" },
        evento: "Criação do estado (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-10-11T00:00:00`
        // 11 de Outubro 
      });
      
      // UF: PARÁ 
      data.push({
        uf: { nome: "Pará", sigla: "PA" },
        evento: "Adesão do Pará à independência do Brasil (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-08-15T00:00:00`
        // 15 de Agosto 
      });
      
      // UF: PARAÍBA 
      data.push({
        uf: { nome: "Paraíba", sigla: "PB" },
        evento: "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-08-05T00:00:00`
        // 5 de Agosto
      });
      
      // UF: PERNAMBUCO 
      data.push({
        uf: { nome: "Pernambuco", sigla: "PE" },
        evento: "Revolução Pernambucana de 1817 (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-03-06T00:00:00`
        // 6 de Março 
      }, {
        uf: { nome: "Pernambuco", sigla: "PE" },
        evento: "Festa de São João (Festa Junina)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-06-24T00:00:00`
        // 24 de Junho 
      });
      
      // UF: PIAUÍ 
      data.push({
        uf: { nome: "Piauí", sigla: "PI" },
        evento: "Dia do Piauí",
        tipo: "estadual",
        observacao: "Feriado  Estadual",
        datetime: `${year}-10-19T00:00:00`
        // 19 de Outubro 
      });
      
      // UF: Rio de Janeiro 
      data.push({
        uf: { nome: "Rio de Janeiro", sigla: "RJ" },
        evento: "Dia de São Jorge",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-04-23T00:00:00`
        // 23 de Abril
      });
      
      // UF: Rio Grande do Norte
      data.push({
        uf: { nome: "Rio Grande do Norte", sigla: "RN" },
        evento: "Dia do Rio Grande do Norte",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-08-07T00:00:00`
        // 7 de Agosto
      }, {
        uf: { nome: "Rio Grande do Norte", sigla: "RN" },
        evento: "Mártires de Cunhaú e Uruaçu (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-10-03T00:00:00`
        // 3 de Outubro
      });
      
      // UF: RONDÔNIA 
      data.push({
        uf: { nome: "Rondônia", sigla: "RO" },
        evento: "Criação do estado (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-01-04T00:00:00`
        // 4 de Janeiro 
      }, {
        uf: { nome: "Rondônia", sigla: "RO" },
        evento: "Dia do Evangélico",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-06-18T00:00:00`
        // 18 de Junho 
      });
      
      // UF: RORAIMA 
      data.push({
        uf: { nome: "Roraima", sigla: "RR" },
        evento: "Criação do estado (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-10-05T00:00:00`
        // 5 de Outubro 
      });
      
      // UF: Rio Grande do Sul
      data.push({
        uf: { nome: "Rio Grande do Sul", sigla: "RS" },
        evento: "Dia do Gaúcho (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-09-20T00:00:00`
        // 20 de Setembro
      });
      
      // UF: Santa Catarina 
      data.push({
        uf: { nome: "Santa Catarina", sigla: "SC" },
        evento: "Dia de Santa Catarina (criação da capitania, separando-se de São Paulo) (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-08-11T00:00:00`
        // 11 de Agosto 
      }, {
        uf: { nome: "Santa Catarina", sigla: "SC" },
        evento: "Dia de Santa Catarina de Alexandria",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-11-25T00:00:00`
        // 25 de Novembro 
      });
      
      // UF: São Paulo 
      data.push({
        uf: { nome: "São Paulo", sigla: "SP" },
        evento: "Revolução Constitucionalista de 1932 (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-07-09T00:00:00`
        // 9 de Julho 
      });
      
      // UF: SERGIPE 
      data.push({
        uf: { nome: "Sergipe", sigla: "SE" },
        evento: "Emancipação política de Sergipe (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-07-08T00:00:00`
        // 8 de Julho 
      });
      
      // UF: TOCANTINS 
      data.push({
        uf: { nome: "Tocantins", sigla: "TO" },
        evento: "Autonomia do Estado (criação da Comarca do Norte)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-03-18T00:00:00`
        // 18 de Março 
      }, {
        uf: { nome: "Tocantins", sigla: "TO" },
        evento: "Padroeira do Estado (Nossa Senhora da Natividade)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-09-08T00:00:00`
        // 8 de Setembro 
      }, {
        uf: { nome: "Tocantins", sigla: "TO" },
        evento: "Criação do estado (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: `${year}-10-05T00:00:00`
        // 5 de Outubro
      });
    })();
    
    const movableHolidays = (() => {
      // UF: Espírito Santo
      data.push({
        uf: { nome: "Espírito Santo", sigla: "ES" },
        evento: "Dia de Nossa Senhora da Penha, padroeira do estado (Data Magna)",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), 8))
        // 8 dias após o "Domingo de Páscoa"
      });
      
      // UF: Rio de Janeiro 
      data.push({
        uf: { nome: "Rio de Janeiro", sigla: "RJ" },
        evento: "Terça-feira de Carnaval",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        datetime: helpers.getISODate(helpers.addDays(helpers.getEasterSundayDate(year), -47))
        // 47 dias antes ao "Domingo de Páscoa"
      });
      
      // UF: Rio de Janeiro 
      data.push({
        uf: { nome: "Rio de Janeiro", sigla: "RJ" },
        evento: "Dia do Comércio",
        tipo: "estadual",
        observacao: "Feriado Estadual",
        // 3º segunda-feira do mês de Outubro 
        datetime: helpers.getISODate(helpers.dateWeekRange(year, 9, 1, 3))
      });
    })();
    
    return data;
  };
  
  year = helpers.yearParse(arguments.length ? year : helpers.date().getFullYear());
  
  if (year instanceof Error) throw year;
  if (stateCodes[0] === true) return helpers.sortDateByAscending(nationalHolidays().concat(stateHolidays()));
  
  stateCodes.forEach((stateCode, i) => {
    stateCode = /^[a-z]{2}$/i.test(stateCode) && stateCode.toUpperCase().trim() || null;
    stateCode ? stateCodes[i] = stateCode : stateCodes.splice(i, 1);
  });
  
  return helpers.sortDateByAscending(nationalHolidays().concat(
    stateCodes.length ? stateHolidays().filter(holiday => stateCodes.includes(holiday.uf.sigla)) : []
  ));
}

export default holidays.bind(null);
(function(global) {
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
  const fe = (year, uf) => {
    let Feriados = [];
    
    // UF: ACRE
    Feriados.push({
      uf: "AC",
      name: "Dia do Evangélico",
      type: "Feriado Estadual (Acre)",
      datetime: "YYYY-01-23T00:00:00"
      // 23 de Janeiro
    }, {
      uf: "AC",
      name: "Alusivo ao Dia Internacional da Mulher",
      type: "Feriado Estadual (Acre)",
      datetime: "YYYY-03-08T00:00:00"
      // 8 de Março
    }, {
      uf: "AC",
      name: "Aniversário do estado (Data Magna)",
      type: "Feriado Estadual (Acre)",
      datetime: "YYYY-06-15T00:00:00"
      // 15 de Junho
    }, {
      uf: "AC",
      name: "Dia da Amazônia",
      type: "Feriado Estadual (Acre)",
      datetime: "YYYY-09-05T00:00:00"
      // 5 de Setembro 
    }, {
      uf: "AC",
      name: "Assinatura do Tratado de Petrópolis",
      type: "Ponto Facultativo (Acre)",
      datetime: "YYYY-11-17T00:00:00"
      // 17 de Novembro
    });
    
    // UF: ALAGOAS
    Feriados.push({
      uf: "AL",
      name: "São João",
      type: "Feriado Estadual (Alagoas)",
      datetime: "YYYY-06-24T00:00:00"
      // 24 de Junho 
    }, {
      uf: "AL",
      name: "São Pedro",
      type: "Feriado Estadual (Alagoas)",
      datetime: "YYYY-06-29T00:00:00"
      // 29 de Junho 
    }, {
      uf: "AL",
      name: "Emancipação política (Data Magna)",
      type: "Feriado Estadual (Alagoas)",
      datetime: "YYYY-09-16T00:00:00"
      // 16 de Setembro 
    });
    
    // UF: AMAZONAS
    Feriados.push({
      uf: "AM",
      name: "Elevação do Amazonas à categoria de província (Data Magna)",
      type: "Feriado Estadual (Amazonas)",
      datetime: "YYYY-09-05T00:00:00"
      // 5 de Setembro
    }, {
      uf: "AM",
      name: "Nossa Senhora da Conceição",
      type: "Feriado Estadual (Amazonas)",
      datetime: "YYYY-12-08T00:00:00"
      // 8 de Dezembro 
    });
    
    // UF: AMAPÁ
    Feriados.push({
      uf: "AP",
      name: "Dia de São José, santo padroeiro do Estado do Amapá",
      type: "Feriado Estadual (Amapá)",
      datetime: "YYYY-03-19T00:00:00"
      // 19 de Março 
    }, {
      uf: "AP",
      name: "Criação do Território Federal (Data Magna)",
      type: "Feriado Estadual (Amapá)",
      datetime: "YYYY-09-13T00:00:00"
      // 13 de Setembro 
    });
    
    // UF: BAHIA
    Feriados.push({
      uf: "BA",
      name: "Independência da Bahia (Data Magna)",
      type: "Feriado Estadual (Bahia)",
      datetime: "YYYY-07-02T00:00:00"
      // 2 de Julho 
    });
    
    // UF: CEARÁ
    Feriados.push({
      uf: "CE",
      name: "Dia de São José (Padroeiro do Ceará)",
      type: "Feriado Estadual (Ceará)",
      datetime: "YYYY-03-19T00:00:00"
      // 19 de Março 
    }, {
      uf: "CE",
      name: "Data Magna do Ceará (Abolição da escravidão no Ceará)",
      type: "Feriado Estadual (Ceará)",
      datetime: "YYYY-03-25T00:00:00"
      // 25 de Março 
    });
    
    // UF: Distrito Federal
    Feriados.push({
      uf: "DF",
      name: "Dia do Evangélico",
      type: "Feriado Estadual (Distrito Federal)",
      datetime: "YYYY-11-30T00:00:00"
      // 30 de Novembro
    });
    
    // UF: Espírito Santo
    Feriados.push({
      uf: "ES",
      name: "Dia de Nossa Senhora da Penha, padroeira do estado (Data Magna)",
      type: "Feriado Estadual (Espírito Santo)",
      datetime: getISODate(addDays(getEasterSundayDate(year), 8))
      // 8 dias após o "Domingo de Páscoa"
    }, {
      uf: "ES",
      name: "Dia da Colonização do Solo Espírito-Santense",
      type: "Ponto facultativo (Espírito Santo)",
      datetime: "YYYY-05-23T00:00:00"
      // 23 de Maio
    }, {
      uf: "ES",
      name: "Dia do Evangélico",
      type: "Ponto facultativo (Espírito Santo)",
      datetime: "YYYY-11-30T00:00:00"
      // 30 de Novembro 
    });
    
    // UF: GOIÁS 
    Feriados.push({
      uf: "GO",
      name: "Dia da Nossa Senhora Auxiliadora (Padroeira de Goiânia)",
      type: "Ponto facultativo (Goiás)",
      datetime: "YYYY-05-24T00:00:00"
      // 24 de Maio
    }, {
      uf: "GO",
      name: "Fundação da cidade de Goiás - Dia da Nossa Senhora de Sant'Anna (Padroeira de Goiás)",
      type: "Ponto facultativo (Goiás)",
      datetime: "YYYY-07-26T00:00:00"
      // 26 de Julho
    }, {
      uf: "GO",
      name: "Pedra fundamental de Goiânia (Data Magna)",
      type: "Feriado Estadual (Goiás)",
      datetime: "YYYY-10-24T00:00:00"
      // 24 de Outubro 
    }, {
      uf: "GO",
      name: "Dia do Servidor Público",
      type: "Feriado Estadual (Goiás)",
      datetime: "YYYY-10-28T00:00:00"
      // 28 de Outubro 
    });
    
    // UF: MARANHÃO 
    Feriados.push({
      uf: "MA",
      name: "Adesão do Maranhão à independência do Brasil (Data Magna)",
      type: "Feriado Estadual (Maranhão)",
      datetime: "YYYY-07-28T00:00:00"
      // 28 de Julho
    });
    
    // UF: Mato Grosso do Sul 
    Feriados.push({
      uf: "MS",
      name: "Criação do estado (Data Magna)",
      type: "Feriado Estadual (Mato Grosso do Sul)",
      datetime: "YYYY-10-11T00:00:00"
      // 11 de Outubro 
    });
    
    // UF: PARÁ 
    Feriados.push({
      uf: "PA",
      name: "Adesão do Pará à independência do Brasil (Data Magna)",
      type: "Feriado Estadual (Pará)",
      datetime: "YYYY-08-15T00:00:00"
      // 15 de Agosto 
    });
    
    // UF: PARAÍBA 
    Feriados.push({
      uf: "PB",
      name: "Fundação do Estado em 1585 e dia da sua padroeira, Nossa Senhora das Neves (Data Magna)",
      type: "Feriado Estadual (Paraíba)",
      datetime: "YYYY-08-05T00:00:00"
      // 5 de Agosto
    });
    
    // UF: PERNAMBUCO 
    Feriados.push({
      uf: "PE",
      name: "Revolução Pernambucana de 1817 (Data Magna)",
      type: "Feriado Estadual (Pernambuco)",
      datetime: "YYYY-03-06T00:00:00"
      // 6 de Março 
    }, {
      uf: "PE",
      name: "Festa de São João (Festa Junina)",
      type: "Feriado Estadual (Pernambuco)",
      datetime: "YYYY-06-24T00:00:00"
      // 24 de Junho 
    });
    
    // UF: PIAUÍ 
    Feriados.push({
      uf: "PI",
      name: "Dia do Piauí",
      type: "Feriado  Estadual (Piauí)",
      datetime: "YYYY-10-19T00:00:00"
      // 19 de Outubro 
    });
    
    // UF: Rio de Janeiro 
    Feriados.push({
      uf: "RJ",
      name: "Terça-feira de Carnaval",
      type: "Feriado Estadual (Rio de Janeiro)",
      datetime: getISODate(addDays(getEasterSundayDate(year), -47))
      // 47 dias antes ao "Domingo de Páscoa"
    }, {
      uf: "RJ",
      name: "Dia de São Jorge",
      type: "Feriado Estadual (Rio de Janeiro)",
      datetime: "YYYY-04-23T00:00:00"
      // 23 de Abril
    }, {
      uf: "RJ",
      name: "Dia do Comércio",
      type: "Feriado Estadual (Rio de Janeiro)",
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
      uf: "RN",
      name: "Dia do Rio Grande do Norte",
      type: "Feriado Estadual (Rio Grande do Norte)",
      datetime: "YYYY-08-07T00:00:00"
      // 7 de Agosto
    }, {
      uf: "RN",
      name: "Mártires de Cunhaú e Uruaçu (Data Magna)",
      type: "Feriado Estadual (Rio Grande do Norte)",
      datetime: "YYYY-10-03T00:00:00"
      // 3 de Outubro
    });
    
    // UF: RONDÔNIA 
    Feriados.push({
      uf: "RO",
      name: "Criação do estado (Data Magna)",
      type: "Feriado Estadual (Rondônia)",
      datetime: "YYYY-01-04T00:00:00"
      // 4 de Janeiro 
    }, {
      uf: "RO",
      name: "Dia do Evangélico",
      type: "Feriado Estadual (Rondônia)",
      datetime: "YYYY-06-18T00:00:00"
      // 18 de Junho 
    });
    
    // UF: RORAIMA 
    Feriados.push({
      uf: "RR",
      name: "Criação do estado (Data Magna)",
      type: "Feriado Estadual (Roraima)",
      datetime: "YYYY-10-05T00:00:00"
      // 5 de Outubro 
    });
    
    // UF: Rio Grande do Sul
    Feriados.push({
      uf: "RS",
      name: "Dia do Gaúcho (Data Magna)",
      type: "Feriado Estadual (Rio Grande do Sul)",
      datetime: "YYYY-09-20T00:00:00"
      // 20 de Setembro
    });
    
    // UF: Santa Catarina 
    Feriados.push({
      uf: "SC",
      name: "Dia de Santa Catarina (criação da capitania, separando-se de São Paulo) (Data Magna)",
      type: "Feriado Estadual (Santa Catarina)",
      datetime: "YYYY-08-11T00:00:00"
      // 11 de Agosto 
    }, {
      uf: "SC",
      name: "Dia de Santa Catarina de Alexandria",
      type: "Feriado Estadual (Santa Catarina)",
      datetime: "YYYY-11-25T00:00:00"
      // 25 de Novembro 
    });
    
    // UF: São Paulo 
    Feriados.push({
      uf: "SP",
      name: "Revolução Constitucionalista de 1932 (Data Magna)",
      type: "Feriado Estadual (SãoPaulo)",
      datetime: "YYYY-07-09T00:00:00"
      // 9 de Julho 
    });
    
    // UF: SERGIPE 
    Feriados.push({
      uf: "SE",
      name: "Emancipação política de Sergipe (Data Magna)",
      type: "Feriado Estadual (Sergipe)",
      datetime: "YYYY-07-08T00:00:00"
      // 8 de Julho 
    });
    
    // UF: TOCANTINS 
    Feriados.push({
      uf: "TO",
      name: "Autonomia do Estado (criação da Comarca do Norte)",
      type: "Feriado Estadual (Tocantins)",
      datetime: "YYYY-03-18T00:00:00"
      // 18 de Março 
    }, {
      uf: "TO",
      name: "Padroeira do Estado (Nossa Senhora da Natividade)",
      type: "Feriado Estadual (Tocantins)",
      datetime: "YYYY-09-08T00:00:00"
      // 8 de Setembro 
    }, {
      uf: "TO",
      name: "Criação do estado (Data Magna)",
      type: "Feriado Estadual (Tocantins)",
      datetime: "YYYY-10-05T00:00:00"
      // 5 de Outubro
    });
    
    Feriados = Feriados.filter(feriado => feriado.uf === uf);
    return Feriados.forEach(feriado => feriado.datetime = feriado.datetime.replace("YYYY", year)), Feriados;
  };
  
  // ff => Feriados Fixos
  const ff = year => {
    let Feriados = [];
    
    Feriados.push({
      // 1º de Janeiro …
      name: "Confraternização Universal",
      type: "Feriado Nacional",
      datetime: "YYYY-01-01T00:00:00"
    });
    
    Feriados.push({
      // 8 de Março …
      name: "Dia Internacional da Mulher",
      type: "Data Comemorativa",
      datetime: "YYYY-03-08T00:00:00"
    });
    
    Feriados.push({
      // Véspera de 21 de Abril ("Tiradentes") …
      name: "20 de Abril",
      type: "Ponto Facultativo",
      datetime: "YYYY-04-20T00:00:00"
    });
    
    Feriados.push({
      // 21 de Abril …
      name: "Tiradentes",
      type: "Feriado Nacional",
      datetime: "YYYY-04-21T00:00:00"
    });
    
    Feriados.push({
      // 1º de Maio …
      name: "Dia Mundial do Trabalho",
      type: "Feriado Nacional",
      datetime: "YYYY-05-01T00:00:00"
    });
    
    Feriados.push({
      // 12 de Junho …
      name: "Dia dos Namorados",
      type: "Data Comemorativa",
      datetime: "YYYY-06-12T00:00:00"
    });
    
    Feriados.push({
      // 7 de Setembro …
      name: "Independência do Brasil",
      type: "Feriado Nacional",
      datetime: "YYYY-09-07T00:00:00"
    });
    
    Feriados.push({
      // 12 de Outubro …
      name: "Nossa Senhora Aparecida (Dia das Crianças)",
      type: "Feriado Nacional",
      datetime: "YYYY-10-12T00:00:00"
    });
    
    Feriados.push({
      // 15 de Outubro …
      name: "Dia do Professor",
      type: "Data Comemorativa",
      datetime: "YYYY-10-15T00:00:00"
    });
    
    Feriados.push({
      // 28 de Outubro …
      name: "Dia do Servidor Público Federal",
      type: "Ponto Facultativo",
      datetime: "YYYY-10-28T00:00:00"
    });
    
    Feriados.push({
      // 2 de Novembro …
      name: "Finados",
      type: "Feriado Nacional",
      datetime: "YYYY-11-02T00:00:00"
    });
    
    Feriados.push({
      // 15 de Novembro …
      name: "Proclamação da República",
      type: "Feriado Nacional",
      datetime: "YYYY-11-15T00:00:00"
    });
    
    Feriados.push({
      // 20 de Novembro …
      name: "Dia Nacional de Zumbi e da Consciência Negra",
      type: "Feriado Nacional",
      datetime: "YYYY-11-20T00:00:00"
    });
    
    Feriados.push({
      // 24 de Dezembro …
      name: "Véspera de Natal",
      type: "Ponto facultativo após as 13 horas",
      datetime: "YYYY-12-24T00:00:00"
    });
    
    Feriados.push({
      // 25 de Dezembro …
      name: "Natal",
      type: "Feriado Nacional",
      datetime: "YYYY-12-25T00:00:00"
    });
    
    Feriados.push({
      // 31 de Dezembro …
      name: "Véspera de Ano Novo",
      type: "Ponto facultativo após as 13 horas",
      datetime: "YYYY-12-31T00:00:00"
    });
    
    return Feriados.forEach(feriado => feriado.datetime = feriado.datetime.replace("YYYY", year)), Feriados;
  };
  
  // fm => Feriados Móveis
  const fm = year => {
    let Feriados = [];
    
    Feriados.push({
      name: "Segunda-feira de Carnaval",
      // 48 dias antes ao "Domingo de Páscoa" …
      type: "Ponto Facultativo",
      datetime: getISODate(addDays(getEasterSundayDate(year), -48))
    });
    
    Feriados.push({
      name: "Terça-feira de Carnaval",
      // 47 dias antes ao "Domingo de Páscoa" …
      type: "Ponto Facultativo",
      datetime: getISODate(addDays(getEasterSundayDate(year), -47))
    });
    
    Feriados.push({
      name: "Quarta-feira de Cinzas",
      // 46 dias antes ao "Domingo de Páscoa" …
      type: "Ponto facultativo até as 14 horas",
      datetime: getISODate(addDays(getEasterSundayDate(year), -46))
    });
    
    Feriados.push({
      name: "Paixão de Cristo (Sexta-feira Santa)",
      // 2 dias antes ao "Domingo de Páscoa" …
      type: "Feriado Nacional",
      datetime: getISODate(addDays(getEasterSundayDate(year), -2))
    });
    
    Feriados.push({
      // getEasterSundayDate(year: number);
      // Algoritmo para calcular o "Domingo de Páscoa" …
      name: "Domingo de Páscoa",
      type: "Data Comemorativa",
      datetime: getISODate(getEasterSundayDate(year))
    });
    
    Feriados.push({
      name: "Corpus Christi",
      // 60 dias após "Domingo de Páscoa" …
      type: "Ponto Facultativo",
      datetime: getISODate(addDays(getEasterSundayDate(year), 60))
    });
    
    Feriados.push({
      // Dia seguinte após "Corpus Christi" …
      type: "Ponto Facultativo",
      datetime: getISODate(addDays(getEasterSundayDate(year), 61)),
      name: (() => {
        const date = addDays(getEasterSundayDate(year), 61);
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        return day + " de " + month;
      })(),
      
    });
    
    Feriados.push({
      // 2º domingo de Maio …
      name: "Dia das Mães",
      type: "Data Comemorativa",
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
      name: "Dia dos Pais",
      type: "Data Comemorativa",
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
  const feriadosNacionais = async (year, uf) => yearParse(year) && ff(year).concat(fm(year).concat(fe(year, uf))).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  
  global.feriadosNacionais = feriadosNacionais;
})(this);
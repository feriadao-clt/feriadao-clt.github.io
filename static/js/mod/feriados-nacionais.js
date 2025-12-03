const ff = ano => {
  /* ff => Feriados Fixos */
  const Feriados = [];
  
  Feriados.push({
    nome: "Confraternização Universal",
    data: ano + "-01-01T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Tiradentes",
    data: ano + "-04-21T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Dia do Trabalhador",
    data: ano + "-05-01T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Dia da Pátria (Independência do Brasil)",
    data: ano + "-09-07T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Nossa Senhora Aparecida",
    data: ano + "-10-12T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Finados",
    data: ano + "-11-02T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Proclamação da República",
    data: ano + "-11-15T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Dia Nacional de Zumbi e da Consciência Negra",
    data: ano + "-11-20T00:00:00",
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Natal",
    data: ano + "-12-25T00:00:00",
    tipo: "Nacional"
  });
  
  return Feriados;
};

const fm = ano => {
  /* fm => Feriados Moveis */
  const Feriados = [];
  const DateFormatter = date => {
    const offset = date.getTimezoneOffset();
    const LocalDate = new Date(date.getTime() - (offset * 60 * 1000));
    
    return LocalDate.toISOString().split(".")[0];
  };
  
  const DateAddOrSubDays = (date, days) => {
    const d = new Date(date);
    
    d.setDate(date.getDate() + days);
    
    return d;
  };
  
  const EasterSundayDateCalculator = year => {
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
    const easterMonth = Math.floor((h + l - 7 * m + 114) / 31);
    const easterDay = ((h + l - 7 * m + 114) % 31) + 1;
    
    return new Date(year, easterMonth - 1, easterDay);
  };
  
  Feriados.push({
    nome: "Carnaval",
    data: DateFormatter(DateAddOrSubDays(EasterSundayDateCalculator(ano), -47)),
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Paixão de Cristo (Sexta-feira Santa)",
    data: DateFormatter(DateAddOrSubDays(EasterSundayDateCalculator(ano), -2)),
    tipo: "Nacional"
  });
  
  Feriados.push({
    nome: "Corpus Christi",
    data: (() => {
      const EasterSunday = EasterSundayDateCalculator(ano);
      const PentecostSunday = DateAddOrSubDays(EasterSunday, 49);
      const TrinitySunday = DateAddOrSubDays(PentecostSunday, 7);
      const CorpusChristi = DateAddOrSubDays(TrinitySunday, 4);
      
      return DateFormatter(CorpusChristi);
    })(),
    
    tipo: "Nacional"
  });
  
  return Feriados;
};

const yearParse = ano => { if (!/^(19\d\d|2[01]\d\d)$/.test(ano)) throw new Error(`FeriadosNacionais: Ano "${ano}" fora do intervalo suportado (1900 … 2199).`); return true; };
const feriadosNacionais = async ano => yearParse(ano) && ff(ano).concat(fm(ano)).sort((a, b) => new Date(a.data) - new Date(b.data));

export default feriadosNacionais;
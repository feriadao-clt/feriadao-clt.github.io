import UF from "./lib/uf.js";
import logger from "./lib/logger.js";
import feriadosNacionais from "./lib/feriadao.clt.js";

const fail = err => (logger.error(err), Snackbar.show({ text: err.message }));
const done = holidays => {
  clearTimeout(done.timeout);
  
  const datetime = moment().startOf("day").format();
  const holidayStatus = datetime => moment(datetime).calendar({
    lastDay: `[<div class="overflow-hidden"><div class="animate__animated animate__heartBeat animate__infinite infinite"><time class="small" datetime="${datetime}">ontem</time></div></div>]`,
    sameDay: `[<div class="overflow-hidden"><div class="animate__animated animate__heartBeat animate__infinite infinite"><time class="small" datetime="${datetime}">hoje</time></div></div>]`,
    nextDay: `[<div class="overflow-hidden"><div class="animate__animated animate__heartBeat animate__infinite infinite"><time class="small" datetime="${datetime}">amanhã</time></div></div>]`,
    lastWeek: function(now) { return `[<div><time class="small" datetime="${datetime}">${ this.day() % 6 ? "Última" : "Último" }] dddd[</time></div>]`; },
    nextWeek: function(now) { return `[<div><time class="small" datetime="${datetime}">${ this.day() % 6 ? "Próxima" : "Próximo" }] dddd[</time></div>]`; },
    sameElse: function(now) { now = now.startOf("day"); return `[<div><time class="small" datetime="${datetime}">${this.from(now)}</time></div>]`; }
  });
  
  const holidayStatusWatch = () => {
    $(".holiday-status div").each(function(i) {
      $(this).replaceWith(holidayStatus($(this).find("time[datetime]").attr("datetime")));
    });
    
    done.timeout = setTimeout(holidayStatusWatch, 1000);
  };
  
  const holidaysCreateLayout = (template, holidays) => {
    const el = $(document.createElement("div"));
    
    holidays.forEach(holiday => {
      const M = moment(holiday.datetime);
      
      el.append(`<div class="col mb-3">
        <div${M.isBefore(datetime) && ' class="opacity-75"'}>
          <div class="d-flex bg-light text-secondary align-items-center rounded shadow" data-title="${holiday.evento} (${holiday.observacao}: ${moment(holiday.datetime).format("LL")})" data-holiday-item>
            <div class="text-${M.day() === 0 ? "bg-danger": `${M.day() === 6 ? "bg-warning": "bg-secondary"}`} text-center text-uppercase rounded-start py-1" style="width: 9em;">
              <div class="fw-bold lh-1"><small>${M.format("dddd").split("-")[0]}</small></div>
                <hr class="m-1">
                <div><span class="lh-1" style="font-size: 1.75em;font-weight: 900;">${M.format("DD")}</span></div>
                <div class="fw-bold lh-1">${M.format("MMMM")}</div>
              </div>
        
              <div class="text-center w-100 mx-2">
                <div class="position-relative">
                  <div class="text-truncate-2"><h5 class="m-0 ${holiday.observacao.includes("Feriado") ? "text-danger" : ["facultativo"].includes(holiday.tipo) ? "text-warning text-shadow":"text-success"}">${holiday.evento}</h5></div>
                  <div class="fw-bold holiday-status" data-iso-date="${holiday.datetime}">${holidayStatus(holiday.datetime)}</div>
                </div>
              </div>
            </div>
      
            <small data-holiday-type="${holiday.tipo}"><em><i class="bi bi-info-circle-fill ${(["estadual","nacional"].includes(holiday.tipo) ? "text-danger" : [holiday.tipo].includes("facultativo") ? "text-warning" : "text-success")}"></i>&ensp;${holiday.observacao}${(holiday.uf ? ` (${holiday.uf.nome})` : "")}</em></small>
          </div>
        </div>
      </div>`);
    });
    
    return el;
  };
  
  document.title = `Feriadão CLT ${$('[data-select="YEAR"]').val()}`;
  //holidays = holidays.sort((a, b) => moment(b.datetime) - moment().startOf("day"));
  //const nextHolidays = holidays.filter(holiday => moment(holiday.datetime) >= moment().startOf("day"));
  //const lastHolidays = holidays.filter(holiday => moment(holiday.datetime) < moment().startOf("day")).sort((a, b) => moment(a) - moment());
  
  //holidaysCreateLayout("next", nextHolidays);
  //holidaysCreateLayout("last", lastHolidays);
  
  $("[data-holidays]").html(
    holidaysCreateLayout(null, holidays.sort((a, b) => moment(b.datetime) - moment().startOf("day"))).addClass("row row-cols-sm-2")
  );
  
  $(window).scrollTop() && $(window).scrollTop(0);
  $("#loader").is(":visible") && setTimeout(() => $("#loader").fadeOut(function() { $(document.body).removeClass("overflow-hidden") && $(this).remove(); }), 2000);
  
  holidayStatusWatch();
};

const fnHolidays = function(evt) {
  const uf = $('[data-select="UF"]');
  const year = $('[data-select="YEAR"]');
  
  if (!uf.val()) localStorage.removeItem("UF");
  else localStorage.setItem("UF", uf.val());
  
  feriadosNacionais(year.val(), uf.val()).then(done).catch(fail);
};

$(window).on("load", function(evt) {
  moment.locale(navigator.language);
  import("./helpers/swr.js");
  import("./helpers/author.js");
  import("./helpers/share-file.js");
  import("./helpers/holidays.faq.js");
  
  $(".powered-by").on("animationend", () => {
    for (let i = 1900; i < 2200; i++) {
      $('[data-select="YEAR"]').append(
        `<option value="${i}"${i === moment().year() ? " selected":""}>Ano ${i}</option>`
      );
    }
    
    UF.forEach(el => {
      $('[data-select="UF"] optgroup[data-name="UF"]').append(
        `<option value="${el.sigla}">${el.nome}</option>`
      );
    });
    
    if (localStorage.UF) $('[data-select="UF"]').val(localStorage.UF);
    
    $("[data-select]").change(fnHolidays), fnHolidays();
  });
});
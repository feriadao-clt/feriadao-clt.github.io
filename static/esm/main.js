//import feriadosNacionais from "./feriadao.clt.js";
import UF from "./lib/uf.js";
import logger from "./lib/logger.js";
import feriadosNacionais from "./lib/feriadao.clt.js";

const fail = err => (logger.error(err), Snackbar.show({ text: err.message }));
const done = holidays => {
  clearTimeout(done.timeout);
  
  const el = $(document.createElement("div"));
  const datetime = moment().startOf("day").format();
  const holidayStatus = datetime => moment(datetime).calendar({
    //lastDay: `[<div class="position-relative text-danger"><p class="animate__animated animate__heartBeat animate__infinite m-0"><time class="small" datetime="${datetime}">ontem</time></p><span class="position-absolute top-0 end-0"><i class="bi bi-check2-circle"></i></span></div>]`,
    //sameDay: `[<div class="position-relative text-danger"><p class="animate__animated animate__heartBeat animate__infinite m-0"><time class="small" datetime="${datetime}">hoje</time></p><span class="position-absolute top-0 end-0"><i class="bi bi-check2-circle"></i></span></div>]`,
    nextDay: `[<div class="position-relative text-bg-danger overflow-hidden"><div class="text-bg-dark animate__animated animate__heartBeat animate__infinite m-0"><span class="small" datetime="${datetime}">amanhã</span></div><div class="position-absolute top-0 end-0"><i class="bi bi-hourglass-split"></i></div></div>]`,
    //lastWeek: function(now) { return `[<div class="position-relative text-secondary"><time class="small" datetime="${datetime}">${ this.day() % 6 ? "Última" : "Último" }] dddd[</time><span class="position-absolute end-0"><i class="bi bi-check2-circle"></i></span></div>]`; },
    //nextWeek: function(now) { return `[<div class="position-relative text-success"><time class="small" datetime="${datetime}">${ this.day() % 6 ? "Próxima" : "Próximo" }] dddd[</time><span class="position-absolute end-0"><i class="bi bi-hourglass-split"></i></span></div>]`; },
    //sameElse: function(now) { now = now.startOf("day"); return `[<div class="position-relative text-${this.isBefore(now)?"secondary":"success"}"><time class="small" datetime="${datetime}">${this.from(now)}</time><span class="position-absolute end-0"><i class="bi bi-${this.isBefore(now)?"check2-circle":"hourglass-split"}"></i></span></div>]`; }
  });
  
  const holidayStatusWatch = () => {
    $(".holiday-status div").each(function(i) {
      $(this).replaceWith(holidayStatus($(this).find("[datetime]").attr("datetime")));
    });
    
    done.timeout = setTimeout(holidayStatusWatch, 1000);
  };
  
  document.title = `Feriadão CLT ${$('[data-select="YEAR"]').val()}`;
  holidays = holidays.sort((a, b) => moment(b.datetime) - moment().startOf("day"));
  
  holidays.forEach(holiday => {
    const M = moment(holiday.datetime);
    
    el.append(`
      <div class="col mb-3">
        <div class="d-flex text-bg-light align-items-center border border-${M.isBefore(datetime) ? "secondary" : `${M.isAfter(datetime) ? "success" : "danger"}`} rounded shadow">
          <div class="text-${M.day() === 0 ? "bg-danger": `${M.day() === 6 ? "bg-warning": "bg-secondary"}`} text-center text-uppercase rounded-start py-1" style="width: 9rem;">
            <div class="fw-bold lh-1"><small>${M.format("dddd").split("-")[0]}</small></div>
            <hr class="m-1">
            <div><span class="lh-1" style="font-size: 1.75em;font-weight: 900;">${M.format("DD")}</span></div>
            <div class="fw-bold lh-1">${M.format("MMMM")}</div>
          </div>
        
          <div class="text-center w-100 px-3">
            <div class="position-relative">
              <div class="text-truncate-2"><h5 class="m-0">${holiday.evento}</h5></div>
              <div class="fw-bold holiday-status" data-iso-date="${holiday.datetime}">${holidayStatus(holiday.datetime)}</div>
            </div>
          </div>
        </div>
      
        <small data-holiday-type="${holiday.tipo}"><em><i class="bi bi-info-circle-fill ${(["estadual","nacional"].includes(holiday.tipo) ? "text-danger" : [holiday.tipo].includes("facultativo") ? "text-warning" : "text-success")}"></i>&ensp;${holiday.observacao}${(holiday.uf ? ` (${holiday.uf.nome})` : "")}</em></small>
      </div>
      `);
  });
  
  $("[data-holidays]").html(el.addClass("row row-cols-sm-2"));
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
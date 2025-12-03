import feriadosNacionais from "./mod/feriados-nacionais.js";

const holidays = function(evt) {
  let m, el = $(document.createElement("div")),
    DateString = moment().startOf("day").format();
  
  feriadosNacionais(this.value).then(feriados => {
    feriados.forEach(feriado => {
      m = moment(feriado.data);
      
      el.append(`<div class="d-flex text-bg-light align-items-center border border-${m.isBefore(DateString) ? "secondary" : `${m.isAfter(DateString) ? "success" : "danger"}`} rounded shadow mb-3">
        <div class="text-${m.day() === 0 ? "bg-danger": `${m.day() === 6 ? "bg-warning": "bg-secondary"}`} text-center text-uppercase rounded-start" style="width: 9rem;">
          <div class="fw-bold"><small>${m.format("ddd")}</small></div>
          <hr class="m-1">
          <div><h3 class="m-0">${m.format("D")}</h3></div>
          <div class="fw-bold">${m.format("MMMM")}</div>
        </div>
        
        <div class="text-center w-100 px-3">
          <div class="text-truncate-2"><h5 class="m-0">${feriado.nome}</h5></div>
          <div class="text-${m.isBefore(DateString) ? "secondary" : `${m.isAfter(DateString) ? "success" : "danger"}`}">
            <small data-calendar>
              <time datetime="${feriado.data}">
                ${m.calendar({
                  lastDay:"[ontem]",
                  sameDay:"[hoje]",
                  nextDay:"[amanhã]", 
                  lastWeek: function(now) { return `${this.day() % 6 ? "[Último]" : "[Última]"} dddd` },
                  nextWeek: function(now) { return `${this.day() % 6 ? "[Próximo]" : "[Próxima]" } dddd` },
                  sameElse: function(now) { return `[${this.from(now)}]` }
                })}
              </time>
            </small>
          </div>
        </div>
      </div>`);
    });
    
    $("[data-holidays]").html(el);
    $(window).scrollTop(0);
  });
};

$(window).on("load", function(evt) {
  moment.locale("pt-br");
  
  for (let i = 1900; i < 2200; i++) {
    $("[data-select]").append(
      `<option value="${i}"${i === moment().year() ? " selected":""}>Feriados em ${i}</option>`
    );
  }
  
  $("[data-select]").on("change", holidays).change();
});
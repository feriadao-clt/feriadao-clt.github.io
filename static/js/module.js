import "./mod/swr.js";
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
          <div class="position-relative">
            <div class="text-truncate-2"><h5 class="m-0">${feriado.nome}</h5></div>
            <div class="text-${m.isBefore(DateString) ? "secondary" : `${m.isAfter(DateString) ? "success" : "danger"}`}">
              <small data-calendar>
                <time datetime="${feriado.data}">
                  ${m.calendar({
                    lastDay:"[ontem]",
                    sameDay:"[hoje]",
                    nextDay:"[amanhã]", 
                    lastWeek: function(now) { return `${this.day() % 6 ? "[Última]" : "[Último]"} dddd` },
                    nextWeek: function(now) { return `${this.day() % 6 ? "[Próxima]" : "[Próximo]" } dddd` },
                    sameElse: function(now) { return `[${this.from(now)}]` }
                  })}
                </time>
              </small>
            </div>
          
            <div class="position-absolute bottom-0 end-0">
              ${m.isBefore(DateString) || m.isSame(DateString) ? '<span class="text-primary"><i class="bi bi-check2-all"></i></span>' : '<span class="text-secondary"><i class="bi bi-clock-history"></i></span>'}
            </div>
          </div>
        </div>
      </div>`);
    });
    
    el.append('<p class="text-end opacity-75 py-3"><span class="border border-2 border-end-0 rounded-start-pill ps-3 py-2">Powered by <a title="@delvani.js" class="text-decoration-none" href="https://www.instagram.com/delvani.js"><strong>Delvani</strong></a></span></p>');
    $("[data-holidays]").html(el);
    ($(window).scrollTop() && $(window).scrollTop(0));
    ($("#loader").length && $("#loader").fadeOut(function() { $(this).remove() }));
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
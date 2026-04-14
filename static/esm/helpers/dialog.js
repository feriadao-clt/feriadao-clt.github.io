import author from "./templates/author.js";
import feriadoNacional from "./templates/feriado-nacional.faq.js";
import feriadoEstadual from "./templates/feriado-estadual.faq.js";
import pontoFacultativo from "./templates/ponto-facultativo.faq.js";
import datasComemorativas from "./templates/datas-comemorativas.faq.js";

const res = await fetch("/LICENSE");
const license = await res.text();
const modalDialog = modal.dialog();
const title = {
  author:'<i class="bi bi-info-circle-fill"></i>&ensp;Author',
  license:'<i class="bi bi-key-fill"></i>&ensp;LICENSE',
  feriado_estadual:'<i class="bi bi-info-circle-fill text-danger"></i>&ensp;Feriado Estadual',
  feriado_nacional:'<i class="bi bi-info-circle-fill text-danger"></i>&ensp;Feriado Nacional',
  ponto_facultativo:'<i class="bi bi-info-circle-fill text-warning"></i>&ensp;Ponto Facultativo',
  datas_comemorativas:'<i class="bi bi-info-circle-fill text-success"></i>&ensp;Datas Comemorativas'
}

modalDialog.addClass("modal-fullscreen-md-down modal-dialog-scrollable modal-dialog-centered");

$(document.body).on("click", "[data-nav-link]", function(evt) {
  if (this.dataset.navLink === "about") modalDialog.setTitle(title.author).setBody(author).open();
  if (this.dataset.navLink === "license") modalDialog.setTitle(title.license).setBody(`<pre>${license}</pre>`).open();
  return false;
});

$(document.body).on("click", "[data-holiday-type]", function(evt) {
  if (this.dataset.holidayType === "estadual") modalDialog.setTitle(title.feriado_estadual).setBody(feriadoEstadual).open();
  else if (this.dataset.holidayType === "nacional") modalDialog.setTitle(title.feriado_nacional).setBody(feriadoNacional).open();
  else if (this.dataset.holidayType === "facultativo") modalDialog.setTitle(title.ponto_facultativo).setBody(pontoFacultativo).open();
  else if (this.dataset.holidayType === "comemorativa") modalDialog.setTitle(title.datas_comemorativas).setBody(datasComemorativas).open();
});

export default void 0;
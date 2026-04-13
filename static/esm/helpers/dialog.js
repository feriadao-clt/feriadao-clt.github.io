import author from "./templates/author.js";
import feriadoNacional from "./templates/feriado-nacional.faq.js";
import feriadoEstadual from "./templates/feriado-estadual.faq.js";
import pontoFacultativo from "./templates/ponto-facultativo.faq.js";
import datasComemorativas from "./templates/datas-comemorativas.faq.js";

const res = await fetch("/LICENSE");
const license = await res.text();
const modalDialog = modal.dialog();

modalDialog.addClass("modal-fullscreen-md-down modal-dialog-scrollable modal-dialog-centered");

$(document.body).on("click", "[data-nav-link]", function(evt) {
  if (this.dataset.navLink === "about") modalDialog.setTitle("Author").setBody(author).open();
  if (this.dataset.navLink === "license") modalDialog.setTitle("LICENSE").setBody(`<pre>${license}</pre>`).open();
  return false;
});

$(document.body).on("click", "[data-holiday-type]", function(evt) {
  if (this.dataset.holidayType === "estadual") modalDialog.setTitle("Feriado Estadual").setBody(feriadoEstadual).open();
  else if (this.dataset.holidayType === "nacional") modalDialog.setTitle("Feriado Nacional").setBody(feriadoNacional).open();
  else if (this.dataset.holidayType === "facultativo") modalDialog.setTitle("Ponto Facultativo").setBody(pontoFacultativo).open();
  else if (this.dataset.holidayType === "comemorativa") modalDialog.setTitle("Datas Comemorativas").setBody(datasComemorativas).open();
});

export default null;
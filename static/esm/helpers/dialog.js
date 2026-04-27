import author from "./templates/author.js";
import feriadoNacional from "./templates/feriado-nacional.faq.js";
import feriadoEstadual from "./templates/feriado-estadual.faq.js";
import pontoFacultativo from "./templates/ponto-facultativo.faq.js";
import datasComemorativas from "./templates/datas-comemorativas.faq.js";

const res = await fetch("/LICENSE");
const license = await res.text();
const title = {
  author: 'Author',
  license: 'LICENSE',
  feriado_estadual: 'Feriado Estadual',
  feriado_nacional: 'Feriado Nacional',
  ponto_facultativo: 'Ponto Facultativo',
  datas_comemorativas: 'Datas Comemorativas'
};

const dialog = modal.dialog({
  size: "lg",
  fullscreen: "lg-down"
});

$(document.body).on("click", "[data-nav-link]", function(evt) {
  if (this.dataset.navLink === "about") dialog.icon({ name: "person-fill" }).title(title.author).content(author).show();
  if (this.dataset.navLink === "license") dialog.icon({ name: "key-fill" }).title(title.license).content(`<pre>${license}</pre>`).show();
  
  return false;
});

$(document.body).on("click", "[data-holiday-type]", function(evt) {
  dialog.icon({ name: "info-circle-fill" });
  
  if (this.dataset.holidayType === "estadual") dialog.title(title.feriado_estadual).content(feriadoEstadual).show();
  else if (this.dataset.holidayType === "nacional") dialog.title(title.feriado_nacional).content(feriadoNacional).show();
  else if (this.dataset.holidayType === "facultativo") dialog.title(title.ponto_facultativo).content(pontoFacultativo).show();
  else if (this.dataset.holidayType === "comemorativa") dialog.title(title.datas_comemorativas).content(datasComemorativas).show();
  
  return false;
});

export default void 0;
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

const dialog = modal.dialog({ size: "lg", fullscreen: "md-down" });

$(document.body).on("click", "[data-nav-link]", function(evt) {
  if (this.href === "modal:about") dialog.setIcon({ name: "person-fill" }).setTitle(title.author).setContent(author).show();
  if (this.href === "modal:license") dialog.setIcon({ name: "key-fill" }).setTitle(title.license).setContent(`<pre>${license}</pre>`).show();
  
  return false;
});

$(document.body).on("click", "[data-holiday-type]", function(evt) {
  dialog.setIcon({ name: "info-circle-fill" });
  
  if (this.dataset.holidayType === "estadual") dialog.setTitle(title.feriado_estadual).setContent(feriadoEstadual).show();
  else if (this.dataset.holidayType === "nacional") dialog.setTitle(title.feriado_nacional).setContent(feriadoNacional).show();
  else if (this.dataset.holidayType === "facultativo") dialog.setTitle(title.ponto_facultativo).setContent(pontoFacultativo).show();
  else if (this.dataset.holidayType === "comemorativa") dialog.setTitle(title.datas_comemorativas).setContent(datasComemorativas).show();
  
  return false;
});

export default void 0;
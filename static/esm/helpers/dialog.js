import author from "./templates/author.js";
import feriadoNacional from "./templates/feriado-nacional.faq.js";
import feriadoEstadual from "./templates/feriado-estadual.faq.js";
import pontoFacultativo from "./templates/ponto-facultativo.faq.js";
import datasComemorativas from "./templates/datas-comemorativas.faq.js";

const res = await fetch("/LICENSE");
const license = await res.text();
const dialog = modal.dialog();
const title = {
  author: '<i class="bi bi-info-circle-fill"></i>&ensp;Author',
  license: '<i class="bi bi-key-fill"></i>&ensp;LICENSE',
  feriado_estadual: '<i class="bi bi-info-circle-fill text-danger"></i>&ensp;Feriado Estadual',
  feriado_nacional: '<i class="bi bi-info-circle-fill text-danger"></i>&ensp;Feriado Nacional',
  ponto_facultativo: '<i class="bi bi-info-circle-fill text-warning"></i>&ensp;Ponto Facultativo',
  datas_comemorativas: '<i class="bi bi-info-circle-fill text-success"></i>&ensp;Datas Comemorativas'
}

dialog.on("shown.bs.modal", function(evt) {
  console.log(evt.type);
});

dialog.on("hidden.bs.modal", function(evt) {
  console.log(evt.type);
  //dialog.destroy();
});

dialog.on("destroy.bs.modal", function(evt) {
  console.log(evt.type);
});

dialog.on("dismiss.btn.modal", function(evt) {
  console.log(evt.type);
});

dialog.on("cancel.btn.modal", function(evt) {
  console.log(evt.type);
});

dialog.on("confirm.btn.modal", function(evt) {
  console.log(evt.type);
  //dialog.destroy()
});

dialog.size("lg")
  .centered(true)
  .scrollable(true)
  .fullscreen("lg-down");

$(document.body).on("click", "[data-nav-link]", function(evt) {
  if (this.dataset.navLink === "about") dialog.title(title.author).body(author).show();
  if (this.dataset.navLink === "license") dialog.title(title.license).body(`<pre>${license}</pre>`).show();
  return false;
});

$(document.body).on("click", "[data-holiday-type]", function(evt) {
  if (this.dataset.holidayType === "estadual") dialog.title(title.feriado_estadual).body(feriadoEstadual).show();
  else if (this.dataset.holidayType === "nacional") dialog.title(title.feriado_nacional).body(feriadoNacional).show();
  else if (this.dataset.holidayType === "facultativo") dialog.title(title.ponto_facultativo).body(pontoFacultativo).show();
  else if (this.dataset.holidayType === "comemorativa") dialog.title(title.datas_comemorativas).body(datasComemorativas).show();
});

export default void 0;
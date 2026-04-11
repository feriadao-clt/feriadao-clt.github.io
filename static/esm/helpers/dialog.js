import author from "./templates/author.js";
import license from "./templates/license.js";
import feriadoNacional from "./templates/feriado-nacional.faq.js";
import feriadoEstadual from "./templates/feriado-estadual.faq.js";
import pontoFacultativo from "./templates/ponto-facultativo.faq.js";
import datasComemorativas from "./templates/datas-comemorativas.faq.js";

const res = await fetch("/LICENSE");
const licenseTxt = await res.text();

$(author).appendTo(document.body);
$(license).appendTo(document.body).find(".modal-body").html(`<pre>${licenseTxt}</pre>`);
$(feriadoEstadual).appendTo(document.body);
$(feriadoNacional).appendTo(document.body);
$(pontoFacultativo).appendTo(document.body);
$(datasComemorativas).appendTo(document.body);

export default null;
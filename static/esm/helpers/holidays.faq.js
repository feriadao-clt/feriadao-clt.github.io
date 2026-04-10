$(document.body).on("click", "[data-holiday-type]", function(evt) {
  const holidayType = $(this).data("holiday-type");
  const dialogPrint = (type, content) => $.alert({ type, content, title: null, typeAnimated: false, buttons: { ok: { btnClass: "btn-" + type } } });
  
  if (holidayType.match(/^estadual$/i)) dialogPrint("red", "url:/static/page/faq/feriado-estadual.md");
  else if (holidayType.match(/^nacional$/i)) dialogPrint("red", "url:/static/page/faq/feriado-nacional.md");
  else if (holidayType.match(/^facultativo$/i)) dialogPrint("orange", "url:/static/page/faq/ponto-facultativo.md");
  else if (holidayType.match(/^comemorativa$/i)) dialogPrint("green", "url:/static/page/faq/datas-comemorativas.md");
  
  return false;
});

export default null;

"".match()
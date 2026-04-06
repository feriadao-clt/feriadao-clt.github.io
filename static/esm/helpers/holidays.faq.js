$(document.body).on("click", "[data-holiday-type]", function(evt) {
  const holidayType = $(this).data("holiday-type");
  const dialogPrint = (type, content) => $.alert({ type, content, title: null, typeAnimated: false, buttons: { ok: { btnClass: "btn-" + type } } });
  
  if (holidayType === "estadual") dialogPrint("red", "url:/static/page/faq/feriado-estadual.html");
  else if (holidayType === "nacional") dialogPrint("red", "url:/static/page/faq/feriado-nacional.html");
  else if (holidayType === "facultativo") dialogPrint("orange", "url:/static/page/faq/ponto-facultativo.html");
  else if (holidayType === "comemorativa") dialogPrint("green", "url:/static/page/faq/datas-comemorativas.html");
  
  return false;
});

export default null;
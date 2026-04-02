$(document.body).on("click", "[data-holiday-type]", function(evt) {
  const holidayType = $(this).data("holiday-type");
  const dialogPrint = (title, content) => $.dialog({ type: "blue", title, content });
  
  if (holidayType === "estadual") dialogPrint("Feriado Estadual", "url:/static/txt/feriado_estadual.txt");
  else if (holidayType === "nacional") dialogPrint("Feriado Nacional", "url:/static/txt/feriado_nacional.txt");
  else if (holidayType === "facultativo") dialogPrint("Ponto Facultativo", "url:/static/txt/ponto_facultativo.txt");
  else if (holidayType === "comemorativa") dialogPrint("Datas Comemorativas", "url:/static/txt/datas_comemorativas.txt");
  
  return false;
});

export default null;
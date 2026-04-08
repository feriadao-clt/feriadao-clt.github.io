$(document.body).on("click", "[data-author]", function() {
  const value = $(this).data("author");
  const dialogPrint = (title, content) => $.dialog({ title, content });
  
  if (value === "ABOUT") Snackbar.show({ text: "Powred by Delvani." });
  if (value === "LICENSE") dialogPrint("LICENSE", "url:/static/page/faq/LICENSE.txt");
  return false;
});

export default null;
(function() {
  "use strict";
  
  var script = document.createElement("script");
  var pathname = window.location.pathname;
  
  if (pathname.match("404.html")) window.location.replace("/");
  else if (pathname.match("legacy-browser.html")) false === script.noModule && window.location.replace("/");
  else false !== script.noModule && window.location.replace("/static/wrn/legacy-browser.html");
  
  document.documentElement.setAttribute("data-js", "on"); // => JavaScript is enabled!
})();
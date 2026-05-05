(function() {
  "use strict";
  
  document.documentElement.id = "on-js";
  if (false !== document.createElement("script").noModule) return window.location.replace("/static/wrn/legacy-browser.html");
})();
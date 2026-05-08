(function() {
  "use strict";
  
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const setThemeColor = color => document.documentElement.dataset.bsTheme = color;
  
  setThemeColor(isDarkTheme.matches ? "dark" : "light");
  isDarkTheme.addEventListener("change", evt => setThemeColor(evt.matches ? "dark" : "light"));
})();
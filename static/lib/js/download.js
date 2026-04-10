(function(global) {
  "use strict";
  
  var a = document.createElement("a");
  var supports = "download" in a;
  var downloads = function downloads(url, filename) {
    if (supports) {
      a.download = (((typeof filename === "string") && filename.trim()) || "");
      
      if (typeof url === "string") url = url.trim(), url && (a.href = url, a.click());
      else if (("Blob" in global) && (typeof Blob === "function") && (url instanceof Blob)) url = URL.createObjectURL(url), a.href = url, a.click(), URL.revokeObjectURL(url);
    }
  }
  
  global.download = function download() { return downloads.apply(null, arguments); };
  global.download.supports = supports;
})(this);
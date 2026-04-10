(function(global) {
  var anchorElement = document.createElement("a");
  var scriptElement = document.createElement("script");
  
  Navigator.prototype.supports = new Supports();
  
  function Supports() {
    this.esm = scriptElement.noModule === false;
    this.Blob = (("Blob" in global) && (typeof Blob === "function"));
    this.fetch = (("fetch" in global) && (typeof fetch === "function"));
    this.share = "share" in navigator;
    this.canShare = "canShare" in navigator;
    this.Notification = "Notification" in global;
    this.serviceWorker = "serviceWorker" in navigator;
    this.anchor_download_property = "download" in anchorElement;
  }
})(this);
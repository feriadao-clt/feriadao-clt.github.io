(function(global) {
  var anchorElement = document.createElement("a");
  var scriptElement = document.createElement("script");
  
  Navigator.prototype.supports = {
    ESM: scriptElement.noModule === false,
    share: "share" in navigator,
    canShare: "canShare" in navigator,
    notification: "Notification" in global,
    serviceWorker: "serviceWorker" in navigator,
    anchor_download_property: "download" in anchorElement
  };
})(this);
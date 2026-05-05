(function(global) {
  "use strict";
  
  function fn(value) {
    return typeof value !== "string" ? "" : value
      .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .replace(/\s*([\{\};:,])\s*/g, '$1') // Remove spaces around delimiters
      .replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""); // Remove leading/trailing space
  }
  
  global.minify = function minify() { return fn.apply(null, arguments); }
})(this);
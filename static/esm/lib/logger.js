const logger = (class Logger {}).prototype;
const levels = Object.keys(typeof console === "object" ? console : Object.create(null));
const define = (fn, cb) => Object.defineProperty(logger, fn, { value: function level() { return cb.apply(logger, arguments); } });
const devmode = ["localhost", "127.0.0.1", "0.0.0.0"].includes(location.hostname);
const createLoggger = () => {
  define("log", function() { return devmode && levels.includes("log") && console.log.apply(console, arguments), logger; });
  define("info", function() { return devmode && levels.includes("info") && console.info.apply(console, arguments), logger; });
  define("warn", function() { return devmode && levels.includes("warn") && console.warn.apply(console, arguments), logger; });
  define("error", function() { return devmode && levels.includes("error") && console.error.apply(console, arguments), logger; });
  return logger;
}

export default createLoggger();
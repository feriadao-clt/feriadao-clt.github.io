const Logger = function Logger() {};
const isLocalhost = ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
const createLoggger = (allow, devmode) => {
  const logger = new Logger();
  const levels = Object.keys(typeof console === "object" ? console : Object.create(null));
  const define = (fn, cb) => Object.defineProperty(logger, fn, { value: function level() { return cb.apply(logger, arguments); } });
  const setter = (fn, cb) => logger[fn] = function proto() { return cb.apply(logger, arguments); };
  
  define("log", function() { return allow && levels.includes("log") && console.log.apply(console, arguments), logger; });
  define("info", function() { return allow && levels.includes("info") && console.info.apply(console, arguments), logger; });
  define("warn", function() { return allow && levels.includes("warn") && console.warn.apply(console, arguments), logger; });
  define("error", function() { return allow && levels.includes("error") && console.error.apply(console, arguments), logger; });
  
  return (devmode ? setter("prodmode", function() { return createLoggger(true); }) : setter("devmode", function() { return createLoggger(isLocalhost, true) })), logger;
}

export default createLoggger(isLocalhost, true);
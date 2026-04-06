import logger from "../lib/logger.js";

const success = swr => logger.log({ swr });
const failure = err => logger.error({ err });

if (navigator.supports.serviceWorker) window.navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(success).catch(failure);
else logger.warn("ServiceWorker not supported!");

export default null;
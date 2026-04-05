import logger from "../lib/logger.js";

const failure = err => logger.warn(err);
const support = data => "canShare" in navigator && navigator.canShare(data);
async function shareFile(data) {
  if (support(data)) return navigator.share(data);
  else throw new Error("Web Share not supported for these files.");
}

$(document.body).on("click", "[data-holiday-item]", function(evt) {
  htmlToImage.toBlob(this)
    .then(blob =>(logger.info(blob), shareFile({
      url: location.href,
      text: $(this).data("title"),
      title: document.title,
      files: [new File([blob], "holiday.png", { type: blob.type })],
    }).catch(failure))).catch(failure);
});

export default null
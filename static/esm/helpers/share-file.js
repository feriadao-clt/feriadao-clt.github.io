import logger from "../lib/logger.js";

const failure = err => logger.warn(err);
const canShareData = data => navigator.supports.canShare && navigator.canShare(data);

async function shareFile(data) {
  if (canShareData(data)) return navigator.share(data);
  else throw new Error("Web Share not supported for these files.");
}


if (navigator.supports.share) {
  $(document.body).on("click", "[data-holiday-item]", function(evt) {
    evt.stopPropagation();
    htmlToImage.toBlob(this).then(blob => {
      shareFile({
        url: location.href,
        text: $(this).data("title"),
        title: document.title,
        files: [new File([blob], blob.type.split("/").join("."), { type: blob.type })],
      }).catch(failure)
    }).catch(failure);
  });
} else logger.warn("Web Share API not supported.");

export default null
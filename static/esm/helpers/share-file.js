import logger from "../lib/logger.js";

const failure = err => logger.warn(err);
const canShareData = data => navigator.supports.canShare && navigator.canShare(data);

async function shareFile(data) {
  if (canShareData(data)) await navigator.share(data);
  else throw new Error("Web Share not supported for these files.");
}


if (navigator.supports.canShare) {
  $(document.body).on("click", "[data-holiday-item]", function(evt) {
    const H = $.data(this, "holiday");
    const url = location.href;
    const text = `${H.evento}\n${moment(H.datetime).format("dddd, D [de] MMMM [de] YYYY")}.\n${H.observacao}`;
    const title = H.evento;
    
    htmlToImage.toBlob(this).then(blob => shareFile({ url, text, title, files: [new File([blob], blob.type.split("/").join("."), { type: blob.type })] }).catch(failure)).catch(failure);
  });
} else logger.warn("Web Share API not supported.");

export default null;
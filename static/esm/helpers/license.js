const res = await fetch("/static/page/faq/license.md");
const html = await res.text();
const modal = $(html).appendTo(document.body);

modal.on("click", evt => download("/LICENSE","LICENSE.txt"));

export default null;
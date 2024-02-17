document.addEventListener("page-load", () => {
  const previewData = {};

  document.querySelectorAll(".content a").forEach((el) => {
    el.addEventListener("mouseover", async () => {
      const previewTooltipEl = el.querySelector(".preview-tooltip");
      if (previewTooltipEl) {
        return;
      }

      if (!(el.href in previewData)) {
        previewData[el.href] = await getPreviewData(el.href);
      }

      el.insertAdjacentHTML(
        "beforeend",
        `<span class="preview-tooltip">
           <span>${previewData[el.href].description}</span>
           <img src="${previewData[el.href].image}" alt="" />
         </span>`
      );
    });
  });

  document.querySelectorAll(".content a").forEach((el) => {
    el.addEventListener("mouseleave", () => {
      const previewTooltipEl = el.querySelector(".preview-tooltip");
      if (previewTooltipEl) {
        previewTooltipEl.remove();
      }
    });
  });
});

const getPreviewData = (href) => {
  return new Promise((resolve) => {
    fetch(href)
      .then((r) => r.text())
      .then((html) => {
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, "text/html");

        const description = newDocument.querySelector(
          'meta[property="og:description"]'
        ).content;

        const image = newDocument.querySelector(
          'meta[property="og:image"]'
        ).content;

        resolve({ description, image });
      });
  });
};

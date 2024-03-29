const handleFirstPageLoad = () => {
  const pageObserver = new MutationObserver(() => {
    handlePageLoad();
  });

  pageObserver.observe(document.getElementById("root"), {
    childList: true,
  });

  handlePageLoad();
};

const handlePageLoad = () => {
  document.dispatchEvent(new Event("page-load"));

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      handleLinkClick(el.href);
    });
  });
};

const handleLinkClick = (href) => {
  document
    .querySelector("body")
    .insertAdjacentHTML("beforeend", '<div id="spinner"></div>');

  fetch(href)
    .then((r) => r.text())
    .then((html) => {
      handlePageReplace(href, html);
      document.getElementById("spinner").remove();
    });
};

const handlePageReplace = (href, html) => {
  const parser = new DOMParser();
  const newDocument = parser.parseFromString(html, "text/html");

  document.getElementById("root").innerHTML =
    newDocument.getElementById("root").innerHTML;

  document.querySelector("title").innerText =
    newDocument.querySelector("title").innerText;

  history.pushState({}, "", href);
};

document.addEventListener("DOMContentLoaded", handleFirstPageLoad);

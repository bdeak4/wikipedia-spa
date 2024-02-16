const handleFirstPageLoad = () => {
  const pageObserver = new MutationObserver(() => {
    handlePageLoad();
  });

  pageObserver.observe(document.getElementById("page-content"), {
    childList: true,
  });

  handlePageLoad();
};

const handlePageLoad = () => {
  console.log("called handlePageLoad()");

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

  document.getElementById("page-content").innerHTML =
    newDocument.getElementById("page-content").innerHTML;

  document.querySelector("title").innerText =
    newDocument.querySelector("title").innerText;

  history.pushState({}, "", href);

  console.log("replaced <body> content");
};

document.addEventListener("DOMContentLoaded", handleFirstPageLoad);

const handleFirstPageLoad = () => {
  const bodyObserver = new MutationObserver(() => {
    handlePageLoad();
  });

  bodyObserver.observe(document.querySelector("body"), {
    childList: true,
  });

  handlePageLoad();
};

const handlePageLoad = () => {
  console.log("called handlePageLoad()");

  document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      fetch(el.href)
        .then((r) => r.text())
        .then((html) => {
          handlePageReplace(el.href, html);
        });
    });
  });
};

const handlePageReplace = (href, html) => {
  const parser = new DOMParser();
  const newDocument = parser.parseFromString(html, "text/html");

  document.querySelector("body").innerHTML =
    newDocument.querySelector("body").innerHTML;

  document.querySelector("title").innerText =
    newDocument.querySelector("title").innerText;

  history.pushState({}, "", href);

  console.log("replaced <body> content");
};

document.addEventListener("DOMContentLoaded", handleFirstPageLoad);

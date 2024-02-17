document.addEventListener("page-load", () => {
  document.querySelectorAll(".content img").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      const isZoomed = el.classList.contains("zoomed");
      if (isZoomed) {
        el.classList.remove("zoomed");
        el.style.transform = "";
        return;
      }

      const { translateX, translateY, scale } = calculateTransform(el);

      el.classList.add("zoomed");
      el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    });
  });
});

const calculateTransform = (el) => {
  const { x, y, width, height } = el.getBoundingClientRect();

  const translateX = window.innerWidth / 2 - x - width / 2;
  const translateY = window.innerHeight / 2 - y - height / 2;

  const widthRatio = window.innerWidth / width;
  const heightRatio = window.innerHeight / height;
  const scale = Math.min(widthRatio, heightRatio);

  return { translateX, translateY, scale };
};

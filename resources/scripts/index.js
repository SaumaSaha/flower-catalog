const main = () => {
  const image = document.getElementById("jug");
  const hidden = "hidden";
  image.onclick = () => {
    image.classList.add(hidden);
    setTimeout(() => image.classList.remove(hidden), 1000);
  };
};

window.onload = main;

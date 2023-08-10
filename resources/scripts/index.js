const main = () => {
  const jar = document.getElementById("jug");
  const hidden = "hidden";

  jar.onclick = () => {
    jar.classList.add(hidden);
    setTimeout(() => jar.classList.remove(hidden), 1000);
  };
};

window.onload = main;

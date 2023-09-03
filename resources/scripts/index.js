const createGreetElement = (text) => {
  const nameElement = document.createElement("h3");
  nameElement.innerText = text;
  return nameElement;
};

const submitLogoutRequest = () => {
  fetch("/logout", { method: "POST" }).then((res) => {
    if (res.redirected) {
      console.log(res.url);
      location.replace(res.url);
      return;
    }
  });
};

const createLogoutElement = () => {
  const logoutElement = document.createElement("a");
  logoutElement.innerText = "Logout";
  logoutElement.href = "";

  logoutElement.onclick = (e) => {
    e.preventDefault();
    submitLogoutRequest();
  };

  return logoutElement;
};

const showAuthSection = ({ username, loggedIn }) => {
  const authSection = document.querySelector("#auth-section");

  if (!loggedIn) {
    return;
  }

  authSection.replaceChildren();
  const text = `Welcome ${username}`;
  const userNameElement = createGreetElement(text);
  const logoutElement = createLogoutElement();
  authSection.append(userNameElement, logoutElement);
};

const fetchLoginStatus = () => {
  fetch("/login-status")
    .then((res) => res.json())
    .then(showAuthSection);
};

const main = () => {
  const jar = document.getElementById("jug");
  const hidden = "hidden";

  jar.onclick = () => {
    jar.classList.add(hidden);
    setTimeout(() => jar.classList.remove(hidden), 1000);
  };

  fetchLoginStatus();
};

window.onload = main;

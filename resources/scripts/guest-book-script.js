const createNameElement = (name) => {
  const nameElement = document.createElement("span");
  const strongName = document.createElement("strong");
  strongName.innerText = name;

  nameElement.append(strongName);
  return nameElement;
};

const createDateElement = (date) => {
  const dateElement = document.createElement("span");

  dateElement.innerText = date;
  return dateElement;
};

const createTextElement = (text) => {
  const textElement = document.createElement("span");
  textElement.innerText = text;

  return textElement;
};

const createCommentElement = (comment) => {
  const nameElement = createNameElement(comment["username"]);
  const dateElement = createDateElement(comment.timeStamp);
  const textElement = createTextElement(comment.text);

  const commentElement = document.createElement("p");
  commentElement.id = "comment";
  commentElement.append(dateElement, nameElement, textElement);

  return commentElement;
};

const createCommentElements = (comments) => comments.map(createCommentElement);

const createCommentDetails = () => {
  const text = document.querySelector("#comment-text-box").value;

  return { text };
};

const showComments = (comments) => {
  const commentsContainer = document.querySelector("#comments");

  const commentElements = createCommentElements(comments);
  commentsContainer.append(...commentElements);
};

const appendComment = (comment) => {
  const commentsContainer = document.querySelector("#comments");

  const commentElement = createCommentElement(comment);
  commentsContainer.prepend(commentElement);
};

const createGreetElement = (name) => {
  const nameElement = document.createElement("h3");
  nameElement.innerText = name;
  return nameElement;
};

const showUserName = ({ username }) => {
  const authSection = document.querySelector("#auth-section");
  const nameElement = createGreetElement(username);
  authSection.prepend(nameElement);
};

const validateResponse = (res) => {
  if (res.status === 401) {
    const location = res.headers.get("location");
    window.location.replace(location);
    return;
  }
  res.json().then(appendComment);
};

const submitComment = (commentParams) => {
  fetch("/guest-book/comment", {
    method: "POST",
    body: JSON.stringify(commentParams),
    headers: { "Content-Type": "application/json" },
  }).then(validateResponse);
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

const fetchAndShowComments = () => {
  fetch("/guest-book/comments")
    .then((res) => res.json())
    .then(showComments);
};

const fetchUserAndShow = () => {
  fetch("/login-status")
    .then((res) => res.json())
    .then(showUserName);
};

const main = () => {
  const form = document.querySelector("#comment-form");
  const logout = document.querySelector("#logout");

  logout.onclick = (e) => {
    e.preventDefault();
    submitLogoutRequest();
  };

  form.onsubmit = (e) => {
    e.preventDefault();
    const commentDetails = createCommentDetails();
    form.reset();
    submitComment(commentDetails);
  };

  fetchUserAndShow();

  fetchAndShowComments();
};

window.onload = main;

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
  const nameElement = createNameElement(comment["user-name"]);
  const dateElement = createDateElement(comment.timeStamp);
  const textElement = createTextElement(comment.text);

  const commentElement = document.createElement("p");
  commentElement.id = "comment";
  commentElement.append(dateElement, nameElement, textElement);

  return commentElement;
};

const createCommentElements = (comments) => comments.map(createCommentElement);

const createCommentDetails = () => {
  const userName = document.querySelector("#name-text-box").value;
  const text = document.querySelector("#comment-text-box").value;

  return { "user-name": userName, text };
};

const showComments = (comments) => {
  const commentsContainer = document.querySelector("#comments");

  const commentElements = createCommentElements(comments);
  commentsContainer.append(...commentElements);
};

const submitComment = (commentParams) => {
  const commentsContainer = document.querySelector("#comments");

  fetch("/pages/guest-book/comment", {
    method: "POST",
    body: JSON.stringify(commentParams),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((comment) => {
      const commentElement = createCommentElement(comment);
      commentsContainer.prepend(commentElement);
    });
};

const fetchAndShowComments = () => {
  fetch("/pages/guest-book/comments")
    .then((res) => res.json())
    .then(showComments);
};

const main = () => {
  const form = document.querySelector("#comment-form");

  form.onsubmit = (e) => {
    e.preventDefault();
    const commentDetails = createCommentDetails();
    form.reset();
    submitComment(commentDetails);
  };

  fetchAndShowComments();
};

window.onload = main;

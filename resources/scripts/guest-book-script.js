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
  const nameElement = createNameElement(comment.name);
  const dateElement = createDateElement(comment.date);
  const textElement = createTextElement(comment.comment);

  const commentElement = document.createElement("p");
  commentElement.id = "comment";
  commentElement.append(dateElement, nameElement, textElement);

  return commentElement;
};

const createCommentsElement = (comments) => comments.map(createCommentElement);

const fetchAndShow = () => {
  const commentsSection = document.querySelector("#comments");

  fetch("/pages/guest-book/comments")
    .then((res) => res.json())
    .then((body) => {
      const comments = createCommentsElement(body);
      console.log(comments);
      commentsSection.append(...comments);
    });
};

window.onload = fetchAndShow;

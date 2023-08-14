const createCommentsElement = (comments) => {
  const prefix = "<article id='comments'>";
  const suffix = "</article>";
  const commentsElement = comments.map((comment) => {
    return `<p><span>${comment.date}</span>
            <span><strong>${comment.name}</strong></span>
            <span>${comment.comment}</span></p>`;
  });

  return `${prefix} ${commentsElement.join("")} ${suffix}`;
};

module.exports = { createCommentsElement };

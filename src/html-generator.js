const createCommentsElement = (comments) => {
  return comments.map((comment) => {
    return `<p><span>${comment.date}</span>
            <span><strong>${comment.name}</strong></span>
            <span>${comment.comment}</span></p>`;
  });
};

module.exports = { createCommentsElement };

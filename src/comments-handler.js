class CommentsHandler {
  #fileSystem;
  #filePath;
  #comments;
  constructor(fileSystem, filePath) {
    this.#fileSystem = fileSystem;
    this.#filePath = filePath;
    this.#comments = [];
  }

  fetchComments() {
    this.#fileSystem.readFile(this.#filePath, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      this.#comments = JSON.parse(data);
    });
  }

  #storeComments() {
    this.#fileSystem.writeFile(
      this.#filePath,
      JSON.stringify(this.#comments),
      () => {}
    );
  }

  addComment(comment) {
    this.#comments.unshift(comment);
    this.#storeComments()
  }

  getComments() {
    return [...this.#comments];
  }
}

module.exports = { CommentsHandler };

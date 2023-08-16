class CommentsHandler {
  #fileSystem;
  #filePath;
  #comments;
  constructor(fileSystem, filePath) {
    this.#fileSystem = fileSystem;
    this.#filePath = filePath;
    this.#comments = [];
  }

  #isFilePresent() {
    return this.#fileSystem.existsSync(this.#filePath);
  }

  #storeComments(onCommentAdd) {
    this.#fileSystem.writeFile(
      this.#filePath,
      JSON.stringify(this.#comments),
      onCommentAdd
    );
  }

  init() {
    if (this.#isFilePresent()) {
      const data = this.#fileSystem.readFileSync(this.#filePath, "utf-8");
      this.#comments = JSON.parse(data);
      return;
    }

    this.#fileSystem.writeFileSync(
      this.#filePath,
      JSON.stringify(this.#comments)
    );
  }

  addComment(comment, onCommentAdd) {
    this.#comments.unshift(comment);
    this.#storeComments(onCommentAdd);
  }

  getComments() {
    return [...this.#comments];
  }
}

module.exports = { CommentsHandler };

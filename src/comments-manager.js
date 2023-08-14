class CommentsManager {
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

  #storeComments() {
    this.#fileSystem.writeFile(
      this.#filePath,
      JSON.stringify(this.#comments),
      () => {}
    );
  }

  fetchComments() {
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

  addComment(comment) {
    this.#comments.unshift(comment);
    this.#storeComments();
  }

  getComments() {
    return [...this.#comments];
  }
}

module.exports = { CommentsManager };

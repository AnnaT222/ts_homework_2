module.exports = class WrongDataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WrongDataException";
  }
};


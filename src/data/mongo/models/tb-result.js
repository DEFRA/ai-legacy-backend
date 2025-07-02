class TbResultOption {
  constructor(data = {}) {
    this.code = data.code;
    this.description = data.description;
  }

  static fromDocument(doc) {
    return new TbResultOption(doc);
  }
}

export { TbResultOption };

class TbStatusOption {
  constructor(data = {}) {
    this.code = data.code;
    this.description = data.description;
    this.regions = data.regions || data.validRegions || [];
  }

  static fromDocument(doc) {
    return new TbStatusOption(doc);
  }
}

export { TbStatusOption };

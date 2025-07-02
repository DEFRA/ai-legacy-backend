class FinishingUnitOption {
  constructor(data = {}) {
    this.unitType = data.unitType;
    this.regions = data.regions || data.validRegions || [];
  }

  static fromDocument(doc) {
    return new FinishingUnitOption(doc);
  }
}

export { FinishingUnitOption };

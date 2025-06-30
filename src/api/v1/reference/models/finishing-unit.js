class FinishingUnitOption {
  constructor (unitType, regions) {
    this.unitType = unitType
    this.regions = regions
  }

  static fromEntity (entity) {
    return new FinishingUnitOption(
      entity.unitType,
      entity.validRegions
    )
  }
}

export {
  FinishingUnitOption
}

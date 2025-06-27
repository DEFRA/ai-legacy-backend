class TbStatusOption {
  constructor (code, description, regions) {
    this.code = code
    this.description = description
    this.regions = regions
  }

  static fromEntity (entity) {
    return new TbStatusOption(
      entity.code,
      entity.description,
      entity.validRegions
    )
  }
}

export {
  TbStatusOption
}

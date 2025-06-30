class TbResultOption {
  constructor (code, description) {
    this.code = code
    this.description = description
  }

  static fromEntity (entity) {
    return new TbResultOption(
      entity.code,
      entity.description
    )
  }
}

export {
  TbResultOption
}

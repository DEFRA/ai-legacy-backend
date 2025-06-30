class AllocationSkipReasonOption {
  constructor (reason) {
    this.reason = reason
  }

  static fromEntity (entity) {
    return new AllocationSkipReasonOption(
      entity.reason
    )
  }
}

export {
  AllocationSkipReasonOption
}

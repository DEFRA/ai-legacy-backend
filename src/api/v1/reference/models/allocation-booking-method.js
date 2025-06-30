class AllocationBookingMethodOption {
  constructor (method) {
    this.method = method
  }

  static fromEntity (entity) {
    return new AllocationBookingMethodOption(
      entity.method
    )
  }
}

export {
  AllocationBookingMethodOption
}

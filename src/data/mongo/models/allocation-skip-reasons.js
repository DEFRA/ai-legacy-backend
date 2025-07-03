class AllocationSkipReasonOption {
  constructor (data = {}) {
    this.reason = data.reason
  }

  static fromDocument (doc) {
    return new AllocationSkipReasonOption(doc)
  }
}

export { AllocationSkipReasonOption }

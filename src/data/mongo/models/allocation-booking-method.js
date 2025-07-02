class AllocationBookingMethodOption {
  constructor(data = {}) {
    this.method = data.method;
  }

  static fromDocument(doc) {
    return new AllocationBookingMethodOption(doc);
  }
}

export { AllocationBookingMethodOption };

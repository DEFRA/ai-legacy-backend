class DuplicateCphError extends Error {
  constructor (cph) {
    super(`Duplicate CPH '${cph}' already exists`)
    this.name = 'DuplicateCphError'
    this.statusCode = 409
  }
}

export { DuplicateCphError }

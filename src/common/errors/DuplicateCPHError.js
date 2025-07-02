/**
 * Custom error class for duplicate CPH violations
 * Thrown when attempting to create a holding with an already existing CPH number
 */
class DuplicateCPHError extends Error {
  constructor(cph, message = null) {
    const errorMessage = message || `Holding with CPH '${cph}' already exists`;
    super(errorMessage);

    this.name = "DuplicateCPHError";
    this.statusCode = 409;
    this.cph = cph;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DuplicateCPHError);
    }
  }
}

export { DuplicateCPHError };

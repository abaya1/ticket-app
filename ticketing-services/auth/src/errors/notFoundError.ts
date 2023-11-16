import { CustomError } from "./customError";

export class NotFoundError extends CustomError {

    public statusCode = 404
    public reason = 'route not found'

    constructor() {
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{message: this.reason}]
    }
}
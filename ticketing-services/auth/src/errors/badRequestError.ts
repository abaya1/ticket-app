import { CustomError } from "./customError";

export class BadRequestError extends CustomError {

    public statusCode = 400

    constructor(message : string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{message: this.message}]
    }
}
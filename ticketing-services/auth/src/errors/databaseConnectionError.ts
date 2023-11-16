import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {

    public statusCode = 500
    public reason = 'error connecting to database'

    constructor() {
    super('error connecting to database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [{message: this.reason}]
    }
}
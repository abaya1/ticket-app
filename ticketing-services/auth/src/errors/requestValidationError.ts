import { ValidationError } from "express-validator";
import { CustomError } from "./customError";
export class RequestValidationError extends CustomError {

    public statusCode = 400
    
    constructor(public errors: ValidationError[]) {
    super(errors[0].msg);

    Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        const formattedErrors = this.errors.map(error => {
            if(error.type === 'field'){
                return {message: error.msg, field: error.path}
            }
            else {
                return {message: error.msg};
                
            }
        })

        return formattedErrors;
    }
}
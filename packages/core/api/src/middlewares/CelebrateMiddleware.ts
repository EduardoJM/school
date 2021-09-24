import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { codes, messages } from '../constants/errors';

export function errors() {
    return (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (!isCelebrateError(err)) {
            return next(err);
        }

        // TODO: create a dictionary to translate the errors field names
        let errorMessages: string[] = [];
        for (const [segment, joiError] of err.details.entries()) {
            errorMessages.push(joiError.message);
        }
        return response.status(400).json({
            error: codes.VALIDATION_FAILED,
            message: errorMessages.length > 0 ? errorMessages[0] : messages.VALIDATION_FAILED,
        });
    };
}

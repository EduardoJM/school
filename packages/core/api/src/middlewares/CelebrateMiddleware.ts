import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';

export function errors() {
    return (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (!isCelebrateError(err)) {
            return next(err);
        }

        // TODO: create a dictionary to translate the errors field names
        let messages: string[] = [];
        for (const [segment, joiError] of err.details.entries()) {
            messages.push(joiError.message);
        }
        // TODO: add a standard to status and json response
        return response.status(400).json({
            errorCode: 'VALIDATION_ERROR',
            error: messages,
        });
    };
}

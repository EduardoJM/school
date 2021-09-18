import { Request, Response, NextFunction, response } from 'express';
import { celebrate, isCelebrateError } from 'celebrate';
import { messages } from 'joi-translation-pt-br';
import { SubjectRequestBodySchema, StudentCreateRequestBodySchema } from '../schemas';

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

export const SubjectCreateBodyValidation = celebrate(
    { body: SubjectRequestBodySchema },
    { messages, abortEarly: false, convert: true },
);

export const StudentCreateBodyValidation = celebrate(
    { body: StudentCreateRequestBodySchema },
    { messages, abortEarly: false, convert: true },
);

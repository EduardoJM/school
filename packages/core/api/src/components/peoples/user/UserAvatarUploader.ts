import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import path from 'path';
import crypto from 'crypto';
import {
    HTTP_400_BAD_REQUEST,
    HTTP_413_PAYLOAD_TOO_LARGE,
    HTTP_500_INTERNAL_SERVER_ERROR,
    messages,
    codes,
    responses,
} from '../../../constants';

class UserAvatarUploaderMulterError extends Error {
    public readonly statusCode: number;
    public readonly code: string;

    constructor(statusCode: number, code: string, description: string) {
        super(description);
        this.statusCode = statusCode;
        this.code = code;

        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

        Error.captureStackTrace(this);
    }
};

const UserAvatarUploaderMulter = multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', '..', 'media', 'images', 'avatars'),
        filename: function(request, file, callback) {
            const splited = file.originalname.split('.');
            const hash = crypto.randomBytes(6).toString('hex');

            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();
            const hour = today.getHours();
            const minutes = today.getMinutes();
            const seconds = today.getSeconds();

            const fileName = `${year}_${month}_${day}_${hour}_${minutes}_${seconds}_${hash}.${splited.pop()}`;
            callback(null, fileName);
        },
    }),
    limits: {
        files: 1,
        fileSize: 5 * 1024 * 1024, // 5mb
    },
    fileFilter: function(request, file, callback) {
        const isAccepted = [
            'image/png',
            'image/jpg',
            'image/jpeg'
        ].find(accept => accept == file.mimetype);
        if (!isAccepted) {
            return callback(new UserAvatarUploaderMulterError(
                HTTP_400_BAD_REQUEST,
                codes.UPLOADER_INVALID_FILE_TYPE,
                messages.UPLOADER_INVALID_FILE_TYPE,
            ));
        }
        callback(null, true);
    }
});

export function UserAvatarUploader(request: Request, response: Response, next: NextFunction) {
    const upload = UserAvatarUploaderMulter.single('avatar');
    return upload(request, response, (err: any) => {
        if (err) {
            if (err instanceof UserAvatarUploaderMulterError) {
                return response.status(err.statusCode).json({
                    error: err.code,
                    message: err.message,
                });
            } else if (err instanceof MulterError) {
                return response.status(HTTP_413_PAYLOAD_TOO_LARGE).json(responses.UPLOADER_FILE_TOO_LARGE_5MB);
            }
            return response.status(HTTP_500_INTERNAL_SERVER_ERROR).send(responses.UNKNOWN_ERROR);
        }
        if (request.file) {
            request.body.avatar = path.basename(request.file.path);
        }
        return next();
    });
}

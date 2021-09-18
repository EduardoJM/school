export const codes = {
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    EMAIL_ALREADY_USED: 'EMAIL_ALREADY_USED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',

    AUTH_ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
    AUTH_WRONG_PASSWORD: 'AUTH_WRONG_PASSWORD',
};

export const messages = {
    EMAIL_ALREADY_USED: 'Já existe uma conta cadastrada com esse e-mail',
    UNKNOWN_ERROR: 'Houve um erro desconhecido no servidor, entre em contato com o suporte.',
    
    AUTH_ACCOUNT_NOT_FOUND: 'Não foi encontrada uma conta associada a esse e-mail',
    AUTH_WRONG_PASSWORD: 'E-mail e senha não conferem',
};

export const responses = {
    EMAIL_ALREADY_USED: {
        error: codes.EMAIL_ALREADY_USED,
        message: messages.EMAIL_ALREADY_USED,
    },
    UNKNOWN_ERROR: {
        error: codes.UNKNOWN_ERROR,
        message: messages.UNKNOWN_ERROR,
    },

    AUTH_ACCOUNT_NOT_FOUND: {
        error: codes.AUTH_ACCOUNT_NOT_FOUND,
        message: messages.AUTH_ACCOUNT_NOT_FOUND,
    },
    AUTH_WRONG_PASSWORD: {
        error: codes.AUTH_WRONG_PASSWORD,
        message: messages.AUTH_WRONG_PASSWORD,
    },
};

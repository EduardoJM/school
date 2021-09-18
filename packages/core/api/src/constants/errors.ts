export const codes = {
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    EMAIL_ALREADY_USED: 'EMAIL_ALREADY_USED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

export const messages = {
    EMAIL_ALREADY_USED: 'Já existe uma conta cadastrada com esse e-mail',
    UNKNOWN_ERROR: 'Houve um erro desconhecido no servidor, entre em contato com o suporte.',
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
};

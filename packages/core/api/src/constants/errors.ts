export const codes = {
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    EMAIL_ALREADY_USED: 'EMAIL_ALREADY_USED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',

    AUTH_ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
    AUTH_WRONG_PASSWORD: 'AUTH_WRONG_PASSWORD',
    AUTH_NO_TOKEN: 'AUTH_NO_TOKEN',
    AUTH_WRONG_TOKEN_FORMAT: 'AUTH_WRONG_TOKEN_FORMAT',
    AUTH_EXPIRED_TOKEN: 'AUTH_EXPIRED_TOKEN',
    AUTH_USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
    AUTH_NO_LOGGED_USER: 'AUTH_NO_LOGGED_USER',
    AUTH_ONLY_ADMIN: 'AUTH_ONLY_ADMIN',
    AUTH_ONLY_STUDENT: 'AUTH_ONLY_STUDENT',
};

export const messages = {
    EMAIL_ALREADY_USED: 'Já existe uma conta cadastrada com esse e-mail',
    UNKNOWN_ERROR: 'Houve um erro desconhecido no servidor, entre em contato com o suporte.',
    
    AUTH_ACCOUNT_NOT_FOUND: 'Não foi encontrada uma conta associada a esse e-mail',
    AUTH_WRONG_PASSWORD: 'E-mail e senha não conferem',
    AUTH_NO_TOKEN: 'Credenciais de autenticação não foram enviadas',
    AUTH_WRONG_TOKEN_FORMAT: 'As credenciais de autenticação estão em formato incorreto',
    AUTH_EXPIRED_TOKEN: 'As credenciais de autenticação não são mais válidas',
    AUTH_USER_NOT_FOUND: 'Não existe um usuário válido para as credenciais fornecidas',
    AUTH_NO_LOGGED_USER: 'Não há um usuário autenticado',
    AUTH_ONLY_ADMIN: 'Você precisa ser um administrador para acessar',
    AUTH_ONLY_STUDENT: 'Você precisa ser um aluno para acessar',
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
    AUTH_NO_TOKEN: {
        error: codes.AUTH_NO_TOKEN,
        message: messages.AUTH_NO_TOKEN,
    },
    AUTH_WRONG_TOKEN_FORMAT: {
        error: codes.AUTH_WRONG_TOKEN_FORMAT,
        message: messages.AUTH_WRONG_TOKEN_FORMAT,
    },
    AUTH_EXPIRED_TOKEN: {
        error: codes.AUTH_EXPIRED_TOKEN,
        message: messages.AUTH_EXPIRED_TOKEN,
    },
    AUTH_USER_NOT_FOUND: {
        error: codes.AUTH_USER_NOT_FOUND,
        message: messages.AUTH_USER_NOT_FOUND,
    },
    AUTH_NO_LOGGED_USER: {
        error: codes.AUTH_NO_LOGGED_USER,
        message: messages.AUTH_NO_LOGGED_USER,
    },
    AUTH_ONLY_ADMIN: {
        error: codes.AUTH_ONLY_ADMIN,
        message: messages.AUTH_ONLY_ADMIN,
    },
    AUTH_ONLY_STUDENT: {
        error: codes.AUTH_ONLY_STUDENT,
        message: messages.AUTH_ONLY_STUDENT,
    },
};

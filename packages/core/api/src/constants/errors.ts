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
    AUTH_NO_PERMISSION: 'AUTH_NO_PERMISSION',

    UPLOADER_INVALID_FILE_TYPE: 'UPLOADER_INVALID_FILE_TYPE',
    UPLOADER_FILE_TOO_LARGE_1MB: 'UPLOADER_FILE_TOO_LARGE_1MB',
    UPLOADER_FILE_TOO_LARGE_5MB: 'UPLOADER_FILE_TOO_LARGE_5MB',
    
    RESOURCE_NAME_ALREADY_USED: 'RESOURCE_NAME_ALREADY_USED',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',

    DATABASE_NOT_CONNECTED: 'DATABASE_NOT_CONNECTED',
};

export const messages = {
    VALIDATION_FAILED: 'Dados enviados são inválidos',
    EMAIL_ALREADY_USED: 'Já existe uma conta cadastrada com esse e-mail',
    UNKNOWN_ERROR: 'Houve um erro desconhecido no servidor, entre em contato com o suporte.',
    
    AUTH_ACCOUNT_NOT_FOUND: 'Não foi encontrada uma conta associada a esse e-mail',
    AUTH_WRONG_PASSWORD: 'E-mail e senha não conferem',
    AUTH_NO_TOKEN: 'Credenciais de autenticação não foram enviadas',
    AUTH_WRONG_TOKEN_FORMAT: 'As credenciais de autenticação estão em formato incorreto',
    AUTH_EXPIRED_TOKEN: 'As credenciais de autenticação não são mais válidas',
    AUTH_USER_NOT_FOUND: 'Não existe um usuário válido para as credenciais fornecidas',
    AUTH_NO_LOGGED_USER: 'Não há um usuário autenticado',
    AUTH_NO_PERMISSION: 'Você não tem permissões para executar essa ação',

    UPLOADER_INVALID_FILE_TYPE: 'Tipo de arquivo não suportado',
    UPLOADER_FILE_TOO_LARGE_1MB: 'O tamanho máximo de arquivo suportado é 1mb',
    UPLOADER_FILE_TOO_LARGE_5MB: 'O tamanho máximo de arquivo suportado é 5mb',

    RESOURCE_NAME_ALREADY_USED: 'Esse nome já está sendo utilizado por outro item',
    RESOURCE_NOT_FOUND: 'Recurso não encontrado',

    DATABASE_NOT_CONNECTED: 'Houve um erro no banco de dados, entre em contato com o suporte.',
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
    AUTH_NO_PERMISSION: {
        error: codes.AUTH_NO_PERMISSION,
        message: messages.AUTH_NO_PERMISSION,
    },
    RESOURCE_NAME_ALREADY_USED: {
        error: codes.RESOURCE_NAME_ALREADY_USED,
        message: messages.RESOURCE_NAME_ALREADY_USED,
    },
    RESOURCE_NOT_FOUND: {
        error: codes.RESOURCE_NOT_FOUND,
        message: messages.RESOURCE_NOT_FOUND,
    },
    UPLOADER_FILE_TOO_LARGE_1MB: {
        error: codes.UPLOADER_FILE_TOO_LARGE_1MB,
        message: messages.UPLOADER_FILE_TOO_LARGE_1MB,
    },
    UPLOADER_FILE_TOO_LARGE_5MB: {
        error: codes.UPLOADER_FILE_TOO_LARGE_5MB,
        message: messages.UPLOADER_FILE_TOO_LARGE_5MB,
    },
    DATABASE_NOT_CONNECTED: {
        error: codes.DATABASE_NOT_CONNECTED,
        message: messages.DATABASE_NOT_CONNECTED,
    },
};

export interface AuthRequestBody {
    username: string;
    password: string;
}

export interface AuthResponseBody {
    refresh: string;
    access: string;
}

export interface AuthRefreshRequestBody {
    refresh: string;
}

export interface AuthRefreshResponseBody {
    access: string;
}

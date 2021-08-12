export function displayAPIError(err: any): string {
    let errorMessage = "Ops! Tivemos um erro desconhecido.";
    if (err.response && err.response.data && err.response.data.detail) {
        errorMessage = err.response.data.detail;
    }
    return errorMessage;
}

export function getDisplayErrorMessage(
    err: any,
    defaultMessage: string = 'Houve um erro desconhecido!',
) {
    if (!err) {
        return defaultMessage;
    }
    if (!err.response) {
        return defaultMessage;
    }
    if (!err.response.data) {
        return defaultMessage;
    }
    if (!err.response.data.message) {
        return defaultMessage;
    }
    return err.response.data.message;
}
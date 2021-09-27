const defaults = {
    port: 3333,
    
    sqlHost: 'localhost',
    sqlPort: 3306,
    sqlUser: 'root',
    sqlPassword: 'root',
    sqlDatabase: 'inventare',

    jwtSecret: '762b9429b9543322317131a1caeea751',
    
    pagSeguroSandbox: true,
    pagSeguroBaseURL: 'https://ws.sandbox.pagseguro.uol.com.br/v2/',
    pagSeguroBaseURL3: 'https://ws.sandbox.pagseguro.uol.com.br/v3/',
    pagSeguroEmail: 'eduardo_y05@outlook.com',
    pagSeguroToken: 'E7A2E8CE97E24CA89D0EE682085B3B41',
    pagSeguroNotificationUrl: null,

    imageBaseUrl: 'http://localhost:3333/media/',
};
export default defaults;

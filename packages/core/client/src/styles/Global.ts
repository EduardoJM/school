import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: #000;
        color: #FFF;
        font-family: 'Montserrat', sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Cardo', serif;
        font-weight: bold;
    }

    .container {
        width: 90%;
        max-width: 1300px;
        margin: 0 auto;
    }
`;

export default GlobalStyles;

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
        line-height: 1.6;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        line-height: 1.3;
    }

    h1 { font-size: 4.2rem; line-height: 110%; margin: calc(4.2rem / 1.5) 0 calc(4.2rem / 2.5) 0;}
    h2 { font-size: 3.56rem; line-height: 110%; margin: calc(3.56rem / 1.5) 0 calc(3.56rem / 2.5) 0;}
    h3 { font-size: 2.92rem; line-height: 110%; margin: calc(2.92rem / 1.5) 0 calc(2.92rem / 2.5) 0;}
    h4 { font-size: 2.28rem; line-height: 110%; margin: calc(2.28rem / 1.5) 0 calc(2.28rem / 2.5) 0;}
    h5 { font-size: 1.64rem; line-height: 110%; margin: calc(1.64rem / 1.5) 0 calc(1.64rem / 2.5) 0;}
    h6 { font-size: 1.15rem; line-height: 110%; margin: calc(1.15rem / 1.5) 0 calc(1.15rem / 2.5) 0;}

    .container {
        width: 90%;
        margin: 0 auto;
    }
`;

export default GlobalStyles;

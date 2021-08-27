import styled from 'styled-components';

export const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 50px 0;

    min-height: calc(100vh - 64px);
    
    background-image: url(/header_girl.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right bottom;

    @media (max-width: 600px) {
        flex-direction: column;
        background-image: none;
    }
`;

export const HeaderLeft = styled.div`
    background: rgba(0, 0, 0, 0.2);

    flex: 0 0 50%;
    
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;

    @media (max-width: 600px) {
        flex: 1;
    }
`;

export const HeaderRight = styled.div`
    background: rgba(0, 0, 0, 0.2);

    flex: 0 0 50%;

    @media (max-width: 600px) {
        flex: none;
        height: 300px;

        background-image: url(/header_girl.png);
        background-size: 110% auto;
        background-repeat: no-repeat;
        background-position: right top;
    }
`;

export const HeaderTitle = styled.h1`
    color: #FFF;

    @media (max-width: 600px) {
        text-align: center;
    }
`;

export const HeaderSubtitle = styled.h3`
    color: #FFF;

    @media (max-width: 600px) {
        text-align: center;
        margin-bottom: 80px;
    }
`;

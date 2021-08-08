import styled, { keyframes } from 'styled-components';

const LoadingAnimation = keyframes`
    0%,
    80%,
    100% {
        box-shadow: 0 0;
        height: 4em;
    }
    40% {
        box-shadow: 0 -2em;
        height: 5em;
    }
`;

export const LoadingIndicator = styled.div`
    background: #ffffff;
    animation: ${LoadingAnimation} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;

    color: #ffffff;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    transform: translateZ(0);
    animation-delay: -0.16s;

    &:before,
    &:after {
        background: #ffffff;
        animation: ${LoadingAnimation} 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
        
        position: absolute;
        top: 0;
        content: '';
    }
    &:before {
        left: -1.5em;
        animation-delay: -0.32s;
    }
    &:after {
        left: 1.5em;
    }
`;

export const LoadingPage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 4000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

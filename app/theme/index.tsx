import { createGlobalStyle } from 'styled-components';
export const ThemedGlobalStyle = createGlobalStyle`
    body, html, * {
        box-sizing: border-box;
        font-family: 'Roboto Mono', monospace;
    }
    html {
    }
    body {
        min-height: 100vh;
        width: 100%;
        margin: 0;
    }
`;

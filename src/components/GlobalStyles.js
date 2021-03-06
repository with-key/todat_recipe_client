import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    a {
        text-decoration:none;
        color:inherit;
    }
    * {
        box-sizing:border-box;
        
    }
    html {
        font-size:82.5%;
        margin : 0;
        padding: 0;
        
    }
    body{
        font-family:--apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top : 90px;
        background-color:#F8F8F8;
        
    }
`;

export default GlobalStyles;

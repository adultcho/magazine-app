import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

 

  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh - 60px;
    min-width: 100vw - 1000px;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    border: none;
    background-color: transparent;
    outline: none;
  }
  input {
    font-size: 17px;
    border-bottom: 1px solid teal;
    transition: all 0.3s ease-in-out;
    &:focus {
      box-shadow: 0 3px 7px -3px;
      background-color: snow;
    }
  }
`;

export default GlobalStyles;

import { createGlobalStyle } from "styled-components";
import THEME from "../constants/theme";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${THEME.BACKGROUND};
    color: ${THEME.BLACK};
    font: 300 18px "IBM Plex Sans KR", sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    font: inherit;
    background: rgba(0, 0, 0, 0);
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none;
  }

  .material-symbols-outlined {
    font-variation-settings:
      "FILL" 0,
      "wght" 100,
      "GRAD" 0,
      "opsz" 20
  }
`;

export default GlobalStyle;

import styled from "styled-components";
import THEME from "../../constants/theme";

const Button = styled.button`
  height: 3rem;
  padding: 0 1.2rem;
  background: ${({ fontTheme }) => fontTheme ?? THEME.COLORS.NAVY};
  color: ${({ fontColor }) => fontColor ?? THEME.COLORS.WHITE};
  font-weight: 500;
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;;
`;

export default Button;

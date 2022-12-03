import styled from "styled-components";
import THEME from "../../constants/theme";

const BarButton = styled.button`
  display: block;
  width: 100%;
  height: 3rem;
  padding-left: 1rem;
  background: ${THEME.COLORS.DARK_NAVY};
  color: ${THEME.COLORS.WHITE};
  text-align: left;
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: ${THEME.BOX_SHADOW};

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: ${THEME.COLORS.BLACK};
  }
`;

export default BarButton;

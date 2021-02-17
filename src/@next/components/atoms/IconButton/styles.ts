import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  cursor: pointer;

  width: ${props => `${props.theme.iconButton.size}px`};
  height: ${props => `${props.theme.iconButton.size}px`};
  background-color: ${props => props.theme.iconButton.backgroundColor};

  border-radius: 50%;
  border-width: 0;

  transition: 0.0s;

  svg {
    display: block;
    path {
      transition: 0.0s;
    }
  }

  :hover {
    background-color: ${props => props.theme.iconButton.hoverBackgroundColor};
    svg {
      path {
        fill: ${props => props.theme.iconButton.hoverForegroundColor};
      }
    }
  }
`;

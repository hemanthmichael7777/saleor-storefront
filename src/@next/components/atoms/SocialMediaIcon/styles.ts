import { styled } from "@styles";
import { spacer } from "@styles/constants";

export const Wrapper = styled.div`
  padding: ${props => `${props.theme.spacing.spacer} ${spacer / 2}rem`};
`;

export const Link = styled.a`
  path {
    transition: 0.0s;
  }

  &:hover {
    path {
      fill: ${props => props.theme.colors.primary};
    }
  }
`;

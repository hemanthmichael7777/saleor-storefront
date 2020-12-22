import { media, styled } from "@styles";

// background: ${props => props.theme.colors.light};
// :hover {
//  background-color: ${props => props.theme.colors.hoverLightBackground};
// }


export const Wrapper = styled.div<{ selected: boolean; disabled: boolean }>`
  padding: 10px;
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;

  ${media.largeScreen`
    padding: 10px;
  `}
`;

export const Content = styled.div`
  padding: 2px 2px;
`;
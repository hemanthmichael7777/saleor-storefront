import { media, styled } from "@styles";

// background: ${props => props.theme.colors.light};
// :hover {
//  background-color: ${props => props.theme.colors.hoverLightBackground};
// }


export const Wrapper = styled.div<{ selected: boolean; disabled: boolean }>`
  
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;
  margin-right: 2px;

  ${media.largeScreen`
    padding: 10px;
  `}
`;

export const Content = styled.div`
  padding: 2px 2px;
`;
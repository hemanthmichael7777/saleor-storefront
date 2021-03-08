import { styled } from "@styles";

export const Wrapper = styled.div`
  height: 100%;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const HeaderContent = styled.div`
  color: ${props => props.theme.colors.dark};
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;
export const FooterContent = styled.div`
  > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    margin-right: 0.6rem;
  }
`;

export const MenuItem = styled.div`
  border-radius: 6px;
  padding-left: .75rem;
  padding-right: .75rem;
  padding-top: .21rem;
  padding-bottom: .21rem;
  :hover {
    background-color: ${props => props.theme.colors.primaryLight};
    color: ${props => props.theme.colors.lightFont};
  }
`;

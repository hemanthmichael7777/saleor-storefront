import { media, styled } from "@styles";

export const Wrapper = styled.div`
  margin-bottom: 1.4rem;
  ${media.smallScreen`
    margin-top: 25rem;
    `}
`;

export const Bar = styled.div`
  height: 3.3rem;
  background-color: #431933;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  font-size: ${props => props.theme.typography.smallFontSize};
  margin-top: 2rem;
  margin-bottom: 1.4rem;
  border-radius: 6px;
  color: white;
  @media(max-width: 540px) {
    height: 3.3rem;
    background-color: #431933;
    padding: 0 1rem;
    font-size: ${props => props.theme.typography.baseFontSize};
    margin-top: 2rem;
    margin-bottom: 1.4rem;
    border-radius: 6px;
    color: white;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  height: 1.2rem;
  @media(max-width: 540px) {
    height: 2.4rem;
  }
`;

export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  @media(max-width: 540px) {
    font-size: ${props => props.theme.typography.baseFontSize};
  }
`;

export const Clear = styled.button`
  padding-left: 2rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont}; 
  @media(max-width: 540px) {
    font-size: ${props => props.theme.typography.baseFontSize};
  }
`;
export const Element = styled.span`
  padding-left: 2rem;
  @media(max-width: 540px) {
    padding-left: 1rem;
  }
`;

export const Filters = styled.span`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0.6rem;
`;

export const Label = styled.span`
  color: white;
`;

export const Sort = styled.div`
  width: 12rem;
  display: inline-block;
`;

export const FiltersChipsWrapper = styled.div`
  > div {
    margin: 0.4rem;
    color: ${props => props.theme.colors.lightFont}; 
  }
`;

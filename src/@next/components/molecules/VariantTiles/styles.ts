import { DefaultTheme, styled } from "@styles";


// todo move colors into the theme


type WrapperProps = {
  active: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

type ContentProps = {
  selected: boolean;
};

const getEdgeColor = (
  { active, disabled, theme }: WrapperProps,
  hovered = false
) => {
  if (disabled) {
    return theme.colors.disabled;
  }

  return active ? theme.colors.secondary : theme.colors.dark;
};


export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  color: ${props => getEdgeColor(props)};
`;

export const VariantTileHeader = styled.div`
  color: black;
`;

const getBgColor = (
  { selected }: ContentProps,
  hovered = false
) => {
  if (selected) {
    return '#666666';
  }

  return '#EFEFEF';
};

const getFontColor = (
  { selected }: ContentProps,
  hovered = false
) => {
  if (selected) {
    return 'white';
  }

  return 'black';
};

export const VariantTileContent = styled.div<ContentProps>`
  color: ${props => getFontColor(props)};
  background-color: ${props => getBgColor(props)};
  padding: 10px 14px;
  border: 1px solid #D3D3D3;
`;


export const VariantTileContentImage = styled.div<ContentProps>`
  color: ${props => getFontColor(props)};
  background-color: ${props => getBgColor(props)};
  padding: 10px 14px;
  border: 1px solid #D3D3D3;
`;
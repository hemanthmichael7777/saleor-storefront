import { DefaultTheme, styled } from "@styles";


// todo move colors into the theme


type WrapperProps = {
  active: boolean;
  disabled: boolean;
  theme: DefaultTheme;
};

type ContentProps = {
  selected: boolean;
  disabled: boolean;
  tSize: string | null;
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
  width: 100%;
  max-width: 500px;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const getBgColor = (
  { selected }: ContentProps,
  hovered = false
) => {
  if (selected) {
    return '#666666';
  }

  return '#E9E7E8';
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

const getOpacity = (
  { disabled }: ContentProps
) => {
  if (disabled) {
    return '0.4';
  }

  return '1';
};

const getOpacityImg = (
  { disabled }: ContentProps
) => {
  if (disabled) {
    return '0.2';
  }

  return '1';
};

const getCursor = (
  { disabled }: ContentProps
) => {
  if (disabled) {
    return 'default';
  }

  return 'pointer';
};

export const VariantTileContent = styled.div<ContentProps>`
  color: ${props => getFontColor(props)};
  background-color: ${props => getBgColor(props)};
  padding: 8px 12.8px;
  border: 1.3px solid #323436;
  opacity: ${props => getOpacity(props)};
  cursor: ${props => getCursor(props)};
  font-size: 14px;
  border-radius: 6px;
`;

const getTSize = (props: ContentProps) => {
  if(props.tSize === "small"){
    return "36px";
  }
  return "50px";
}


export const VariantTileContentImage = styled.div<ContentProps>`
  color: ${props => getFontColor(props)};
  height: ${props => getTSize(props)};
  opacity: ${props => getOpacityImg(props)};
  cursor: ${props => getCursor(props)};
`;

export const VariantTileImage = styled.img`
  
`;
import { styled } from "@styles";

export const AddToCartSelection = styled.div`
  width: 100%;
`;

export const ProductNameHeader = styled.h3`
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const ProductPricing = styled.h4`
  padding-bottom: ${props => props.theme.spacing.spacer};
  font-size: ${props => props.theme.typography.baseFontSize};
  border-bottom: 1px solid rgba(208,208,208, 0.4);
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const QuantityInput = styled.div`
  margin-top:0px;
  padding-top: 20px;
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
`;

export const ProductDescription = styled.div`
  padding-top: 6px;
  margin-top: 20px;
  font-size: 12px;
  border-top: 1px solid rgba(208,208,208, 0.4);
`;
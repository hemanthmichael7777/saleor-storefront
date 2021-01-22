import { styled } from "@styles";

export const AddToCartSelection = styled.div`
  width: 96%;
  margin-left: 8px;
`;

export const ProductNameHeader = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const ProductPricing = styled.h4`
  padding-bottom: ${props => props.theme.spacing.spacer};
  font-size: ${props => props.theme.typography.baseFontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  border-bottom: 1.4px solid black;
  margin-top: 16px;
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 10px;

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
  float: right;
  font-size: 15px;
  margin-top: -39px;
  margin-right: 4px;
`;

export const ProductDescription = styled.div`
  padding-top: 2px;
  margin-top: 16px;
  font-size: 12.5px;
  border-bottom: 1.4px solid black;
  padding-bottom: 16px;
`;

export const Features = styled.div`
  padding-top: 6px;
  margin-top: 20px;
  font-size: 12px;
  border-top: 1px solid rgba(208,208,208, 0.4);
  white-space: pre-line;
`

export const FHeader = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
`

export const FittingGuideLink = styled.div`
  text-decoration: underline;
  font-size: 12px;
  margin-top: 14px;
  a {
    font-weight: bold;
    color: #323436;
    opacity: 0.7;
  }
`;

export const QuantityInputHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-top: 14px;
`;
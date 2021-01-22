import { styled } from "@styles";

export const TextFieldStandard = styled.div`
  margin-bottom: ${props => props.theme.spacing.fieldSpacer};
  position: relative;
  margin-top: -10px;
`;
TextFieldStandard.displayName = "S.TextField";

export const HelpText = styled.span`
  color: ${props => props.theme.input.labelColor};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorMessages = styled.div`
  position: absolute;
  top: 100%;
`;

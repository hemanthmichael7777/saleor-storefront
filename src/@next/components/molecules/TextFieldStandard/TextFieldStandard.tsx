import React from "react";

import { ErrorMessage, InputStandard } from "@components/atoms";
import * as S from "./styles";
import { IProps } from "./types";

export const TextFieldStandard: React.FC<IProps> = ({
  errors,
  helpText,
  ...rest
}: IProps) => {
  const hasErrors = !!(errors && errors.length);

  return (
    <>
      <S.TextFieldStandard>
        <InputStandard {...rest} error={hasErrors} />
        <S.ErrorMessages>
          <ErrorMessage errors={errors} />
          {helpText && <S.HelpText>{helpText}</S.HelpText>}
        </S.ErrorMessages>
      </S.TextFieldStandard>
    </>
  );
};

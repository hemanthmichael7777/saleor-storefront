import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const VariantTile: React.FC<IProps> = ({
  children,
  selected,
  disabled,
  onClick,
  tSize = "normal"
}: IProps) => {

  return (
    <S.Wrapper
      selected={!!selected}
      disabled={!!disabled}
      onClick={onClick}
    >
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
};
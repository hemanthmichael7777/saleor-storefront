import React from "react";

import { VariantTile } from "../VariantTile/VariantTile";

import * as S from "./styles";
import { IProps } from "./types";

export const VariantTiles: React.FC<IProps> = ({
  content= null,
  disabled = false,
  label,
  value,
  onSelect,
  options = [],
  disabledOptions = [],
  selectedOptions = [],
  ...props
}: IProps) => {
  const elementRef = React.useRef(null);
  const [active, setActive] = React.useState(false);


  const vTiles = options.map(option => {
    const isSelected = selectedOptions.some(
      value => value === option.value
    );
    const isDisabled = disabledOptions.some(
      value => value === option.value
    );

    return (
      <VariantTile
        selected={isSelected}
        disabled={isDisabled}
        onClick={() => onSelect(option.value)}
      >
        <S.VariantTileContent selected={isSelected}>
          {option.label}
        </S.VariantTileContent>
      </VariantTile>
    );
  });

  return (
    <S.Wrapper active={true} disabled={false}>
      {/*<S.VariantTileHeader>
          {label}
      </S.VariantTileHeader>*/}
      {vTiles}
    </S.Wrapper>
  );
};

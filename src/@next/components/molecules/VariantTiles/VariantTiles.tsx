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

    var c = <S.VariantTileContent selected={isSelected}>
      {option.label}
    </S.VariantTileContent>;

    if(option.image !== ""){
      c = <S.VariantTileContentImage selected={isSelected}>
        <img src={option.image} style={{width: "50px"}}></img>
      </S.VariantTileContentImage>;
    }

    return (
      <VariantTile
        selected={isSelected}
        disabled={isDisabled}
        onClick={() => onSelect(option.value)}
      >
        {c}
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

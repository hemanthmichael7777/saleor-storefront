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
  tSize = "normal",
  onHover,
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

    var c = <S.VariantTileContent selected={isSelected} disabled={isDisabled} tSize="normal">
      {option.label}
    </S.VariantTileContent>;

    if(option.image !== ""){
      var w = "48px";
      if (tSize === "small"){
        w = "34px";
      }
      var r = "6px";
      var b = "";
      if(isSelected){
        b = "4px solid #06A09E";
        if (tSize === "small"){
          b = "2px solid #06A09E";
        }
      }
      c = <S.VariantTileContentImage selected={isSelected} disabled={isDisabled} tSize={tSize}>
        <img 
          src={option.image} 
          style={{width: w, height: w, borderRadius: r, border: b}}>
        </img>
      </S.VariantTileContentImage>;
    }

    return (
      <VariantTile
        selected={isSelected}
        disabled={isDisabled}
        onClick={() => onSelect(option.value)}
        onHover={() => onSelect(option.value)}
        key={"key-" + option.value}
        tSize={tSize}
      >
        {c}
      </VariantTile>
    );
  });

  return (
    <S.Wrapper active={true} disabled={false}>
      {vTiles}
    </S.Wrapper>
  );
};

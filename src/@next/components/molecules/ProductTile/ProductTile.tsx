import React from "react";

import { TaxedMoney } from "@components/containers";
import { Link } from "react-router-dom";
import { Thumbnail } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product, link, key }: IProps) => {
  const price =
    product.pricing &&
      product.pricing.priceRange &&
      product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <S.Wrapper>
      <Link to={link} key={key}>
        <S.Image data-test="productThumbnail">
          <Thumbnail source={product} />
        </S.Image>
      </Link>
      <S.Title data-test="productTile">{product.name}</S.Title>
      <S.Price data-test="productPrice">
        <TaxedMoney taxedMoney={price} />
      </S.Price>
    </S.Wrapper>


  );
};

import React from "react";
import { FormattedMessage } from "react-intl";

import { Button, DefaultLoader } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

import { Link } from "react-router-dom";

import ProductListItemNonFeatured from "../../../../components/ProductListItemNonFeatured";

import "./scss/index.scss";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
  title,
  rowCount = 1,
  columnCount = 4,
}: IProps) => {

  return (
    <>
      <div className="products-listed">
          <h3>{title}</h3>
          <div className="products-listed__container">
            {products.map(product => (
              <Link
                to={"/"}
                onClick={ (event: any) => event.preventDefault() }
                key={product.id}
              >
                <ProductListItemNonFeatured 
                  product={product}
                  rowCount={rowCount}
                  columnCount={columnCount} 
                />
              </Link>
            ))}
          </div>
      </div>


      <S.DefaultLoader>
        {loading ? (
          <DefaultLoader />
        ) : (
          canLoadMore && (
            <Button
              testingContext="loadMoreProductsButton"
              color="primary"
              onClick={onLoadMore}
            >
              <FormattedMessage defaultMessage="More" />
            </Button>
          )
        )}
      </S.DefaultLoader>


    </>
  );
};

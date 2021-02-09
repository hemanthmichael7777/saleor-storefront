import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { Thumbnail } from "@components/molecules";

import { TaxedMoney } from "../../@next/components/containers";
import { FeaturedProducts_shop_homepageCollection_products_edges_node } from "../ProductsFeatured/gqlTypes/FeaturedProducts";

import { VariantTiles } from "../../@next/components/molecules/VariantTiles";

interface ProductListItemProps {
  product: FeaturedProducts_shop_homepageCollection_products_edges_node;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { category } = product;
  const price = product.pricing?.priceRange?.start;
  const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;

  const getProductPrice = () => {
    if (isEqual(price, priceUndiscounted)) {
      return <TaxedMoney taxedMoney={price} />;
    }
    return (
      <>
        <span className="product-list-item__undiscounted_price">
          <TaxedMoney taxedMoney={priceUndiscounted} />
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TaxedMoney taxedMoney={price} />
      </>
    );
  };

  

  return (
    <div className="product-list-item">
      <div className="product-list-item__image">
        <Thumbnail source={product} />
      </div>
      <div className="product-list-item__text">
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category?.name}</p>
      <div className="product-list-item__color_select">
        
      </div>
      <p className="product-list-item__price">{getProductPrice()}</p>
      </div>
    </div>
  );
};

export default ProductListItem;

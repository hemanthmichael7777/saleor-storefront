import * as React from "react";
import { FormattedMessage } from "react-intl";

import { ProductList } from "@components/organisms";

import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
  <div className="product-page__other-products">
    <div className="container">
      <ProductList 
        products={products.map(({ node }) => node)} 
        title="Other Products in this Category" 
        rowCount={1}
        columnCount={3}
      />
    </div>
  </div>
);

export default OtherProducts;

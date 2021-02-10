import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { generateProductUrl } from "../../core/utils";
import { SearchResults_products_edges } from "./gqlTypes/SearchResults";

import "./scss/index.scss"

const ProductItem: React.FC<SearchResults_products_edges> = ({
  node: product,
}) => (

  <li >
    <Link to={generateProductUrl(product.id, product.name)}>
      <div className="results-flex">
        <div className="image-container">
          <Thumbnail source={product} />
        </div>
        <div className="info-container">
          <h4>{product.name}</h4>
          <p className="category-container">{product.category?.name || "-"}</p>
        </div>
      </div>
    </Link>
  </li>
);

export default ProductItem;

import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { TaxedMoney } from "../../@next/components/containers";
import { 
  FeaturedProducts_shop_homepageCollection_products_edges_node,
  FeaturedProducts_shop_homepageCollection_products_edges_node_image
} from "../ProductsFeatured/gqlTypes/FeaturedProducts";

import { generateProductUrl, maybe } from "../../core/utils";

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

  const productHasColor = (metaKey) => {
    var color = metaKey.replace("color", "").toLowerCase();
    return product.images.filter(img => {
      return img.url.toLowerCase().indexOf(color) > -1;
    }).length > 0;
  }

  const attributeOptions = product.productType.metadata
    .filter(value => {
      return (value.key.indexOf("color") > -1) && productHasColor(value.key)
    }).map(value => { 
      var r = {
        disabled: false,
        id: value.key,
        label: null,
        value: value.key,
        image: value.value
      };

      return r;
    });

  const selectedColor:FeaturedProducts_shop_homepageCollection_products_edges_node_image  = {
    id: 0,
    alt: null,
    url: "",
  }

  const selectedValue = selectedColor && {
    disabled: false,
    id: selectedColor.id,
    label: null,
    value: selectedColor.id.toString(),
  };

  const selectedValuesList = selectedValue ? [selectedValue.value] : [];

  const onSelectValueHandler = (optionValue: string) => {
    alert(optionValue);
  }

  return (
    <div className="product-list-item">
      
      
        <Link 
          to={generateProductUrl(product.id, product.name)}
          key={product.id + "a"}
          className={"product-list-item__image"}>
            <Thumbnail source={product} />
        </Link>
      

      <Link
          to={generateProductUrl(product.id, product.name)}
          key={product.id + "b"}
          style={{width: "100%", textAlign: "left"}}
        >
        <div className="product-list-item__text">
          <h4 className="product-list-item__title">{product.name}</h4>
          {/* <p className="product-list-item__category">{category?.name}</p> */}
        </div>
      </Link>
      <div className="product-list-item__color_select">
        
        <VariantTiles
            label={null}
            value={selectedValue ? selectedValue.value : ""}
            disabled={false}
            name={"color"}
            data-test="variantPicker"
            options={attributeOptions}
            selectedOptions={selectedValuesList}
            disabledOptions={[]}
            onSelect={onSelectValueHandler}
            tSize="small"
        />
        
      </div>
      <Link
          to={generateProductUrl(product.id, product.name)}
          key={product.id + "c"}
          style={{width: "100%", textAlign: "left"}}
        >
      <p className="product-list-item__price">{getProductPrice()}</p>
      </Link>
      

    </div>
  );
};

export default ProductListItem;

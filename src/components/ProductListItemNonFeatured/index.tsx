import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";
import { Link } from "react-router-dom";

import { Thumbnail } from "@components/molecules";

import { TaxedMoney } from "../../@next/components/containers";

import { generateProductUrl } from "../../core/utils";

import { VariantTiles } from "../../@next/components/molecules/VariantTiles";
import { IProductControlled } from "@types";

interface ProductListItemProps {
  product: IProductControlled;
  columnCount?: number;
}

const ProductListItemNonFeatured: React.FC<ProductListItemProps> = ({ 
  product,
  columnCount = 3,
}) => {
  const { category } = product;
  const price = product.pricing?.priceRange?.start;
  const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;
  const [selectedColor, setSelectedColor] = React.useState({
    id: "",
    alt: null,
    url: "",
  });

  const [currentImage, setCurrentImage] = React.useState(product.images[0].url);

  const getProductPrice = () => {
    if (isEqual(price, priceUndiscounted)) {
      return <TaxedMoney taxedMoney={price} />;
    }
    return (
      <>
        <span className="product-list-item-nonfeatured__undiscounted_price">
          <TaxedMoney taxedMoney={priceUndiscounted} />
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <TaxedMoney taxedMoney={price} />
      </>
    );
  };

  const productHasColor = (metaKey: string) => {
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

  const onSelectValueHandler = (optionValue: string) => {
    var color = optionValue.replace("color", "").toLowerCase();
    var fImages = product.images.filter(img => {
      return img.url.toLowerCase().indexOf(color) > -1;
    });

    if(fImages.length > 0) {
      setSelectedColor({
        id: optionValue,
        alt: null,
        url: fImages[0].url,
      });
      setCurrentImage(fImages[0].url);
    }
  }

  const selectedValue = selectedColor && {
    disabled: false,
    id: selectedColor.id,
    label: null,
    value: selectedColor.id.toString(),
  };

  const selectedValuesList = selectedValue ? [selectedValue.value] : [];


  return (
    <div className="product-list-item-nf">
        <Link 
          to={generateProductUrl(product.id, product.name)}
          key={product.id + "a"}
          className={"product-list-item-nf__image"}>
            <Thumbnail source={product} override={currentImage} />
        </Link>
      

      <Link
          to={generateProductUrl(product.id, product.name)}
          key={product.id + "b"}
          style={{width: "100%"}}
        >
        <div className="product-list-item-nf__text">
          <h4 className="product-list-item-nf__title">{product.name}</h4>
          <p className="product-list-item-nf__category">{category?.name}</p>
        </div>
      </Link>
      <div className="product-list-item-nf__color_select">
        
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
            onHover={onSelectValueHandler}
            tSize="small"
        />
        
      </div>
      <Link
          to={generateProductUrl(product.id, product.name)}
          key={product.id + "c"}
          style={{width: "100%", textAlign: "left"}}
        >
      <p className="product-list-item-nf__price">{getProductPrice()}</p>
      </Link>
      

    </div>
  );
};

export default ProductListItemNonFeatured;

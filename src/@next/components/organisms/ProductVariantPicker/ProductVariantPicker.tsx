import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import {
  useProductVariantsAttributes,
  useProductVariantsAttributesValuesSelection,
} from "@hooks";
import { ProductDetails_product_variants } from "../../../../views/Product/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues } from "@types";
import { ProductVariantAttributeSelectTiles } from "./ProductVariantAttributeSelectTiles";
import {
  ProductDetails_product_images,
} from "../../../../views/Product/gqlTypes/ProductDetails";
import * as S from "./styles";

export interface IProductVariantPickerProps {
  productVariants?: ProductDetails_product_variants[];
  onChange?: (
    selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants | undefined
  ) => void;
  selectSidebar?: boolean;
  selectSidebarTarget?: HTMLElement | null;
  queryAttributes: Record<string, string>;
  onAttributeChangeHandler: (slug: string | null, value: string) => void;
  images: ProductDetails_product_images[];
}

const ProductVariantPicker: React.FC<IProductVariantPickerProps> = ({
  productVariants = [],
  queryAttributes = {},
  onAttributeChangeHandler,
  onChange,
  selectSidebar = false,
  selectSidebarTarget,
  images,
}) => {
  const productVariantsAttributes = useProductVariantsAttributes(
    productVariants
  );
  console.log(productVariantsAttributes);
  const [
    productVariantsAttributesSelectedValues,
    selectProductVariantsAttributesValue,
  ] = useProductVariantsAttributesValuesSelection(productVariantsAttributes);

  const history = useHistory();
  const { search } = history.location;
  const searchQueryAttributes = queryString.parse(search);

  useEffect(() => {
    const selectedVariant = productVariants.find(productVariant => {
      return productVariant.attributes.every(productVariantAttribute => {
        const productVariantAttributeId = productVariantAttribute.attribute.id;
        if (
          productVariantAttribute.values[0] &&
          productVariantsAttributesSelectedValues[productVariantAttributeId] &&
          productVariantAttribute.values[0]!.id ===
            productVariantsAttributesSelectedValues[productVariantAttributeId]!
              .id
        ) {
          return true;
        }
        return false;
      });
    });
    if (onChange) {
      onChange(productVariantsAttributesSelectedValues, selectedVariant);
    }
  }, [productVariantsAttributesSelectedValues]);

  const onAttributeChange = (id: string, value: any, slug: string | null) => {
    selectProductVariantsAttributesValue(id, value);
    onAttributeChangeHandler(slug, value);
  };

  // pull the attributes in order specified by metadata
  function extractOrderedKeys(){
    var arr = Object.keys(productVariantsAttributes);
    return arr.sort(function (a, b) {
      var valueA = productVariantsAttributes[a].attribute.metadata.filter((q) => {
        return q.key === "productPageDisplayOrder";
      });
      var valueB = productVariantsAttributes[b].attribute.metadata.filter((r) => {
        return r.key === "productPageDisplayOrder";
      });

      // the metadata key doesn't exist somewhere
      if((valueA.length > 0) && (valueB.length < 1)) {
        return 1;
      } else if((valueB.length > 0) && (valueA.length < 1)) {
        return -1;
      } else if((valueB.length == 0) && (valueA.length == 0)) {
        return 0;
      }

      var intA = parseInt(valueA[0].value);
      var intB = parseInt(valueB[0].value);
      if (intA < intB) {
          return -1;
      } else if (intA > intB) {
          return 1;
      } else {
          return 0;
      }
    });
  }

  var orderedKeys = extractOrderedKeys();


  return (
    <S.Wrapper>
      {orderedKeys.map(
        productVariantsAttributeId => {
          const productVariantsAttribute =
            productVariantsAttributes[productVariantsAttributeId];
          const { slug } = productVariantsAttribute.attribute;
          const aName = productVariantsAttribute.attribute.name;

          const vTileHeaderText = slug === "color" && searchQueryAttributes.color ? aName + " - " + searchQueryAttributes.color : aName;

          return (
            <div>
              <S.VariantTilesHeader>
                {vTileHeaderText}
              </S.VariantTilesHeader>
              <ProductVariantAttributeSelectTiles
                key={productVariantsAttributeId}
                selectSidebar={selectSidebar}
                selectSidebarTarget={selectSidebarTarget}
                productVariants={productVariants}
                productVariantsAttributeId={productVariantsAttributeId}
                productVariantsAttribute={productVariantsAttribute}
                defaultValue={queryAttributes[productVariantsAttributeId]}
                productVariantsAttributesSelectedValues={
                  productVariantsAttributesSelectedValues
                }
                onChangeSelection={optionValue =>
                  onAttributeChange(productVariantsAttributeId, optionValue, slug)
                }
                onClearSelection={() =>
                  onAttributeChange(productVariantsAttributeId, null, slug)
                }
                images={images}
              />
              
            </div>
          );
        }
      )}
    </S.Wrapper>
  );
};
ProductVariantPicker.displayName = "ProductVariantPicker";
export default ProductVariantPicker;

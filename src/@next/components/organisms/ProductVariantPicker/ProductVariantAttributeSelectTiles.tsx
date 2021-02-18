import React from "react";
import { VariantTiles } from "@components/molecules";
import { useSelectableProductVariantsAttributeValues } from "@hooks";
import { ProductDetails_product_variants, ProductDetails_product_images, ProductDetails_product_variants_attributes_values } from "../../../../views/Product/gqlTypes/ProductDetails";
import {
  IProductVariantsAttribute,
  IProductVariantsAttributesSelectedValues,
} from "@types";

import { ProductDetails_product } from "../../../../views/Product/gqlTypes/ProductDetails";


export const ProductVariantAttributeSelectTiles: React.FC<{
  product: ProductDetails_product;
  selectSidebar: boolean;
  selectSidebarTarget?: HTMLElement | null;
  productVariantsAttributeId: string;
  productVariants: ProductDetails_product_variants[];
  productVariantsAttribute: IProductVariantsAttribute;
  productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
  onChangeSelection: (value: any, name?: any) => void;
  onClearSelection: () => void;
  defaultValue?: string;
  images: ProductDetails_product_images[];
  outOfStockVariant: (
    selectableAttrribute: IProductVariantsAttributesSelectedValues, 
    currentAttribute: ProductDetails_product_variants_attributes_values
  ) => boolean;
}> = ({
  product,
  productVariantsAttributeId,
  productVariants,
  productVariantsAttribute,
  productVariantsAttributesSelectedValues,
  onChangeSelection,
  onClearSelection,
  defaultValue,
  images,
  outOfStockVariant,
}) => {

  const selectedAttribute =
    productVariantsAttributesSelectedValues &&
    productVariantsAttributesSelectedValues[productVariantsAttributeId];

  const selectableProductVariantsAttributeValues = useSelectableProductVariantsAttributeValues(
    productVariantsAttributeId,
    productVariants,
    productVariantsAttributesSelectedValues
  );

  const selectedValue = selectedAttribute && {
    disabled: false,
    id: selectedAttribute.id,
    label: selectedAttribute.name!,
    value: selectedAttribute.value!,
  };

  const attributeOptions = productVariantsAttribute.values
    .filter(value => value)
    .map(value => {
      const selectableAttribute =
        selectableProductVariantsAttributeValues[productVariantsAttributeId];
      const isOptionDisabled =
        (selectableAttribute && !selectableAttribute.values.includes(value)) || outOfStockVariant(productVariantsAttributesSelectedValues, value);

      var img = "";
      if(productVariantsAttribute.attribute.slug === 'color') {
        for(let i=0; i<product.productType.metadata.length; i++){
          var im = product.productType.metadata[i].key
                    .replace("color", "").toLowerCase();
          if(im === value.name?.toLowerCase()){
            img = product.productType.metadata[i].value;
          }
        }
      }

      var r = {
        disabled: isOptionDisabled,
        id: value.id,
        label: value.name!,
        value: value.value!,
        image: img
      };

      return r;
    });

  const selectLabel = productVariantsAttribute.attribute.name || "";

  const selectedValuesList = selectedValue ? [selectedValue.value] : [];

  const disabledValuesList = attributeOptions
    .filter(optionValue => optionValue.disabled)
    .map(optionValue => optionValue.value);

  

  const onSelectValueHandler = (optionValue: string, callback?: () => void) => {
    if (
      disabledValuesList.every(disabledValue => disabledValue !== optionValue)
    ) {
      onChangeSelection(optionValue);
      if (callback) {
        callback();
      }
    }
  };


  return (
    <VariantTiles
          label={selectLabel}
          value={selectedValue ? selectedValue.value : ""}
          disabled={false}
          name={
            productVariantsAttribute.attribute.slug
              ? productVariantsAttribute.attribute.slug
              : ""
          }
          data-test="variantPicker"
          options={attributeOptions}
          selectedOptions={selectedValuesList}
          disabledOptions={disabledValuesList}
          onSelect={onSelectValueHandler}
          disableHover={true}
        />
  );
};
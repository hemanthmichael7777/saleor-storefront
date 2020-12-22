import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { VariantTiles } from "@components/molecules";
import { useSelectableProductVariantsAttributeValues } from "@hooks";
import { ProductDetails_product_variants } from "../../../../views/Product/gqlTypes/ProductDetails";
import {
  IProductVariantsAttribute,
  IProductVariantsAttributesSelectedValues,
} from "@types";

import * as S from "./styles";


export const ProductVariantAttributeSelectTiles: React.FC<{
  selectSidebar: boolean;
  selectSidebarTarget?: HTMLElement | null;
  productVariantsAttributeId: string;
  productVariants: ProductDetails_product_variants[];
  productVariantsAttribute: IProductVariantsAttribute;
  productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
  onChangeSelection: (value: any, name?: any) => void;
  onClearSelection: () => void;
  defaultValue?: string;
}> = ({
  productVariantsAttributeId,
  productVariants,
  productVariantsAttribute,
  productVariantsAttributesSelectedValues,
  onChangeSelection,
  onClearSelection,
  defaultValue,
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
        selectableAttribute && !selectableAttribute.values.includes(value);

      var img = null;
      
      if(productVariantsAttribute.attribute.slug === 'color') {
        if(productVariantsAttribute.attribute.metadata.length > 0) {
          for(let i=0; i<productVariantsAttribute.attribute.metadata.length; i++){
            if(productVariantsAttribute.attribute.metadata[i].key === value.value) {
              img = productVariantsAttribute.attribute.metadata[i].value;
            }
          }
        }
      }

      return {
        disabled: isOptionDisabled,
        id: value.id,
        label: value.name!,
        value: value.value!,
        image: img
      };
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
        />
  );
};
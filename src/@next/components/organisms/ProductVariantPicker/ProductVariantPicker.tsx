import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import {
  useProductVariantsAttributes,
  useProductVariantsAttributesValuesSelection,
} from "@hooks";
import { 
  ProductDetails_product_variants, 
  ProductDetails_product_variants_attributes_values,
  ProductDetails_product_variants_attributes
} from "../../../../views/Product/gqlTypes/ProductDetails";

import {
  IProductVariantsAttribute,
  IProductVariantsAttributesSelectedValues,
  IProductVariantsAttributeValueMap,
} from "@types";

import { 
  IProductVariantsMap 
} from "@types";

import { ProductVariantAttributeSelectTiles } from "./ProductVariantAttributeSelectTiles";
import {
  ProductDetails_product_images,
} from "../../../../views/Product/gqlTypes/ProductDetails";
import * as S from "./styles";

export interface IProductVariantPickerProps {
  productVariants?: ProductDetails_product_variants[];
  productVariantsMap: IProductVariantsMap;
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
  productVariantsMap = {},
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

  function reduceVariantsMap(keyIn: string, variantMap: any){
    var keyList = Object.getOwnPropertyNames(variantMap);
    var reducedVariantMap: {[key: string]: string | null} = {};
    for(let i=0; i<keyList.length; i++){
      var sku = keyList[i];
      if(sku.indexOf(keyIn) > -1) reducedVariantMap[sku] = variantMap[sku];
    }
    return reducedVariantMap;
  }

  function hasQuantity(keyIn: string, variantMap: any){
    var keyList = Object.getOwnPropertyNames(variantMap);
    for(let i=0; i<keyList.length; i++){
      var sku = keyList[i];
      if(sku.indexOf(keyIn) > -1) {
        if (variantMap[sku] > 0) return true;
      }
    }
    return false;
  }

  function hasQuantityBySelectedKey(
    currentAttribute: ProductDetails_product_variants_attributes_values,
    currentAttributeType: string,
    selectedKey: string, 
    variantMap: any,
    selectedVariantAttributes: IProductVariantsAttributesSelectedValues,
    attributesMap: any
  ){
    // console.log("---------------------");
    // console.log(currentAttribute);
    // console.log(currentAttributeType);
    // console.log(selectedKey);
    // console.log(variantMap);
    // console.log("---------------------");
    
    var keyList = Object.getOwnPropertyNames(variantMap);
    var selectedKeyAndCurrentAttr = selectedKey;

    // put current attribute where it belongs, 2 cases replace {} or { up to {

    // current attribute has value of same type
    console.log(attributesMap);
    if(selectedVariantAttributes[attributesMap[currentAttributeType]]){
      // replace placeholder and value up to next {
      var pHoldIndex = selectedKey.indexOf("{" + currentAttributeType + "}");
      var replaceUpTo = 0;
      for (var i = pHoldIndex; i < selectedKey.length; i++) {
        var c = selectedKey.charAt(i);
        if(c === '_' || c === '{') {
          replaceUpTo = i;
          break;
        }
      }
      var firstHalf = selectedKey.substring(0, pHoldIndex);
      var secondHalf = selectedKey.substring(replaceUpTo);
      console.log(secondHalf);
      selectedKeyAndCurrentAttr = 
        firstHalf + "{" + currentAttributeType + "}" + currentAttribute.value + secondHalf;
    } else{
      selectedKeyAndCurrentAttr = selectedKeyAndCurrentAttr.replace(
        "{" + currentAttributeType + "}",
        "{" + currentAttributeType + "}" + currentAttribute.value
      )
    }

    console.log("ska");
    console.log(currentAttribute);
    console.log(selectedKeyAndCurrentAttr);
    console.log("ska");

    // take one of skus based on sku order build list of missing vals from keystring
    // in a loop check those vals inserted into the combined key, if stock return true

    // var keyWithCurrent = selectedKey.replace("{" + )
    // for(let i=0; i<keyList.length; i++){
    //   var sku = keyList[i];
    //   if(selected key plus currentattribute has quant){
    //     return true
    //   }
    // }

    return true;
  }

  // build a sku number based on the selected attributes and  a
  // sku string which defines where the attributes are in the sku number
  function buildSelectedKey(
    productNumber: string,
    selectedVariantAttributes: IProductVariantsAttributesSelectedValues,
    attributesMap: any
  ){
    var skuOrderString = "{Style}_{Color}_{Chest}{Cup}";
    var attributesKeyList = Object.getOwnPropertyNames(attributesMap);
    for(let i=0; i<attributesKeyList.length; i++){
      var attr = attributesKeyList[i];
      var attrType = attributesMap[attr];
      if(skuOrderString.indexOf(attrType) > -1){
        if(selectedVariantAttributes[attr]){
          skuOrderString = skuOrderString.replace(
            "{" + attrType + "}", 
            "{" + attrType + "}" + selectedVariantAttributes[attr]!.value || " "
          );
        }
      }
    }
    skuOrderString = skuOrderString.replace(
      "{Style}", 
      "{Style}" + productNumber
    );
    
    // skuOrderString = skuOrderString
    //   .replace(/\{.*\}/g, "")
    //   .replace("{", "")
    //   .replace("}", "");

    // if(skuOrderString.endsWith("_")) {
    //   skuOrderString = skuOrderString.substring(0, skuOrderString.length - 1);
    // }
    
    return skuOrderString;
  }

  // make it work for bottoms and shapers to
  function checkOutOfStockVariant (
    selectedVariantAttributes: IProductVariantsAttributesSelectedValues,
    currentAttribute: ProductDetails_product_variants_attributes_values
  ) {

    var productNumber = Object.keys(productVariantsMap)[0].split("_")[0];

    // map of attribute ids for "chest, cup, color"
    var attributesMap = productVariants[0].attributes.reduce(function(map: any, obj) {
      var n = obj.attribute.id || "fakekey"
      map[n] = obj.attribute.name;
      return map;
    }, {});

    var attributesMapRev = productVariants[0].attributes.reduce(function(map: any, obj) {
      var n = obj.attribute.name || "fakekey"
      map[n] = obj.attribute.id;
      return map;
    }, {});
    
    // map of which attribute "chest, cup, color" each attribute value id represents
    var attributesValuesMap: {[key: string]: string | null} = {};
    for (const [key, value] of Object.entries(productVariantsAttributes)) {
      for(let i=0; i<value.values.length; i++){
        attributesValuesMap[value.values[i].id] = value.attribute.name;
      }
    }

    var selectedKey = buildSelectedKey(
      productNumber, 
      selectedVariantAttributes, 
      attributesMap
    );

    // console.log("\n\n----------------------");
    // console.log(productNumber);
    // console.log(productVariantsMap);
    // console.log(selectedVariantAttributes);
    // console.log(currentAttribute);
    // console.log(attributesMap);
    // console.log(attributesValuesMap);
    // console.log("----------------------\n\n");

    if(Object.keys(selectedVariantAttributes).length === 0){
      if(currentAttribute.value) {
        return !hasQuantity(currentAttribute.value, productVariantsMap);
      }
    }

    if(currentAttribute.value) {
      var currentAttributeType = attributesValuesMap[currentAttribute.id];
      return !hasQuantityBySelectedKey(
        currentAttribute, 
        currentAttributeType || "",
        selectedKey, 
        productVariantsMap,
        selectedVariantAttributes,
        attributesMapRev
      );
    }

    return false;
  };


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
            <div key={"div-" + productVariantsAttributeId}>
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
                outOfStockVariant={
                  (variantAttributesSelected, currentVariantAttribute) => 
                    checkOutOfStockVariant(variantAttributesSelected, currentVariantAttribute)
                }
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

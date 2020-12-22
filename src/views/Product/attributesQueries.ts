import {
    attributeDetailsFragment,
    attributeFragment
  } from "./gqlTypes/attributeFragments";

import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
  
  import {
    AttributeDetails,
    AttributeDetailsVariables
  } from "./gqlTypes/AttributeDetails";
  import { AttributeList, AttributeListVariables } from "./gqlTypes/AttributeList";
  
  const attributeDetails = gql`
    ${attributeDetailsFragment}
    query AttributeDetails($id: ID!) {
      attribute(id: $id) {
        ...AttributeDetailsFragment
      }
    }
  `;
  export const TypedAttributeDetailsQuery = TypedQuery<
    AttributeDetails,
    AttributeDetailsVariables
  >(attributeDetails);
  
  const attributeList = gql`
    ${attributeFragment}
    query AttributeList(
      $filter: AttributeFilterInput
      $before: String
      $after: String
      $first: Int
      $last: Int
      $sort: AttributeSortingInput
    ) {
      attributes(
        filter: $filter
        before: $before
        after: $after
        first: $first
        last: $last
        sortBy: $sort
      ) {
        edges {
          node {
            ...AttributeFragment
            values {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;
  export const TypedAttributeListQuery = TypedQuery<
    AttributeList,
    AttributeListVariables
  >(attributeList);
  
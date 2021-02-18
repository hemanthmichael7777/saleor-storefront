import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { StoreLocator, StoreLocatorVariables } from "./gqlTypes/FittingPage";

const storeLocatorQuery = gql`
  query {
    productVariants(first: 10) {
      edges{
        node{
          id
        }
      }
    }
  }
`;

export const TypedStoreLocatorQuery = TypedQuery<StoreLocator, StoreLocatorVariables>(
  storeLocatorQuery
);

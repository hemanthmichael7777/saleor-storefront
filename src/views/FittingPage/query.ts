import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { FittingPage, FittingPageVariables } from "./gqlTypes/FittingPage";

const fittingPageQuery = gql`
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

export const TypedFittingPageQuery = TypedQuery<FittingPage, FittingPageVariables>(
  fittingPageQuery
);

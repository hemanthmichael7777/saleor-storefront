import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import StoreLocator from "./Page";
import { TypedStoreLocatorQuery } from "./query";

type ViewProps = RouteComponentProps<{ slug: string }>;

export const View: React.FC<ViewProps> = ({
    
}) => (
  <TypedStoreLocatorQuery loaderFull errorPolicy="all">
    {({ data }) => {
        return (
            <StoreLocator />
        );
    }}
  </TypedStoreLocatorQuery>
);
export default View;

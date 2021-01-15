import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import FittingPage from "./Page";
import { TypedFittingPageQuery } from "./query";

type ViewProps = RouteComponentProps<{ slug: string }>;

export const View: React.FC<ViewProps> = ({
    
}) => (
  <TypedFittingPageQuery loaderFull errorPolicy="all">
    {({ data }) => {
        return (
            <FittingPage />
        );
    }}
  </TypedFittingPageQuery>
);
export default View;

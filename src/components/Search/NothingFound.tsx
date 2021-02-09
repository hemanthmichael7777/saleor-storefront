import * as React from "react";
import { FormattedMessage } from "react-intl";

import "./scss/index.scss"

export const NothingFound: React.FC<{ search: string }> = ({ search }) => {
  return (
    <div className="product-not-found-container">
      <div className="style-not-found">
        <p>
          <FormattedMessage
            defaultMessage="Style not found"
          />
        </p>
      </div>
      <p>
        <FormattedMessage defaultMessage="Don’t give up - check the spelling, think of something less specific and then use the search bar above." />
      </p>
    </div>
  );
};

export default NothingFound;

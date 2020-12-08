import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AuthorizeNetPaymentGateway } from ".";

const processPayment = action("processPayment");

storiesOf("@components/organisms/AuthorizeNetPaymentGateway", module)
  .addParameters({ component: AuthorizeNetPaymentGateway })
  .add("default", () => (
    <AuthorizeNetPaymentGateway processPayment={processPayment} />
  ));

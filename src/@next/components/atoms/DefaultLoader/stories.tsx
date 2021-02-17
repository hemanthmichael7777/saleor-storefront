import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { DefaultLoader } from ".";

storiesOf("@components/atoms/DefaultLoader", module)
  .addParameters({ component: DefaultLoader })
  .add("default", () => <DefaultLoader />);

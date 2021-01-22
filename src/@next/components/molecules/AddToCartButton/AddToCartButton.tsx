import React from "react";
import { FormattedMessage } from "react-intl";
import { ButtonWithRadius } from "@components/atoms";

export interface IAddToCartButton {
  disabled: boolean;
  onSubmit: () => void;
}

export const AddToCartButton: React.FC<IAddToCartButton> = ({
  onSubmit,
  disabled,
}) => {
  return (
    <ButtonWithRadius
      fullWidth
      testingContext="addProductToCartButton"
      onClick={onSubmit}
      color="primary"
      disabled={disabled}
    >
      <FormattedMessage defaultMessage="Add to basket" />
    </ButtonWithRadius>
  );
};
AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;

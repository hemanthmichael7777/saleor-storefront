import React, { useState } from "react";

import { ErrorMessage } from "@components/atoms";
import { CreditCardForm } from "@components/organisms";
import { IFormError } from "@types";

import {
  ErrorDataAuthNet,
  ICardInputsAuthNet,
  ICardPaymentInputAuthNet,
  IPaymentCardErrorAuthNet,
  PaymentDataAuthNet,
  authorizeNetPayment,
} from "../../../../core/payments/authorizenet";
import { maybe, removeEmptySpaces } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

const INITIAL_CARD_ERROR_STATE = {
  fieldErrors: {
    cvv: null,
    expirationMonth: null,
    expirationYear: null,
    number: null,
  },
  nonFieldError: "",
};

const AuthorizeNetPaymentGateway: React.FC<IProps> = ({
  config,
  processPayment,
  formRef,
  formId,
  errors = [],
  postalCode,
  onError,
}: IProps) => {
  const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);

  const [cardErrors, setCardErrors] = React.useState<ErrorDataAuthNet>(
    INITIAL_CARD_ERROR_STATE
  );

  const setCardErrorsHelper = (errors: IPaymentCardErrorAuthNet[]) =>
    errors.map(({ field, message }: IPaymentCardErrorAuthNet) =>
      setCardErrors(({ fieldErrors }) => ({
        fieldErrors: {
          ...fieldErrors,
          [field]: { field, message },
        },
      }))
    );

  const tokenizeCcCard = async (creditCard: ICardPaymentInputAuthNet) => {
    setCardErrors(INITIAL_CARD_ERROR_STATE);
    try {

      const cardData = (await authorizeNetPayment(
        creditCard
      )) as PaymentDataAuthNet;
      return cardData;

    } catch (errors) {
      setCardErrorsHelper(errors);
      onError(errors);
      return null;
    }
  };

  const handleSubmit = async (formData: ICardInputsAuthNet) => {
    setSubmitErrors([]);
    const creditCard: ICardPaymentInputAuthNet = {
      billingAddress: { postalCode },
      cvv: removeEmptySpaces(maybe(() => formData.ccCsc, "") || ""),
      expirationDate: removeEmptySpaces(maybe(() => formData.ccExp, "") || ""),
      number: removeEmptySpaces(maybe(() => formData.ccNumber, "") || ""),
    };
    const payment = await tokenizeCcCard(creditCard);
    if (payment?.token) {
      processPayment(payment?.token, {
        brand: payment?.ccType,
        firstDigits: null,
        lastDigits: payment?.lastDigits,
        expMonth: null,
        expYear: null,
      });
    } 
  };

  const allErrors = [...errors, ...submitErrors];

  return (
    <S.Wrapper data-test="authorizeNetPaymentGateway">
      <CreditCardForm
        formRef={formRef}
        formId={formId}
        cardErrors={cardErrors.fieldErrors}
        labelsText={{
          ccCsc: "CVC",
          ccExp: "ExpiryDate",
          ccNumber: "Number",
        }}
        disabled={false}
        handleSubmit={handleSubmit}
      />
      <ErrorMessage errors={allErrors} />
    </S.Wrapper>
  );
};

export { AuthorizeNetPaymentGateway };

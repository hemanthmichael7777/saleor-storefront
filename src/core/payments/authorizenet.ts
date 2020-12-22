import * as acceptwrapper from "./acceptwrapper";

export interface PaymentDataAuthNet {
  lastDigits: string;
  ccType: string,
  token: string;
}

export interface ICardInputsAuthNet {
  ccCsc: string;
  ccExp: string;
  ccNumber: string;
}

export type CardErrorAuthNet = { field?: string; message: string } | null;

export interface ICardPaymentInputAuthNet {
  billingAddress: {
    postalCode?: string;
  };
  number: string;
  cvv: string;
  expirationDate: string;
}

export interface ICardErrorsAuthNet {
  cvv: CardErrorAuthNet;
  expirationMonth: CardErrorAuthNet;
  expirationYear: CardErrorAuthNet;
  number: CardErrorAuthNet;
}

export interface ErrorDataAuthNet {
  fieldErrors: ICardErrorsAuthNet;
  nonFieldError?: string;
}
export interface IPaymentCardErrorAuthNet {
  code: string;
  field: string;
  message: string;
}

export const authorizeNetPayment = (creditCard: any) =>
  new Promise<PaymentDataAuthNet | ErrorDataAuthNet[]>((resolve, reject) => {
    acceptwrapper.createPayment(creditCard).then(response => {
      if (response.error) {
        reject(response.error._error);
      } else {
        const lastDigits = creditCard.number.slice(creditCard.number.length - 4);
        const token = response.opaqueData.dataValue;
        resolve({ lastDigits, ccType: 'ANY', token });
      }
    });
  });
import { IAddressWithEmail } from "@types";

export interface IProps {
    hideModal: () => void;
    submitBtnText: string;
    title: string;
    address?: {
      address: IAddressWithEmail;
      id: string;
    };
    sendConfirm: () => void | undefined;
    // target?: HTMLElement | null;
    // formId?: string;
    // title: string;
    // userId?: string;
    // countriesOptions?: Array<{
    //   code: string;
    //   country: string;
    // }>;
  }
  
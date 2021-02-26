import { IAddressWithEmail } from "@types";

export interface IProps {
  hideModal: () => void;
  submitBtnText: string;
  cancelBtnText: string;
  target?: HTMLElement | null;
  formId?: string;
  title: string;
  userId?: string;
  address?: {
    address: IAddressWithEmail;
    id: string;
  };
  countriesOptions?: Array<{
    code: string;
    country: string;
  }>;
}

import React, { useState } from "react";

import { useCreateUserAddress, useUpdateUserAddress } from "@saleor/sdk";

import { CountryCode } from "@saleor/sdk/lib/gqlTypes/globalTypes";
import { AddressForm } from "../AddressForm";
import { Modal } from "../Modal";

import { IProps } from "./types";

import { defaultCountryElement } from './config';
import { AddressConfirmModal } from "..";
import { IAddressWithEmail } from "@types";

const USPS = require('usps-webtools');

export const AddressFormModal: React.FC<IProps> = ({
  hideModal,
  submitBtnText,
  cancelBtnText,
  target,
  title,
  userId,
  countriesOptions,
  address,
  formId,
  ...props
}: IProps) => {
  const [show, setShow] = React.useState(true);
  let errors: any[] | undefined = [];

  const [
    setCreatUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  const [
    setUpdateUserAddress,
    { data: updateData, error: addressUpdateErrors },
  ] = useUpdateUserAddress();

  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);
  const [confirmDialogCallbackState, setConfirmDialogCallbackState] = useState<any>();

  if (addressCreateErrors) {
    errors = addressCreateErrors.extraInfo.userInputErrors;
  }

  if (addressUpdateErrors) {
    errors = addressUpdateErrors.extraInfo.userInputErrors;
  }

  React.useEffect(() => {
    if (
      (createData && !addressCreateErrors) ||
      (updateData && !addressUpdateErrors)
    ) {
      hideModal();
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  const handleSubmit = (data: any) => {
    const usps = new USPS({
      server: 'https://production.shippingapis.com/ShippingAPI.dll',
      userId: '624FROGF1057',
      ttl: 10000 
    });
    usps.verify({
      street1: data?.streetAddress1,
      street2: data?.streetAddress2,
      city: data?.city,
      state: data?.countryArea,
      zip: data?.postalCode
    }, async function(err: any, address_usps: any) {
      if(err){
        alert("Address not valid, no address found");
      } else {
        setDisplayConfirmModal(true);
        setConfirmDialogCallbackState({
          address_usps_ship: address_usps,
          addressS: data
        });
      }
    });
  }

  const confirmDialogCallback = () => {
    // save the clean address from usps after confirmation
    var modInput: IAddressWithEmail = {
      id: confirmDialogCallbackState.addressS.id,
      firstName: confirmDialogCallbackState.addressS.firstName,
      lastName: confirmDialogCallbackState.addressS.lastName,
      companyName: confirmDialogCallbackState.addressS.companyName,
      streetAddress1: confirmDialogCallbackState.address_usps_ship.street1,
      streetAddress2: confirmDialogCallbackState.address_usps_ship.street2,
      city: confirmDialogCallbackState.address_usps_ship.city,
      postalCode: confirmDialogCallbackState.address_usps_ship.zip,
      countryArea: confirmDialogCallbackState.address_usps_ship.state,
      phone: confirmDialogCallbackState.addressS.phone,
      country: {
        code:confirmDialogCallbackState.addressS.country.code ,
        country: confirmDialogCallbackState.addressS.country.country,
      }
    }
    if (userId) {
      setCreatUserAddress({
        input: {
          ...modInput,
          country: confirmDialogCallbackState.addressS?.country?.code as CountryCode,
        },
      });
    } else {
      setUpdateUserAddress({
        id: address!.id,
        input: {
          ...modInput,
          country: confirmDialogCallbackState.addressS?.country?.code as CountryCode,
        },
      });
    }
  }

  const getConfirm = (value: boolean) => {
    if(value) {
      confirmDialogCallback();
    }
  }

  return (
    <div>
      { displayConfirmModal && confirmDialogCallbackState && (
        <AddressConfirmModal
        hideModal={() => {
          setDisplayConfirmModal(false);
        }}
          submitBtnText="Confirm"
          cancelBtnText="Cancel"
          title="Confirm your address"
          getConfirm={getConfirm}
          address_usps_ship={confirmDialogCallbackState.address_usps_ship}
          address_usps_bill={null}
        />
      )}
      <Modal
        submitButtonTestingContext="submitAddressFormModalButton"
        testingContext="submitAddressFormModal"
        title={title}
        hide={() => {
          hideModal();
          setShow(false);
        }}
        formId={formId}
        disabled={false}
        show={show}
        target={target}
        submitBtnText={submitBtnText}
        cancelBtnText={cancelBtnText}
      >
        <AddressForm
          {...props}
          {...{ errors }}
          formId={formId}
          defaultValue={countriesOptions ? countriesOptions[defaultCountryElement] : null}
          address={address ? address.address : undefined}
          handleSubmit={data => handleSubmit(data)}
        />
      </Modal>
    </div>
  );
};

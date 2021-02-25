import React, {
  forwardRef,
  RefForwardingComponent,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";

import { CheckoutAddress } from "@components/organisms";
import { AddressConfirmModal } from "@components/organisms";
import { useAuth, useCheckout, useCart } from "@saleor/sdk";
import { ShopContext } from "@temp/components/ShopProvider/context";
import { commonMessages } from "@temp/intl";
import { IAddress, IFormError } from "@types";
import { filterNotEmptyArrayItems } from "@utils/misc";

const USPS = require('usps-webtools');

export interface ICheckoutAddressSubpageHandles {
  submitAddress: () => void;
}

interface IProps extends RouteComponentProps<any> {
  changeSubmitProgress: (submitInProgress: boolean) => void;
  onSubmitSuccess: () => void;
}

const CheckoutAddressSubpageWithRef: RefForwardingComponent<
  ICheckoutAddressSubpageHandles,
  IProps
> = ({ changeSubmitProgress, onSubmitSuccess, ...props }: IProps, ref) => {
  const checkoutShippingAddressFormId = "shipping-address-form";
  const checkoutShippingAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutBillingAddressFormId = "billing-address-form";
  const checkoutBillingAddressFormRef = useRef<HTMLFormElement>(null);
  const checkoutNewAddressFormId = "new-address-form";

  const [displayConfirmModal, setDisplayConfirmModal] = useState(false);

  const { user } = useAuth();
  const {
    checkout,
    selectedShippingAddressId,
    selectedBillingAddressId,
    billingAsShipping,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
  } = useCheckout();
  const { items } = useCart();
  const { countries } = useContext(ShopContext);

  const [shippingErrors, setShippingErrors] = useState<IFormError[]>([]);
  const [billingErrors, setBillingErrors] = useState<IFormError[]>([]);

  const intl = useIntl();

  const isShippingRequiredForProducts =
    items &&
    items.some(
      ({ variant }) => variant.product?.productType.isShippingRequired
    );
  const checkoutShippingAddress = checkout?.shippingAddress
    ? {
        ...checkout?.shippingAddress,
        email: checkout?.email || user?.email,
      }
    : undefined;
  const checkoutBillingAddress = checkout?.billingAddress
    ? {
        ...checkout?.billingAddress,
        email: checkout?.email || user?.email,
      }
    : undefined;

  useImperativeHandle(ref, () => ({
    submitAddress: () => {
      if (isShippingRequiredForProducts) {
        checkoutShippingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      } else {
        checkoutBillingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    },
  }));

  const [billingAsShippingState, setBillingAsShippingState] = useState(
    billingAsShipping
  );
  useEffect(() => {
    setBillingAsShippingState(billingAsShipping);
  }, [billingAsShipping]);

  const handleSetShippingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    if (!address && !billingAsShippingState) {
      setShippingErrors([
        {
          message: intl.formatMessage({
            defaultMessage: "Please provide shipping address.",
          }),
        },
      ]);
      return;
    }

    const shippingEmail = user?.email || email || "";

    if (!shippingEmail) {
      setShippingErrors([
        {
          field: "email",
          message: intl.formatMessage(commonMessages.provideEmailAddress),
        },
      ]);
      return;
    }

    changeSubmitProgress(true);
    const { dataError } = await setShippingAddress(
      {
        ...address,
        id: userAddressId,
      },
      shippingEmail
    );
    const errors = dataError?.error;
    if (errors) {
      setShippingErrors(errors);
      changeSubmitProgress(false);
    } else {
      setShippingErrors([]);
      if (billingAsShippingState) {
        handleSetBillingAddress();
      } else {
        checkoutBillingAddressFormRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true })
        );
      }
    }
  };

  const confirmDialogCallback = async (
    address_usps_ship: any,
    address_usps_bill: any,
    addressB: any,
    userAddressId: any,
  ) => {
    var aShip:IAddress = {
      id: userAddressId,
      firstName: checkoutShippingAddress?.firstName,
      lastName: checkoutShippingAddress?.lastName,
      companyName: checkoutShippingAddress?.companyName,
      streetAddress1: address_usps_ship.street1,
      streetAddress2: address_usps_ship.street2,
      city: address_usps_ship.city,
      postalCode: address_usps_ship.zip,
      countryArea: address_usps_ship.state,
      phone: checkoutShippingAddress?.phone,
      country: {
        code: checkoutShippingAddress?.country?.code,
        country: checkoutShippingAddress?.country?.country,
      }
    }
    var aBill:IAddress = {
      id: userAddressId,
      firstName: addressB?.firstName,
      lastName: addressB?.lastName,
      companyName: checkoutShippingAddress?.companyName,
      streetAddress1: address_usps_bill.street1,
      streetAddress2: address_usps_bill.street2,
      city: address_usps_bill.city,
      postalCode: address_usps_bill.zip,
      countryArea: address_usps_bill.state,
      phone: addressB?.phone,
      country: {
        code: addressB?.country?.code,
        country: addressB?.country?.country,
      }
    }
    if(checkoutShippingAddress?.email) {
      await setShippingAddress(aShip, checkoutShippingAddress?.email);
      await setBillingAddress(aBill, checkoutShippingAddress?.email);
      onSubmitSuccess();
    }
  }

  const handleSetBillingAddress = async (
    address?: IAddress,
    email?: string,
    userAddressId?: string
  ) => {
    if (!address && !billingAsShippingState) {
      setBillingErrors([
        {
          message: intl.formatMessage({
            defaultMessage: "Please provide billing address.",
          }),
        },
      ]);
      return;
    }

    const billingEmail = user?.email || email;

    if (
      !billingEmail &&
      !billingAsShippingState &&
      !isShippingRequiredForProducts
    ) {
      setBillingErrors([
        {
          field: "email",
          message: intl.formatMessage(commonMessages.provideEmailAddress),
        },
      ]);
      return;
    }

    let errors;
    changeSubmitProgress(true);
    if (billingAsShippingState && isShippingRequiredForProducts) {
      const { dataError } = await setBillingAsShippingAddress();
      errors = dataError?.error;
    } else {
      const { dataError } = await setBillingAddress(
        {
          ...address,
          id: userAddressId,
        },
        billingEmail
      );
      errors = dataError?.error;
    }
    changeSubmitProgress(false);
    if (errors) {
      setBillingErrors(errors);
    } else {
      setBillingErrors([]);

      const usps = new USPS({
        server: 'https://production.shippingapis.com/ShippingAPI.dll',
        userId: '624FROGF1057',
        ttl: 10000 
      });
      
      usps.verify({
        street1: checkoutShippingAddress?.streetAddress1,
        street2: checkoutShippingAddress?.streetAddress2,
        city: checkoutShippingAddress?.city,
        state: checkoutShippingAddress?.countryArea,
        zip: checkoutShippingAddress?.postalCode
      }, async function(err_in: any, address_usps_ship: any) {
        if(err_in){
          alert("Shipping address not valid, no address found");
        } else {
            var addressB = address ? address : checkoutShippingAddress;
            usps.verify({
              street1: addressB?.streetAddress1,
              street2: addressB?.streetAddress2,
              city: addressB?.city,
              state: addressB?.countryArea,
              zip: addressB?.postalCode
            }, async function(err: any, address_usps_bill: any) {
              if(err){
                alert("Billing address not valid, no address found");
              } else {
                if(confirm("Confirm addresses")){

                  setDisplayConfirmModal(true)

                  confirmDialogCallback(
                    address_usps_ship,
                    address_usps_bill,
                    addressB,
                    userAddressId,
                  );

                }
              }
            });
        }

      });

    }
  };

  const userAdresses = user?.addresses
    ?.filter(filterNotEmptyArrayItems)
    .map(address => ({
      address: {
        ...address,
        isDefaultBillingAddress: address.isDefaultBillingAddress || false,
        isDefaultShippingAddress: address.isDefaultShippingAddress || false,
        phone: address.phone || undefined,
      },
      id: address?.id || "",
      onSelect: () => null,
    }));

  const getConfirm = (value: boolean) => {
    console.log(value)
  }

  return (
    <div>
      { displayConfirmModal && (
        <AddressConfirmModal
        hideModal={() => {
          setDisplayConfirmModal(false);
        }}
          submitBtnText="Confirm"
          title="Address Confirmation"
          
        />
      )}
      <CheckoutAddress
        {...props}
        shippingErrors={shippingErrors}
        billingErrors={billingErrors}
        shippingFormId={checkoutShippingAddressFormId}
        shippingFormRef={checkoutShippingAddressFormRef}
        billingFormId={checkoutBillingAddressFormId}
        billingFormRef={checkoutBillingAddressFormRef}
        checkoutShippingAddress={checkoutShippingAddress}
        checkoutBillingAddress={checkoutBillingAddress}
        billingAsShippingAddress={billingAsShippingState}
        email={checkout?.email}
        userAddresses={userAdresses}
        selectedUserShippingAddressId={selectedShippingAddressId}
        selectedUserBillingAddressId={selectedBillingAddressId}
        countries={countries}
        userId={user?.id}
        newAddressFormId={checkoutNewAddressFormId}
        shippingAddressRequired={!!isShippingRequiredForProducts}
        setShippingAddress={handleSetShippingAddress}
        setBillingAddress={handleSetBillingAddress}
        setBillingAsShippingAddress={setBillingAsShippingState}
      />
    </div>
  );
};

const CheckoutAddressSubpage = forwardRef(CheckoutAddressSubpageWithRef);

export { CheckoutAddressSubpage };

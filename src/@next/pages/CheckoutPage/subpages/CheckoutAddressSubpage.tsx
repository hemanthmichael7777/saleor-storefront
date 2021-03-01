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

  const [confirmDialogCallbackState, setConfirmDialogCallbackState] = useState<any>();
  const [confirmDialogCallbackStateB, setConfirmDialogCallbackStateB] = useState<any>();

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

  var currentlyFilledShipping: any = null;

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
      // don't need to re-verify logged in user addresses
      if(userAdresses){
        if (billingAsShippingState) {
          handleSetBillingAddress();
        } else {
          checkoutBillingAddressFormRef.current?.dispatchEvent(
            new Event("submit", { cancelable: true })
          );
        }
      } else {
        const usps = new USPS({
          server: 'https://production.shippingapis.com/ShippingAPI.dll',
          userId: '624FROGF1057',
          ttl: 10000 
        });
        
        usps.verify({
          street1: address?.streetAddress1,
          street2: address?.streetAddress2,
          city: address?.city,
          state: address?.countryArea,
          zip: address?.postalCode
        }, async function(err_in: any, address_usps_ship: any) {
          if(err_in){
            changeSubmitProgress(false);
            alert("Shipping address not valid, no address found");
          } else {
            setConfirmDialogCallbackState({
              address_usps_ship: address_usps_ship,
              userAddressId: userAddressId,
              addressS: address
            });
            if (billingAsShippingState) {
              handleSetBillingAddress();
            } else {
              checkoutBillingAddressFormRef.current?.dispatchEvent(
                new Event("submit", { cancelable: true })
              );
            }
          }
        });
      }
      
    }
  };

  const confirmDialogCallback = async () => {
    var aShip:IAddress = {
      id: confirmDialogCallbackState.userAddressId,
      firstName: confirmDialogCallbackState.addressS?.firstName,
      lastName: confirmDialogCallbackState.addressS?.lastName,
      companyName: confirmDialogCallbackState.addressS?.companyName,
      streetAddress1: confirmDialogCallbackState.address_usps_ship.street1,
      streetAddress2: confirmDialogCallbackState.address_usps_ship.street2,
      city: confirmDialogCallbackState.address_usps_ship.city,
      postalCode: confirmDialogCallbackState.address_usps_ship.zip,
      countryArea: confirmDialogCallbackState.address_usps_ship.state,
      phone: confirmDialogCallbackState.addressS?.phone,
      country: {
        code: confirmDialogCallbackState.addressS?.country?.code,
        country: confirmDialogCallbackState.addressS?.country?.country,
      }
    }
    var aBill:IAddress;
    if(!billingAsShippingState){
      aBill = {
        id: confirmDialogCallbackStateB.userAddressId,
        firstName: confirmDialogCallbackStateB.addressB?.firstName,
        lastName: confirmDialogCallbackStateB.addressB?.lastName,
        companyName: checkoutShippingAddress?.companyName,
        streetAddress1: confirmDialogCallbackStateB.address_usps_bill.street1,
        streetAddress2: confirmDialogCallbackStateB.address_usps_bill.street2,
        city: confirmDialogCallbackStateB.address_usps_bill.city,
        postalCode: confirmDialogCallbackStateB.address_usps_bill.zip,
        countryArea: confirmDialogCallbackStateB.address_usps_bill.state,
        phone: confirmDialogCallbackStateB.addressB?.phone,
        country: {
          code: confirmDialogCallbackStateB.addressB?.country?.code,
          country: confirmDialogCallbackStateB.addressB?.country?.country,
        }
      }
    } else {
      aBill = aShip;
    }
    
    if(checkoutShippingAddress?.email) {
      setShippingAddress(aShip, confirmDialogCallbackState.addressS?.email);
      if(!billingAsShippingState){
        setBillingAddress(aBill, confirmDialogCallbackState.addressS?.email);
      }
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
      // don't need to re-verify logged in user addresses
      if(userAdresses){
          onSubmitSuccess();
      } else {
        const usps = new USPS({
          server: 'https://production.shippingapis.com/ShippingAPI.dll',
          userId: '624FROGF1057',
          ttl: 10000 
        });
        
        if(billingAsShippingState){
          setConfirmDialogCallbackStateB({
            address_usps_bill: null,
            userAddressId: userAddressId,
            addressB: address
          });
          setDisplayConfirmModal(true);
        } else {
          usps.verify({
            street1: address?.streetAddress1,
            street2: address?.streetAddress2,
            city: address?.city,
            state: address?.countryArea,
            zip: address?.postalCode
          }, async function(err: any, address_usps_bill: any) {
            if(err){
              changeSubmitProgress(false);
              alert("Billing address not valid, no address found");
            } else {
                setConfirmDialogCallbackStateB({
                  address_usps_bill: address_usps_bill,
                  userAddressId: userAddressId,
                  addressB: address
                });
                setDisplayConfirmModal(true);
            }
          });
        }
      }
            
        

    }
  };

    const getConfirm = (value: boolean) => {
      if(value) {
        confirmDialogCallback();
      }
    }

  return (
    <div>
      { displayConfirmModal && (
        <AddressConfirmModal
        hideModal={() => {
          setDisplayConfirmModal(false);
        }}
          submitBtnText="Confirm"
          cancelBtnText="Cancel"
          title="Confirm your address"
          getConfirm={getConfirm}
          address_usps_ship={confirmDialogCallbackState.address_usps_ship}
          address_usps_bill={
            billingAsShippingState ? confirmDialogCallbackState.address_usps_ship : confirmDialogCallbackStateB.address_usps_bill
          }
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

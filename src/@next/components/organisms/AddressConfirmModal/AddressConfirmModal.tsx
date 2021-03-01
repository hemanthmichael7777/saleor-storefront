import React from "react";

import { Modal } from "../Modal";

import { IProps } from "./types";

import * as S from "./styles";

export const AddressConfirmModal: React.FC<IProps> = ({
    hideModal,
    address_usps_ship,
    address_usps_bill,
    title,
    submitBtnText,
    cancelBtnText,
    getConfirm
}: IProps) => {

    console.log(address_usps_ship);

    console.log(address_usps_bill);

    const [show, setShow] = React.useState(true);

    const handleSubmit = () => {
        getConfirm(true)
        hideModal();
    };
    
    return (
        <Modal
            submitButtonTestingContext="submitAddressConfirmModalButton"
            testingContext="submitAddressConfirmModal"
            onSubmit={() => handleSubmit()}
            title={title}
            show={show}
            hide={() => {
                hideModal();
                setShow(false);
              }}
            submitBtnText={submitBtnText}
            cancelBtnText={cancelBtnText}
            disabled={false}
        >
            <S.Wrapper>
                <S.AddressWrapper>
                    <S.TitleWrapper>
                        { address_usps_bill &&
                            <S.AddressTitle>Shipping Address</S.AddressTitle>
                        }
                        { !address_usps_bill &&
                            <S.AddressTitle>Address</S.AddressTitle>
                        }
                    </S.TitleWrapper>
                    <S.FieldWrapper>
                        <S.AddressField>{address_usps_ship.street1}</S.AddressField>
                        <S.AddressField>{address_usps_ship.city}</S.AddressField>
                        <S.AddressField>{address_usps_ship.state}</S.AddressField>
                        <S.AddressField>{address_usps_ship.zip}</S.AddressField>
                    </S.FieldWrapper>

                </S.AddressWrapper>

              { address_usps_bill &&
                <S.AddressWrapper>
                    <S.TitleWrapper>
                        <S.AddressTitle>Billing Address</S.AddressTitle>
                    </S.TitleWrapper>

                    <S.FieldWrapper>
                        <S.AddressField>{address_usps_bill.street1}</S.AddressField>
                        <S.AddressField>{address_usps_bill.city}</S.AddressField>
                        <S.AddressField>{address_usps_bill.state}</S.AddressField>
                        <S.AddressField>{address_usps_bill.zip}</S.AddressField>
                    </S.FieldWrapper>

                </S.AddressWrapper>
              }
                


            </S.Wrapper>

        </Modal> 
    );
};
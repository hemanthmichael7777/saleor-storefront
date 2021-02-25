import React from "react";

import { Modal } from "../Modal";

import { IProps } from "./types";

export const AddressConfirmModal: React.FC<IProps> = ({
    hideModal,
    address,
    title,
    submitBtnText
}: IProps) => {
    const [show, setShow] = React.useState(true);

    const handleSubmit = () => {
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
            disabled={false}
        >

        </Modal> 
    );
};
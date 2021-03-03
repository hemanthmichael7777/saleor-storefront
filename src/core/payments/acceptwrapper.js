

/**
 * Wrapper for client token workflow library
 * Accept.js
 */

import { AUTHORIZENET_LOGIN_ID, AUTHORIZENET_CLIENT_KEY} from '../config';

function createPaymentAsync(data){
    return new Promise(resolve => {
        window.Accept.dispatchData(data, resolve);
    });
}

// map to ICardErrorsAuthNet type
function parseErrors(response) {
    let i = 0;
    const result = []

    while (i < response.messages.message.length) {
        var field = '';
        if (response.messages.message[i].code === 'E_WC_05') {
            field = 'number';
        } else if (response.messages.message[i].code === 'E_WC_06'){
            field = 'expirationMonth';
        } else if (response.messages.message[i].code === 'E_WC_07'){
            field = 'expirationYear';
        } else if (response.messages.message[i].code === 'E_WC_08'){
            field = 'expirationMonth';
        } else if (response.messages.message[i].code === 'E_WC_15'){
            field = 'cvv';
        }
        var j = { 
            code: response.messages.message[i].code, 
            field: field, 
            message: response.messages.message[i].text
        }
        result.push(j);
        i += 1;
    }

    return result;
}

function refinedData(data) {
    const authData = {
        clientKey: AUTHORIZENET_CLIENT_KEY,
        apiLoginID: AUTHORIZENET_LOGIN_ID,
    };

    const newData = {};
    newData.authData = authData;

        const cardDataWithoutAddress = {
            cardNumber: data.number,
            month: data.expirationDate.split("/")[0],
            year: data.expirationDate.split("/")[1],
        };
        newData.cardData = cardDataWithoutAddress;
        newData.cardData.cardNumber = newData.cardData.cardNumber.replace(/ /g, '');


    return newData;
}

function buildRequestBody(data, acceptResponse) {
    let body = { profile_type: data.profile_type };
    const { opaqueData } = acceptResponse;


        body = {
            ...body,
            opaqueData,
            card: {
                month: data.cardData.month,
                year: data.cardData.year,
                address_attributes: data.cardData.addressAttributes,
            },
        }


    return body;
}

export function createPayment(data) {
    return createPaymentAsync(refinedData(data)).then(response => {
        if (response.messages.resultCode === 'Error') {
            return { error: { _error: parseErrors(response) } }
        }
        return response;
    });
}
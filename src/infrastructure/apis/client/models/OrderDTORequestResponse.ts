/* tslint:disable */
/* eslint-disable */
/**
 * SoleVault
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { ErrorMessage } from './ErrorMessage';
import {
    ErrorMessageFromJSON,
    ErrorMessageFromJSONTyped,
    ErrorMessageToJSON,
} from './ErrorMessage';
import type { OrderDTO } from './OrderDTO';
import {
    OrderDTOFromJSON,
    OrderDTOFromJSONTyped,
    OrderDTOToJSON,
} from './OrderDTO';

/**
 * 
 * @export
 * @interface OrderDTORequestResponse
 */
export interface OrderDTORequestResponse {
    /**
     * 
     * @type {OrderDTO}
     * @memberof OrderDTORequestResponse
     */
    response?: OrderDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof OrderDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the OrderDTORequestResponse interface.
 */
export function instanceOfOrderDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OrderDTORequestResponseFromJSON(json: any): OrderDTORequestResponse {
    return OrderDTORequestResponseFromJSONTyped(json, false);
}

export function OrderDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : OrderDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function OrderDTORequestResponseToJSON(value?: OrderDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': OrderDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


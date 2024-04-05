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
import type { OrderDTOPagedResponse } from './OrderDTOPagedResponse';
import {
    OrderDTOPagedResponseFromJSON,
    OrderDTOPagedResponseFromJSONTyped,
    OrderDTOPagedResponseToJSON,
} from './OrderDTOPagedResponse';

/**
 * 
 * @export
 * @interface OrderDTOPagedResponseRequestResponse
 */
export interface OrderDTOPagedResponseRequestResponse {
    /**
     * 
     * @type {OrderDTOPagedResponse}
     * @memberof OrderDTOPagedResponseRequestResponse
     */
    response?: OrderDTOPagedResponse;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof OrderDTOPagedResponseRequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the OrderDTOPagedResponseRequestResponse interface.
 */
export function instanceOfOrderDTOPagedResponseRequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function OrderDTOPagedResponseRequestResponseFromJSON(json: any): OrderDTOPagedResponseRequestResponse {
    return OrderDTOPagedResponseRequestResponseFromJSONTyped(json, false);
}

export function OrderDTOPagedResponseRequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrderDTOPagedResponseRequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : OrderDTOPagedResponseFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function OrderDTOPagedResponseRequestResponseToJSON(value?: OrderDTOPagedResponseRequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': OrderDTOPagedResponseToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


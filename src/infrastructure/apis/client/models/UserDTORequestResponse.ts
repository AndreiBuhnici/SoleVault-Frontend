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
import type { UserDTO } from './UserDTO';
import {
    UserDTOFromJSON,
    UserDTOFromJSONTyped,
    UserDTOToJSON,
} from './UserDTO';

/**
 * 
 * @export
 * @interface UserDTORequestResponse
 */
export interface UserDTORequestResponse {
    /**
     * 
     * @type {UserDTO}
     * @memberof UserDTORequestResponse
     */
    response?: UserDTO;
    /**
     * 
     * @type {ErrorMessage}
     * @memberof UserDTORequestResponse
     */
    errorMessage?: ErrorMessage;
}

/**
 * Check if a given object implements the UserDTORequestResponse interface.
 */
export function instanceOfUserDTORequestResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserDTORequestResponseFromJSON(json: any): UserDTORequestResponse {
    return UserDTORequestResponseFromJSONTyped(json, false);
}

export function UserDTORequestResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDTORequestResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'response': !exists(json, 'response') ? undefined : UserDTOFromJSON(json['response']),
        'errorMessage': !exists(json, 'errorMessage') ? undefined : ErrorMessageFromJSON(json['errorMessage']),
    };
}

export function UserDTORequestResponseToJSON(value?: UserDTORequestResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'response': UserDTOToJSON(value.response),
        'errorMessage': ErrorMessageToJSON(value.errorMessage),
    };
}


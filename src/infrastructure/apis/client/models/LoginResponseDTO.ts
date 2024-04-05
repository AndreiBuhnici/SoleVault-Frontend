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
import type { UserLoginDTO } from './UserLoginDTO';
import {
    UserLoginDTOFromJSON,
    UserLoginDTOFromJSONTyped,
    UserLoginDTOToJSON,
} from './UserLoginDTO';

/**
 * 
 * @export
 * @interface LoginResponseDTO
 */
export interface LoginResponseDTO {
    /**
     * 
     * @type {string}
     * @memberof LoginResponseDTO
     */
    token?: string | null;
    /**
     * 
     * @type {UserLoginDTO}
     * @memberof LoginResponseDTO
     */
    user?: UserLoginDTO;
}

/**
 * Check if a given object implements the LoginResponseDTO interface.
 */
export function instanceOfLoginResponseDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function LoginResponseDTOFromJSON(json: any): LoginResponseDTO {
    return LoginResponseDTOFromJSONTyped(json, false);
}

export function LoginResponseDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): LoginResponseDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'token': !exists(json, 'token') ? undefined : json['token'],
        'user': !exists(json, 'user') ? undefined : UserLoginDTOFromJSON(json['user']),
    };
}

export function LoginResponseDTOToJSON(value?: LoginResponseDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'token': value.token,
        'user': UserLoginDTOToJSON(value.user),
    };
}


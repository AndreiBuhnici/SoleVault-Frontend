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
import type { UserDTO } from './UserDTO';
import {
    UserDTOFromJSON,
    UserDTOFromJSONTyped,
    UserDTOToJSON,
} from './UserDTO';

/**
 * 
 * @export
 * @interface UserFileDTO
 */
export interface UserFileDTO {
    /**
     * 
     * @type {string}
     * @memberof UserFileDTO
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof UserFileDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof UserFileDTO
     */
    description?: string | null;
    /**
     * 
     * @type {UserDTO}
     * @memberof UserFileDTO
     */
    user?: UserDTO;
    /**
     * 
     * @type {Date}
     * @memberof UserFileDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof UserFileDTO
     */
    updatedAt?: Date;
}

/**
 * Check if a given object implements the UserFileDTO interface.
 */
export function instanceOfUserFileDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function UserFileDTOFromJSON(json: any): UserFileDTO {
    return UserFileDTOFromJSONTyped(json, false);
}

export function UserFileDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserFileDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'user': !exists(json, 'user') ? undefined : UserDTOFromJSON(json['user']),
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
    };
}

export function UserFileDTOToJSON(value?: UserFileDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'user': UserDTOToJSON(value.user),
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}


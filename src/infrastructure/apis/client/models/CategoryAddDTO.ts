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
/**
 * 
 * @export
 * @interface CategoryAddDTO
 */
export interface CategoryAddDTO {
    /**
     * 
     * @type {string}
     * @memberof CategoryAddDTO
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CategoryAddDTO
     */
    description?: string | null;
}

/**
 * Check if a given object implements the CategoryAddDTO interface.
 */
export function instanceOfCategoryAddDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CategoryAddDTOFromJSON(json: any): CategoryAddDTO {
    return CategoryAddDTOFromJSONTyped(json, false);
}

export function CategoryAddDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CategoryAddDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
    };
}

export function CategoryAddDTOToJSON(value?: CategoryAddDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
    };
}


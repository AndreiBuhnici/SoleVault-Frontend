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
import type { CartItemDTO } from './CartItemDTO';
import {
    CartItemDTOFromJSON,
    CartItemDTOFromJSONTyped,
    CartItemDTOToJSON,
} from './CartItemDTO';

/**
 * 
 * @export
 * @interface CartItemDTOPagedResponse
 */
export interface CartItemDTOPagedResponse {
    /**
     * 
     * @type {number}
     * @memberof CartItemDTOPagedResponse
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof CartItemDTOPagedResponse
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof CartItemDTOPagedResponse
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<CartItemDTO>}
     * @memberof CartItemDTOPagedResponse
     */
    data?: Array<CartItemDTO> | null;
}

/**
 * Check if a given object implements the CartItemDTOPagedResponse interface.
 */
export function instanceOfCartItemDTOPagedResponse(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CartItemDTOPagedResponseFromJSON(json: any): CartItemDTOPagedResponse {
    return CartItemDTOPagedResponseFromJSONTyped(json, false);
}

export function CartItemDTOPagedResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CartItemDTOPagedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'page': !exists(json, 'page') ? undefined : json['page'],
        'pageSize': !exists(json, 'pageSize') ? undefined : json['pageSize'],
        'totalCount': !exists(json, 'totalCount') ? undefined : json['totalCount'],
        'data': !exists(json, 'data') ? undefined : (json['data'] === null ? null : (json['data'] as Array<any>).map(CartItemDTOFromJSON)),
    };
}

export function CartItemDTOPagedResponseToJSON(value?: CartItemDTOPagedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'page': value.page,
        'pageSize': value.pageSize,
        'totalCount': value.totalCount,
        'data': value.data === undefined ? undefined : (value.data === null ? null : (value.data as Array<any>).map(CartItemDTOToJSON)),
    };
}


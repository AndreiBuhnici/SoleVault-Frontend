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
 * @interface CartDTO
 */
export interface CartDTO {
    /**
     * 
     * @type {string}
     * @memberof CartDTO
     */
    id?: string;
    /**
     * 
     * @type {Array<CartItemDTO>}
     * @memberof CartDTO
     */
    cartItems?: Array<CartItemDTO> | null;
    /**
     * 
     * @type {number}
     * @memberof CartDTO
     */
    size?: number;
    /**
     * 
     * @type {number}
     * @memberof CartDTO
     */
    totalPrice?: number;
    /**
     * 
     * @type {Date}
     * @memberof CartDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CartDTO
     */
    updatedAt?: Date;
}

/**
 * Check if a given object implements the CartDTO interface.
 */
export function instanceOfCartDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CartDTOFromJSON(json: any): CartDTO {
    return CartDTOFromJSONTyped(json, false);
}

export function CartDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CartDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'cartItems': !exists(json, 'cartItems') ? undefined : (json['cartItems'] === null ? null : (json['cartItems'] as Array<any>).map(CartItemDTOFromJSON)),
        'size': !exists(json, 'size') ? undefined : json['size'],
        'totalPrice': !exists(json, 'totalPrice') ? undefined : json['totalPrice'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
    };
}

export function CartDTOToJSON(value?: CartDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'cartItems': value.cartItems === undefined ? undefined : (value.cartItems === null ? null : (value.cartItems as Array<any>).map(CartItemDTOToJSON)),
        'size': value.size,
        'totalPrice': value.totalPrice,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}


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
import type { ProductDTO } from './ProductDTO';
import {
    ProductDTOFromJSON,
    ProductDTOFromJSONTyped,
    ProductDTOToJSON,
} from './ProductDTO';

/**
 * 
 * @export
 * @interface CartItemDTO
 */
export interface CartItemDTO {
    /**
     * 
     * @type {string}
     * @memberof CartItemDTO
     */
    id?: string;
    /**
     * 
     * @type {ProductDTO}
     * @memberof CartItemDTO
     */
    product?: ProductDTO;
    /**
     * 
     * @type {number}
     * @memberof CartItemDTO
     */
    quantity?: number;
    /**
     * 
     * @type {number}
     * @memberof CartItemDTO
     */
    price?: number;
    /**
     * 
     * @type {Date}
     * @memberof CartItemDTO
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CartItemDTO
     */
    updatedAt?: Date;
}

/**
 * Check if a given object implements the CartItemDTO interface.
 */
export function instanceOfCartItemDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CartItemDTOFromJSON(json: any): CartItemDTO {
    return CartItemDTOFromJSONTyped(json, false);
}

export function CartItemDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CartItemDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'product': !exists(json, 'product') ? undefined : ProductDTOFromJSON(json['product']),
        'quantity': !exists(json, 'quantity') ? undefined : json['quantity'],
        'price': !exists(json, 'price') ? undefined : json['price'],
        'createdAt': !exists(json, 'createdAt') ? undefined : (new Date(json['createdAt'])),
        'updatedAt': !exists(json, 'updatedAt') ? undefined : (new Date(json['updatedAt'])),
    };
}

export function CartItemDTOToJSON(value?: CartItemDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'product': ProductDTOToJSON(value.product),
        'quantity': value.quantity,
        'price': value.price,
        'createdAt': value.createdAt === undefined ? undefined : (value.createdAt.toISOString()),
        'updatedAt': value.updatedAt === undefined ? undefined : (value.updatedAt.toISOString()),
    };
}


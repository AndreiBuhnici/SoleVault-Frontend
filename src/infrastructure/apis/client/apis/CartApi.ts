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


import * as runtime from '../runtime';
import type {
  CartDTORequestResponse,
  CartInfoDTORequestResponse,
  CartItemAddDTO,
  CartItemDTOPagedResponseRequestResponse,
  CartItemUpdateDTO,
  RequestResponse,
} from '../models';
import {
    CartDTORequestResponseFromJSON,
    CartDTORequestResponseToJSON,
    CartInfoDTORequestResponseFromJSON,
    CartInfoDTORequestResponseToJSON,
    CartItemAddDTOFromJSON,
    CartItemAddDTOToJSON,
    CartItemDTOPagedResponseRequestResponseFromJSON,
    CartItemDTOPagedResponseRequestResponseToJSON,
    CartItemUpdateDTOFromJSON,
    CartItemUpdateDTOToJSON,
    RequestResponseFromJSON,
    RequestResponseToJSON,
} from '../models';

export interface ApiCartAddToCartPostRequest {
    cartItemAddDTO?: CartItemAddDTO;
}

export interface ApiCartGetCartItemsGetRequest {
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface ApiCartRemoveFromCartDeleteRequest {
    cartItemId?: string;
}

export interface ApiCartUpdateCartItemPutRequest {
    cartItemUpdateDTO?: CartItemUpdateDTO;
}

/**
 * 
 */
export class CartApi extends runtime.BaseAPI {

    /**
     */
    async apiCartAddToCartPostRaw(requestParameters: ApiCartAddToCartPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/AddToCart`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CartItemAddDTOToJSON(requestParameters.cartItemAddDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartAddToCartPost(requestParameters: ApiCartAddToCartPostRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCartAddToCartPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCartClearCartDeleteRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/ClearCart`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartClearCartDelete(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCartClearCartDeleteRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCartGetCartGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartDTORequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/GetCart`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CartDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartGetCartGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartDTORequestResponse> {
        const response = await this.apiCartGetCartGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCartGetCartInfoGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartInfoDTORequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/GetCartInfo`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CartInfoDTORequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartGetCartInfoGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartInfoDTORequestResponse> {
        const response = await this.apiCartGetCartInfoGetRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCartGetCartItemsGetRaw(requestParameters: ApiCartGetCartItemsGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CartItemDTOPagedResponseRequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.search !== undefined) {
            queryParameters['Search'] = requestParameters.search;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['Page'] = requestParameters.page;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['PageSize'] = requestParameters.pageSize;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/GetCartItems`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CartItemDTOPagedResponseRequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartGetCartItemsGet(requestParameters: ApiCartGetCartItemsGetRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CartItemDTOPagedResponseRequestResponse> {
        const response = await this.apiCartGetCartItemsGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCartRemoveFromCartDeleteRaw(requestParameters: ApiCartRemoveFromCartDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        if (requestParameters.cartItemId !== undefined) {
            queryParameters['cartItemId'] = requestParameters.cartItemId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/RemoveFromCart`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartRemoveFromCartDelete(requestParameters: ApiCartRemoveFromCartDeleteRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCartRemoveFromCartDeleteRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async apiCartUpdateCartItemPutRaw(requestParameters: ApiCartUpdateCartItemPutRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<RequestResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/api/Cart/UpdateCartItem`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CartItemUpdateDTOToJSON(requestParameters.cartItemUpdateDTO),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => RequestResponseFromJSON(jsonValue));
    }

    /**
     */
    async apiCartUpdateCartItemPut(requestParameters: ApiCartUpdateCartItemPutRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<RequestResponse> {
        const response = await this.apiCartUpdateCartItemPutRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

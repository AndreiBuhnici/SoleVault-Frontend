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


/**
 * 
 * @export
 */
export const ErrorCodes = {
    Unknown: 'Unknown',
    TechnicalError: 'TechnicalError',
    EntityNotFound: 'EntityNotFound',
    PhysicalFileNotFound: 'PhysicalFileNotFound',
    UserAlreadyExists: 'UserAlreadyExists',
    WrongPassword: 'WrongPassword',
    CannotAdd: 'CannotAdd',
    CannotUpdate: 'CannotUpdate',
    CannotDelete: 'CannotDelete',
    MailSendFailed: 'MailSendFailed',
    CategoryAlreadyExists: 'CategoryAlreadyExists',
    ProductAlreadyExists: 'ProductAlreadyExists',
    NotOwner: 'NotOwner',
    CartItemInAnotherCart: 'CartItemInAnotherCart',
    CartAlreadyExists: 'CartAlreadyExists',
    NotEnoughStock: 'NotEnoughStock',
    InvalidQuantity: 'InvalidQuantity',
    InvalidSearchQuery: 'InvalidSearchQuery',
    UserPermission: 'UserPermission',
    InvalidStock: 'InvalidStock',
    InvalidPrice: 'InvalidPrice',
    InvalidSize: 'InvalidSize',
    InvalidPhoneNumber: 'InvalidPhoneNumber',
    CartEmpty: 'CartEmpty',
    FeedbackFormAlreadyExists: 'FeedbackFormAlreadyExists'
} as const;
export type ErrorCodes = typeof ErrorCodes[keyof typeof ErrorCodes];


export function ErrorCodesFromJSON(json: any): ErrorCodes {
    return ErrorCodesFromJSONTyped(json, false);
}

export function ErrorCodesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ErrorCodes {
    return json as ErrorCodes;
}

export function ErrorCodesToJSON(value?: ErrorCodes | null): any {
    return value as any;
}


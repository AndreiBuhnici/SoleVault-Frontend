import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ApiProductGetPageGetRequest, CartApi, CartItemAddDTO, CartItemUpdateDTO } from "../client";

const getCartQueryKey = 'getCart';
const getCartInfoQueryKey = 'getCartInfo';
const getCartItemsQueryKey = 'getCartItems';
const clearCartQueryKey = 'clearCart';
const addToCartQueryKey = 'addToCart';
const removeFromCartQueryKey = 'removeFromCart';
const updateCartItemQueryKey = 'updateCartItem';

export const useCartApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getCart = () => new CartApi(config).apiCartGetCartGet();
    const getCartInfo = () => new CartApi(config).apiCartGetCartInfoGet();
    const getCartItems = (page: ApiProductGetPageGetRequest) => new CartApi(config).apiCartGetCartItemsGet(page);
    const clearCart = () => new CartApi(config).apiCartClearCartDelete();
    const addToCart = (cartItemAddDTO: CartItemAddDTO) => new CartApi(config).apiCartAddToCartPost({cartItemAddDTO});
    const removeFromCart = (cartItemId: string) => new CartApi(config).apiCartRemoveFromCartDelete({cartItemId});
    const updateCartItem = (cartItemUpdateDTO: CartItemUpdateDTO) => new CartApi(config).apiCartUpdateCartItemPut({cartItemUpdateDTO});

    return {
        getCart: {
            key: getCartQueryKey,
            query: getCart
        },
        getCartInfo: {
            key: getCartInfoQueryKey,
            query: getCartInfo
        },
        getCartItems: {
            key: getCartItemsQueryKey,
            query: getCartItems
        },
        clearCart: {
            key: clearCartQueryKey,
            mutation: clearCart
        },
        addToCart: {
            key: addToCartQueryKey,
            mutation: addToCart
        },
        removeFromCart: {
            key: removeFromCartQueryKey,
            mutation: removeFromCart
        },
        updateCartItem: {
            key: updateCartItemQueryKey,
            mutation: updateCartItem
        }
    }
};
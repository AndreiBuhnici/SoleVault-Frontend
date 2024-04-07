import { useCartApi } from "@infrastructure/apis/api-management/cart";
import { useIntl } from "react-intl";
import { usePaginationController } from "../Pagination.controller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useTableController } from "../Table.controller";
import { CartItemAddDTO } from '../../../../../infrastructure/apis/client/models/CartItemAddDTO';

export const useCartTableController = () => {
    const { formatMessage } = useIntl();
    const { getCartInfo: {key: infoQueryKey, query: infoQuery}, getCartItems: { key: queryKey, query }, removeFromCart: { key: removeFromCartKey, mutation: removeFromCart }, addToCart: { key: addToCartKey, mutation: addToCart } } = useCartApi();
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const [search, setSearch] = useState('');
    const { data: infoData, isError: infoError, isLoading: infoLoading } = useQuery({
        queryKey: [infoQueryKey],
        queryFn: infoQuery
    });

    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({ search, page, pageSize })
    });

    const { mutateAsync: addToCartMutation } = useMutation({
        mutationKey: [addToCartKey],
        mutationFn: addToCart
    });

    const { mutateAsync: removeMutation } = useMutation({
        mutationKey: [removeFromCartKey],
        mutationFn: removeFromCart
    });

    const add = useCallback(
        (cartItemAddDTO: CartItemAddDTO, tryReload: () => Promise<void>) => addToCartMutation(cartItemAddDTO).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            queryClient.invalidateQueries({ queryKey: [infoQueryKey] });
            tryReload();
            toast(formatMessage({ id: "notifications.messages.addToCartSuccess" }));
        }),[queryClient, addToCartMutation, queryKey, infoQueryKey]);

    const remove = useCallback(
        (id: string) => removeMutation(id).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            queryClient.invalidateQueries({ queryKey: [infoQueryKey] });
            toast(formatMessage({ id: "notifications.messages.removeFromCartSuccess" }));
        }),[queryClient, removeMutation, queryKey, infoQueryKey]);
    
    const tryReload = useCallback(
        () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            queryClient.invalidateQueries({ queryKey: [infoQueryKey] });
        },
        [queryClient, queryKey, infoQueryKey]);

    const tableController = useTableController(setPagination, data?.response?.pageSize);

    const handleSearch = (newSearch: string) => {
        setSearch(newSearch);
        queryClient.invalidateQueries({ queryKey: [queryKey] });
    }

    return {
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        handleSearch,
        infoData,
        infoError,
        infoLoading,
        add
    };
};
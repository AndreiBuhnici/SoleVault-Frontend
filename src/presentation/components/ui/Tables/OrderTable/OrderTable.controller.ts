import { useOrderApi } from "@infrastructure/apis/api-management/order";
import { useIntl } from "react-intl";
import { usePaginationController } from "../Pagination.controller";
import { useCallback, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderAddDTO } from "@infrastructure/apis/client";
import { toast } from "react-toastify";
import { useTableController } from "../Table.controller";

export const useOrderTableController = () => {
    const { formatMessage } = useIntl();
    const {
        getPage: { key: queryKey, query },
        createOrder: { key: createOrderKey, mutation: createOrder }
    } = useOrderApi();
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const [search, setSearch] = useState('');

    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({ search, page, pageSize })
    });

    const { mutateAsync: createOrderMutation } = useMutation({
        mutationKey: [createOrderKey],
        mutationFn: createOrder
    });

    const create = useCallback(
        (orderAddDTO: OrderAddDTO, tryReload: () => Promise<void>) => createOrderMutation(orderAddDTO).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            tryReload();
            toast(formatMessage({ id: "notifications.messages.createOrderSuccess" }));
        }), [createOrderMutation, queryClient, queryKey]);

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]);

    const handleSearch = (newSearch: string) => {
        setSearch(newSearch);
        queryClient.invalidateQueries({ queryKey: [queryKey] });
    }

    const tableController = useTableController(setPagination, data?.response?.pageSize);

    return {
        ...tableController,
        tryReload,
        create,
        pagedData: data?.response,
        isError,
        isLoading,
        handleSearch
    };
};
import { useProductApi } from "@infrastructure/apis/api-management/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { usePaginationController } from "../Pagination.controller";
import { useTableController } from "../Table.controller";

export const useClientProductTableController = () => {
    const { getProducts: { key: queryKey, query } } = useProductApi();
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const [search, setSearch] = useState('');
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({ search, page, pageSize })
    });

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]);

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
        handleSearch
    };
};

export const usePersonnelProductTableController = () => {
    const { getProductsbyOwnerId: { key: queryKey, query }, deleteProduct: { key: deleteProductKey, mutation: deleteProduct } } = useProductApi();
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const [search, setSearch] = useState('');
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({ search, page, pageSize })
    });
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteProductKey],
        mutationFn: deleteProduct
    });

    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]);

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]);

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
        handleSearch
    };
};
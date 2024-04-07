import { useCategoryApi } from "@infrastructure/apis/api-management/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePaginationController } from "../Pagination.controller";
import { useCallback, useState } from "react";
import { useTableController } from "../Table.controller";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";

export const useCategoryTableController = () => {
    const { formatMessage } = useIntl();
    const { getCategories: { key: queryKey, query }, deleteCategory: { key: deleteCategoryKey, mutation: deleteCategory } } = useCategoryApi(); 
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const [search, setSearch] = useState('');
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({ search, page, pageSize })
    });
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteCategoryKey],
        mutationFn: deleteCategory
    });

    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast(formatMessage({ id: "notifications.messages.deleteCategorySuccess" }));
        }),[queryClient, deleteMutation, queryKey]);

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
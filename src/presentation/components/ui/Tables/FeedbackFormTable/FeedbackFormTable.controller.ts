import { useFeedbackFormApi } from "@infrastructure/apis/api-management/feedbackForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { usePaginationController } from "../Pagination.controller";
import { useTableController } from "../Table.controller";

export const useFeedbackFormController = () => {
    const { formatMessage } = useIntl();
    const { getFeedbackFormsQuery: { key: queryKey, query } } = useFeedbackFormApi();
    const queryClient = useQueryClient();
    const { page, pageSize, setPagination } = usePaginationController();
    const [search, setSearch] = useState('');

    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize, search],
        queryFn: () => query({ page, pageSize, search })
    });

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
        pagedData: data?.response,
        isError,
        isLoading,
        handleSearch
    };
};
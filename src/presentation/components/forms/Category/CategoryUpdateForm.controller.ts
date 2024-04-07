import { isUndefined } from "lodash";
import { CategoryUpdateFormController, CategoryUpdateFormModel } from "./CategoryUpdateForm.type";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategoryApi } from "@infrastructure/apis/api-management/category";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CategoryDTO } from "@infrastructure/apis/client";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";

const getDefaultValues = (initialData?: CategoryUpdateFormModel) => {
    const defaultValues: CategoryUpdateFormModel = {
        name: "",
        description: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitCategoryUpdateForm = () => {
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        name: yup.string()
            .default(defaultValues.name),
        description: yup.string()
            .default(defaultValues.description),
    });

    const resolver = yupResolver(schema);

    return {defaultValues, resolver};
};

export const useCategoryUpdateFormController = (entry: CategoryDTO, onSubmit?: () => void): CategoryUpdateFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitCategoryUpdateForm();
    const { updateCategory: { mutation, key: mutationKey }, getCategories: { key: queryKey } } = useCategoryApi();
    const { mutateAsync: update, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation,
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: CategoryUpdateFormModel) => {
        const updatedData = {
            id: entry.id,
            name: data.name ? data.name : entry.name,
            description: data.description ? data.description : entry.description
        };
        update(updatedData).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast(formatMessage({ id: "notifications.messages.updateCategorySuccess" }));

            if (onSubmit) {
                onSubmit();
            }
        })
    }, [update, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<CategoryUpdateFormModel>({
        defaultValues,
        resolver
    });

    return {
        actions: {
            handleSubmit,
            submit,
            register,
            watch
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending"
        },
        state: {
            errors
        }
    }
};
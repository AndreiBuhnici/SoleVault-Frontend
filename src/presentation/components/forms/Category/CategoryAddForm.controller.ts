import { useIntl } from "react-intl";
import { CategoryAddFormController, CategoryAddFormModel } from "./CategoryAddForm.types";
import { isUndefined } from 'lodash';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useCategoryApi } from "@infrastructure/apis/api-management/category";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from "react";
import { useForm } from "react-hook-form";

const getDefaultValues = (initialData?: CategoryAddFormModel) => {
    const defaultValues: CategoryAddFormModel = {
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

const useInitCategoryAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        name: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.name",
                    }),
                }))
            .default(defaultValues.name),
        description: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.description",
                    }),
                }))
            .default(defaultValues.description),
    });

    const resolver = yupResolver(schema);
    
    return { defaultValues, resolver };
};

export const useCategoryAddFormController = (onSubmit?: () => void): CategoryAddFormController => {
    const { defaultValues, resolver } = useInitCategoryAddForm();
    const { createCategory: { mutation, key: mutationKey }, getCategories: { key: queryKey } } = useCategoryApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: CategoryAddFormModel) =>
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<CategoryAddFormModel>({
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
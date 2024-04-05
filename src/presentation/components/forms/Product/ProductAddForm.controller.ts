import { isUndefined } from "lodash";
import { ProductAddFormController, ProductAddFormModel } from "./ProductAddForm.types";
import { useIntl } from "react-intl";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useProductApi } from "@infrastructure/apis/api-management/product";
import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const getDefaultValue = (initialData?: ProductAddFormModel) => {
    const defaultValues: ProductAddFormModel = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        size: 0,
        color: "",
        imageUrl: "",
        categoryId: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitProductAddForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValue();

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
        price: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.price",
                    }),
                }))
            .default(defaultValues.price),
        stock: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.stock",
                    }),
                }))
            .default(defaultValues.stock),
        size: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.size",
                    }),
                }))
            .default(defaultValues.size),
        color: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.color",
                    }),
                }))
            .default(defaultValues.color),
        imageUrl: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.imageUrl",
                    }),
                }))
            .default(defaultValues.imageUrl),
        categoryId: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.category",
                    }),
                }))
            .default(defaultValues.categoryId),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
};

export const useProductAddFormController = (onSubmit?: () => void): ProductAddFormController => {
    const { defaultValues, resolver } = useInitProductAddForm();
    const { createProduct: { mutation, key: mutationKey }, getProducts: { key: queryKey } } = useProductApi();
    const { mutateAsync: add, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: ProductAddFormModel) =>
        add(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });

            if (onSubmit) {
                onSubmit();
            }
        }), [add, queryClient, queryKey]);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<ProductAddFormModel>({
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
    };
};
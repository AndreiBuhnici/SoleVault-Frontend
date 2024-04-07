import { isUndefined } from "lodash";
import { ProductUpdateFormController, ProductUpdateFormModel } from "./ProductUpdateForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { ProductDTO } from "@infrastructure/apis/client";
import { useProductApi } from "@infrastructure/apis/api-management/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";

const getDefaultValues = (initialData?: ProductUpdateFormModel) => {
    const defaultValues: ProductUpdateFormModel = {
        description: "",
        price: 0,
        stock: 0,
        imageUrl: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitiProductUpdateForm = () => {
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        description: yup.string()
            .default(defaultValues.description),
        price: yup.number()
            .default(defaultValues.price),
        stock: yup.number()
            .default(defaultValues.stock),
        imageUrl: yup.string()
            .default(defaultValues.imageUrl),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
};

export const useProductUpdateFormController = (entry: ProductDTO, onSubmit?: () => void): ProductUpdateFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitiProductUpdateForm();
    const { updateProduct: { mutation, key: mutationKey }, getProducts: { key: queryKey } } = useProductApi();
    const { mutateAsync: update, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation,
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: ProductUpdateFormModel) => {
        const updatedData = {
            id: entry.id,
            description: data.description ? data.description : entry.description,
            price: data.price ? data.price : entry.price,
            stock: data.stock ? data.stock : entry.stock,
            imageUrl: data.imageUrl ? data.imageUrl : entry.imageUrl,
        };
        update(updatedData).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast(formatMessage({ id: "notifications.messages.updateProductSuccess" }));

            if (onSubmit) {
                onSubmit();
            }
        });
    }, [update, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ProductUpdateFormModel>({
        resolver,
        defaultValues
    });

    return {
        actions: {
            register,
            watch,
            handleSubmit,
            submit,
        },
        state: {
            errors,
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending",
        }
    };
};
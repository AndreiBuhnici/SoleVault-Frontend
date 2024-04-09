import { isUndefined } from "lodash";
import { OrderCreateFormController, OrderCreateFormModel } from "./OrderCreateForm.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useIntl } from "react-intl";
import { useOrderApi } from "@infrastructure/apis/api-management/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCartApi } from "@infrastructure/apis/api-management";

const getDefaultValue = (initialData?: OrderCreateFormModel) => {
    const defaultValues = {
        phoneNumber: "",
        shippingAddress: "",
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

const useInitOrderCreateForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValue();

    const schema = yup.object().shape({
        phoneNumber: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.phoneNumber",
                    }),
                }))
            .default(defaultValues.phoneNumber),
        shippingAddress: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.shippingAddress",
                    }),
                }))
            .default(defaultValues.shippingAddress),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
};

export const useOrderCreateFormController = (onSubmit?: () => void): OrderCreateFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitOrderCreateForm();
    const { createOrder: { mutation, key: mutationKey }, getPage: { key: queryKey } } = useOrderApi();
    const { getCartInfo: { key: cartInfoQueryKey }, getCartItems: { key: cartItemsQueryKey } } = useCartApi();
    const { mutateAsync: create, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation,
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: OrderCreateFormModel) =>
        create(data).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            queryClient.invalidateQueries({ queryKey: [cartInfoQueryKey] });
            queryClient.invalidateQueries({ queryKey: [cartItemsQueryKey] });
            toast(formatMessage({ id: "notifications.messages.createOrderSuccess" }));
            if (onSubmit) {
                onSubmit();
            }
        }), [create, queryClient, queryKey, cartInfoQueryKey, cartItemsQueryKey]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<OrderCreateFormModel>({
        resolver,
        defaultValues,
    });

    return {
        state: {
            errors,
        },
        actions: {
            submit,
            register,
            watch,
            handleSubmit,
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending",
        },
    };
    
};
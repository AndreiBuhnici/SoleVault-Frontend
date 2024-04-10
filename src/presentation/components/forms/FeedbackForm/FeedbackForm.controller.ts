import { yupResolver } from "@hookform/resolvers/yup";
import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import * as yup from 'yup';
import { FeedBackFormController, FeedBackFormModel } from "./FeedbackForm.types";
import { useFeedbackFormApi } from "@infrastructure/apis/api-management/feedbackForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const getDefaultValues = (initialData?: { feedback: string, favoriteFeatures: string[] }) => {
    const defaultValues = {
        feedback: "",
        overallRating: 0,
        deliveryRating: 0,
        favoriteFeatures: [""]
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
}

const useInitFeedbackForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        feedback: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.feedback",
                    }),
                }))
            .default(defaultValues.feedback),
        overallRating: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.overallRating",
                    }),
                }))
            .min(1, formatMessage(
                { id: "globals.validations.minValue" },
                {
                    fieldName: formatMessage({
                        id: "globals.overallRating",

                    }),
                    value: 1
                }))
            .max(5, formatMessage(
                { id: "globals.validations.maxValue" },
                {
                    fieldName: formatMessage({
                        id: "globals.overallRating",
                    }),
                    value: 5
                }))
            .default(defaultValues.overallRating),
        deliveryRating: yup.number()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.deliveryRating",
                    }),
                }))
            .min(1, formatMessage(
                { id: "globals.validations.minValue" },
                {
                    fieldName: formatMessage({
                        id: "globals.deliveryRating",
                    }),
                    value: 1
                }))
            .max(5, formatMessage(
                { id: "globals.validations.maxValue" },
                {
                    fieldName: formatMessage({
                        id: "globals.deliveryRating",
                    }),
                    value: 5
                }))
            .default(defaultValues.deliveryRating),
            
        favoriteFeatures: yup.array()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.favoriteFeatures",
                    }),
                }))
            .of(yup.string().required())
            .default(defaultValues.favoriteFeatures)
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

export const useFeedbackFormController = (): FeedBackFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitFeedbackForm();
    const { addFeedbackFormMutation: { mutation, key: mutationKey } } = useFeedbackFormApi();
    const { mutateAsync: addFeedbackForm, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: FeedBackFormModel) => {
        const newData = {
            ...data,
            favoriteFeatures: data.favoriteFeatures.join(", ")
        };
        addFeedbackForm(newData).then(() => {
            toast(formatMessage({ id: "notifications.messages.addFeedbackFormSuccess" }));
        }
    )}, [addFeedbackForm, formatMessage, mutationKey, queryClient]);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FeedBackFormModel>({
        resolver,
        defaultValues
    });

    return {
        actions: {
            handleSubmit,
            submit,
            register
        },
        state: {
            errors
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending"
        }
    };

}
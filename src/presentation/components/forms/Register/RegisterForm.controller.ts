import { yupResolver } from "@hookform/resolvers/yup";
import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { RegisterFormController, RegisterFormModel } from './RegisterForm.types';
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useRegisterApi } from "@infrastructure/apis/api-management/register";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from "@application/store";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const getDefaultValues = (initialData?: { email: string }) => {
    const defaultValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
}

const useInitRegisterForm = () => {
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
        email: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.email",
                    }),
                }))
            .email()
            .default(defaultValues.email),
        password: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.password",
                    }),
                }))
            .default(defaultValues.password),
        confirmPassword: yup.string()
            .required(formatMessage(
                { id: "globals.validations.requiredField" },
                {
                    fieldName: formatMessage({
                        id: "globals.confirmPassword",
                    }),
                }))
            .oneOf([yup.ref('password')], formatMessage(
                { id: "globals.validations.passwordsMustMatch" }
            ))
            .default(defaultValues.confirmPassword),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

export const useRegisterFormController = (): RegisterFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { redirectToLogin } = useAppRouter();
    const { registerMutation : {mutation, key: mutationKey} } = useRegisterApi();
    const { mutateAsync: register, status } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const submit = useCallback((data: RegisterFormModel) =>
        register(data).then((result) => {
            toast(formatMessage({ id: "notifications.messages.registrationSuccess" }));
            redirectToLogin();
        }), [register, queryClient, redirectToLogin, dispatch]);

    const {
        register: formRegister, // Rename the variable to 'formRegister'
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormModel>({
        defaultValues,
        resolver
    });

    return {
        actions: {
            handleSubmit,
            submit,
            register: formRegister
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending"
        },
        state: {
            errors
        }
    }
}
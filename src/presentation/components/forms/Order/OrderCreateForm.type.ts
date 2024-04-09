import { DeepRequired, FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormController } from "../FormController";

export type OrderCreateFormModel = {
    phoneNumber: string;
    shippingAddress: string;
};

export type OrderCreateFormState = {
    errors: FieldErrorsImpl<DeepRequired<OrderCreateFormModel>>;
};

export type OrderCreateFormActions = {
    submit: (body: OrderCreateFormModel) => void;
    register: UseFormRegister<OrderCreateFormModel>;
    watch: UseFormWatch<OrderCreateFormModel>;
    handleSubmit: UseFormHandleSubmit<OrderCreateFormModel>;
};

export type OrderCreateFormComputed = {
    defaultValues: OrderCreateFormModel;
    isSubmitting: boolean;
};

export type OrderCreateFormController = FormController<OrderCreateFormState, OrderCreateFormActions, OrderCreateFormComputed>;
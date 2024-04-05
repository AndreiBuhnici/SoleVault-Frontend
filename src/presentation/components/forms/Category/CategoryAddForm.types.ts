import { DeepRequired, FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormController } from "../FormController";

export type CategoryAddFormModel = {
    name: string;
    description: string;
};

export type CategoryAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<CategoryAddFormModel>>;
};

export type CategoryAddFormActions = {
    register: UseFormRegister<CategoryAddFormModel>;
    watch: UseFormWatch<CategoryAddFormModel>;
    handleSubmit: UseFormHandleSubmit<CategoryAddFormModel>;
    submit: (body: CategoryAddFormModel) => void;
};

export type CategoryAddFormComputed = {
    defaultValues: CategoryAddFormModel,
    isSubmitting: boolean
};

export type CategoryAddFormController = FormController<CategoryAddFormState, CategoryAddFormActions, CategoryAddFormComputed>;
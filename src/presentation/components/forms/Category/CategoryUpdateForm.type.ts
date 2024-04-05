import { DeepRequired, FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from "react-hook-form";
import { FormController } from "../FormController";

export type CategoryUpdateFormModel = {
    name: string;
    description: string;
};

export type CategoryUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<CategoryUpdateFormModel>>;
};

export type CategoryUpdateFormActions = {
    register: UseFormRegister<CategoryUpdateFormModel>;
    watch: UseFormWatch<CategoryUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<CategoryUpdateFormModel>;
    submit: (body: CategoryUpdateFormModel) => void;
};

export type CategoryUpdateFormComputed = {
    defaultValues: CategoryUpdateFormModel;
    isSubmitting: boolean;
};

export type CategoryUpdateFormController = FormController<CategoryUpdateFormState, CategoryUpdateFormActions, CategoryUpdateFormComputed>;


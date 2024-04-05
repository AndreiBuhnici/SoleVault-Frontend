import { FieldErrorsImpl, DeepRequired, UseFormRegister, UseFormWatch, UseFormHandleSubmit } from "react-hook-form";
import { FormController } from "../FormController";

export type ProductUpdateFormModel = {
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
};

export type ProductUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<ProductUpdateFormModel>>;
};

export type ProductUpdateFormActions = {
    register: UseFormRegister<ProductUpdateFormModel>;
    watch: UseFormWatch<ProductUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<ProductUpdateFormModel>;
    submit: (body: ProductUpdateFormModel) => void;
};

export type ProductUpdateFormComputed = {
    defaultValues: ProductUpdateFormModel;
    isSubmitting: boolean;
};

export type ProductUpdateFormController = FormController<ProductUpdateFormState, ProductUpdateFormActions, ProductUpdateFormComputed>;
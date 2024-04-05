import { FieldErrorsImpl, DeepRequired, UseFormRegister, UseFormWatch, UseFormHandleSubmit } from "react-hook-form";
import { FormController } from "../FormController";

export type ProductAddFormModel = {
    name: string;
    description: string;
    price: number;
    stock: number;
    size: number;
    color: string;
    imageUrl: string;
    categoryId: string;
};

export type ProductAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<ProductAddFormModel>>;
};

export type ProductAddFormActions = {
    register: UseFormRegister<ProductAddFormModel>;
    watch: UseFormWatch<ProductAddFormModel>;
    handleSubmit: UseFormHandleSubmit<ProductAddFormModel>;
    submit: (body: ProductAddFormModel) => void;
};

export type ProductAddFormComputed = {
    defaultValues: ProductAddFormModel,
    isSubmitting: boolean
};

export type ProductAddFormController = FormController<ProductAddFormState, ProductAddFormActions, ProductAddFormComputed>;
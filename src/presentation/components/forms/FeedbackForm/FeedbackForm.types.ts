import { DeepRequired, FieldErrorsImpl, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormController } from "../FormController";

export type FeedBackFormModel = {
    feedback: string;
    overallRating: number;
    deliveryRating: number;
    favoriteFeatures: string[];
}

export type FeedBackFormState = {
    errors: FieldErrorsImpl<DeepRequired<FeedBackFormModel>>;
};

export type FeedBackFormActions = {
    register: UseFormRegister<FeedBackFormModel>;
    handleSubmit: UseFormHandleSubmit<FeedBackFormModel>;
    submit: (body: FeedBackFormModel) => void;
};

export type FeedBackFormComputed = {
    defaultValues: FeedBackFormModel;
    isSubmitting: boolean;
};

export type FeedBackFormController = FormController<FeedBackFormState, FeedBackFormActions, FeedBackFormComputed>;
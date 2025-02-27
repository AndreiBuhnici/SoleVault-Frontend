import { useIntl } from "react-intl";
import { useInterceptor } from "@infrastructure/hooks/useInterceptor";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ErrorResponse } from "@application/models/ErrorResponse";
import { is } from "@infrastructure/utils/typeUtils";
import { useTokenHasExpired } from "@infrastructure/hooks/useOwnUser";
import { ErrorCodes } from "@infrastructure/apis/client";

/**
 * This function is used to return the proper translation for the error message for the given error code.
 */
const getTranslationIdForKey = (code?: ErrorCodes) => {
    switch (code) {
        case ErrorCodes.CannotAdd:
            return { id: "notifications.errors.cannotAdd" };

        case ErrorCodes.CannotDelete:
            return { id: "notifications.errors.cannotDelete" };

        case ErrorCodes.CannotUpdate:
            return { id: "notifications.errors.cannotUpdate" };

        case ErrorCodes.CartAlreadyExists:
            return { id: "notifications.errors.cartAlreadyExists" };

        case ErrorCodes.CartItemInAnotherCart:
            return { id: "notifications.errors.cartItemInAnotherCart" };

        case ErrorCodes.CategoryAlreadyExists:
            return { id: "notifications.errors.categoryAlreadyExists" };

        case ErrorCodes.EntityNotFound:
            return { id: "notifications.errors.entityNotFound" };

        case ErrorCodes.InvalidPrice:
            return { id: "notifications.errors.invalidPrice" };
        
        case ErrorCodes.InvalidQuantity:
            return { id: "notifications.errors.invalidQuantity" };

        case ErrorCodes.InvalidSearchQuery:
            return { id: "notifications.errors.invalidSearchQuery" };

        case ErrorCodes.InvalidSize:
            return { id: "notifications.errors.invalidSize" };

        case ErrorCodes.InvalidStock:
            return { id: "notifications.errors.invalidStock" };

        case ErrorCodes.MailSendFailed:
            return { id: "notifications.errors.mailSendFailed" };
            
        case ErrorCodes.NotEnoughStock:
            return { id: "notifications.errors.notEnoughStock" };
            
        case ErrorCodes.NotOwner:
            return { id: "notifications.errors.notOwner" };
            
        case ErrorCodes.PhysicalFileNotFound:
            return { id: "notifications.errors.physicalFileNotFound" };

        case ErrorCodes.ProductAlreadyExists:
            return { id: "notifications.errors.productAlreadyExists" };
            
        case ErrorCodes.TechnicalError:
            return { id: "notifications.errors.technicalError" };
            
        case ErrorCodes.Unknown:
            return { id: "notifications.errors.unknown" };
            
        case ErrorCodes.UserAlreadyExists:
            return { id: "notifications.errors.userAlreadyExists" };
            
        case ErrorCodes.UserPermission:
            return { id: "notifications.errors.userPermission" };
            
        case ErrorCodes.WrongPassword:
            return { id: "notifications.errors.wrongPassword" };

        case ErrorCodes.InvalidPhoneNumber:
            return { id: "notifications.errors.invalidPhoneNumber" };

        case ErrorCodes.CartEmpty:
            return { id: "notifications.errors.cartEmpty" };

        case ErrorCodes.FeedbackFormAlreadyExists:
            return { id: "notifications.errors.feedbackFormAlreadyExists" };

        default:
            return { id: "notifications.errors.unknownHappened" };
    }
};

/**
 * This component provides the toast notifications and also uses a setups a HTTP request interceptor to notify the user on errors.
 */
export const ToastNotifier = () => {
    const { formatMessage } = useIntl();
    const tokenHasExpired = useTokenHasExpired();

    useInterceptor({
        async onResponse(response: Response) {
            if (response.status === 401 && tokenHasExpired.loggedIn && tokenHasExpired.hasExpired) { // If the token has expired show the proper notification.
                toast.error(formatMessage({ id: "notifications.errors.sessionExpired" }));
            } else if (response.status === 500) {
                toast.error(formatMessage({ id: "notifications.errors.unknownHappened" })); // If the server encounters an unexpected error show the proper notification.
            } else if (!response.ok && response.headers.has("content-type") && response.headers.get("content-type")?.includes("application/json")) { // If the server returns an error with a error code show the proper notification with a message corresponding to the error code.
                const cloned = response.clone(); // You need to clone the response because once the json() method is called the response stream is consumed and you cannot consume it again.
                const error = await cloned.json();

                if (error && is<ErrorResponse>(error)) {
                    toast.error(formatMessage(
                        { id: "notifications.errors.errorMessage" },
                        {
                            code: formatMessage(getTranslationIdForKey(error.errorMessage.code))
                        }
                    ));
                }
            }

            return response;
        },
        onResponseError(error: any) {
            if (error.message === 'Failed to fetch') {
                toast.error(formatMessage({ id: "notifications.errors.networkError" }));
            }

            return error;
        }
    });

    return <ToastContainer // Create the toast container to enable the notification visualization.
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
    />
}
import { UserRegisterDTO } from "../client";
import { AuthorizationApi } from "../client/apis";

const registerMutationKey = 'registerMutation';

export const useRegisterApi = () => {
    const registerMutation = (userRegisterDTO: UserRegisterDTO) => new AuthorizationApi().apiAuthorizationRegisterPost({ userRegisterDTO });

    return {
        registerMutation: {
            key: registerMutationKey,
            mutation: registerMutation
        }
    }
};
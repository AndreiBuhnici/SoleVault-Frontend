import { useAppSelector } from '@application/store';
import { ApiFeedbackFormGetFeedbackFormsGetRequest, FeedbackFormApi } from '../client';
import { FeedBackFormAddDTO } from '../client/models/FeedBackFormAddDTO';
import { getAuthenticationConfiguration } from '@infrastructure/utils/userUtils';

const addFeedbackFormKey = 'addFeedbackForm';
const getFeedbackFormsKey = 'getFeedbackForms';

export const useFeedbackFormApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);
    
    const addFeedbackForm = (feedBackFormAddDTO: FeedBackFormAddDTO) => new FeedbackFormApi(config).apiFeedbackFormAddFeedbackFormPost({ feedBackFormAddDTO });
    const getFeedbackForms = (page: ApiFeedbackFormGetFeedbackFormsGetRequest) => new FeedbackFormApi(config).apiFeedbackFormGetFeedbackFormsGet(page);

    return {
        addFeedbackFormMutation: {
            key: addFeedbackFormKey,
            mutation: addFeedbackForm
        },
        getFeedbackFormsQuery: {
            key: getFeedbackFormsKey,
            query: getFeedbackForms
        }
    };
};
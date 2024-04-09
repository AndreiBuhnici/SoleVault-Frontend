import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ApiOrderGetPageGetRequest, OrderAddDTO, OrderApi } from "../client";

const getPageQueryKey = 'getPage';
const getOrderQueryKey = 'getOrder';
const createOrderQueryKey = 'createOrder';

export const useOrderApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getPage = (page: ApiOrderGetPageGetRequest) => new OrderApi(config).apiOrderGetPageGet(page);
    const getOrder = (id: string) => new OrderApi(config).apiOrderGetOrderIdGet({ id });
    const createOrder = (order: OrderAddDTO) => new OrderApi(config).apiOrderCreateOrderPost({ orderAddDTO: order });

    return {
        getPage: {
            key: getPageQueryKey,
            query: getPage
        },
        getOrder: {
            key: getOrderQueryKey,
            query: getOrder
        },
        createOrder: {
            key: createOrderQueryKey,
            mutation: createOrder
        }
    };
};
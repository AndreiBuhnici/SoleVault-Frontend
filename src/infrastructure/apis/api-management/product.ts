import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ApiProductGetPagebyOwnerIdGetRequest, ApiProductGetPageGetRequest, ProductAddDTO, ProductApi, ProductUpdateDTO } from "../client";

const getProductsbyOwnerIdQueryKey = 'getProductsbyOwnerId';
const getProductsQueryKey = 'getProducts';
const getProductQueryKey = 'getProduct';
const createProductMutationKey = 'createProduct';
const updateProductMutationKey = 'updateProduct';
const deleteProductMutationKey = 'deleteProduct';

export const useProductApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getProductsbyOwnerId = (page: ApiProductGetPagebyOwnerIdGetRequest) => new ProductApi(config).apiProductGetPagebyOwnerIdGet(page);
    const getProducts = (page: ApiProductGetPageGetRequest) => new ProductApi(config).apiProductGetPageGet(page);
    const getProduct = (id: string) => new ProductApi(config).apiProductGetByIdIdGet({ id });
    const createProduct = (product: ProductAddDTO) => new ProductApi(config).apiProductAddPost({ productAddDTO: product });
    const updateProduct = (product: ProductUpdateDTO) => new ProductApi(config).apiProductUpdatePut({ productUpdateDTO: product });
    const deleteProduct = (id: string) => new ProductApi(config).apiProductDeleteIdDelete({ id });

    return {
        getProductsbyOwnerId: {
            key: getProductsbyOwnerIdQueryKey,
            query: getProductsbyOwnerId
        },
        getProducts: {
            key: getProductsQueryKey,
            query: getProducts
        },
        getProduct: {
            key: getProductQueryKey,
            query: getProduct
        },
        createProduct: {
            key: createProductMutationKey,
            mutation: createProduct
        },
        updateProduct: {
            key: updateProductMutationKey,
            mutation: updateProduct
        },
        deleteProduct: {
            key: deleteProductMutationKey,
            mutation: deleteProduct
        }
    };
};
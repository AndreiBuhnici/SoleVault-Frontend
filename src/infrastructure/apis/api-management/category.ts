import { useAppSelector } from "@application/store";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { ApiCategoryGetPageGetRequest, CategoryAddDTO, CategoryApi, CategoryUpdateDTO } from "../client";


const getCategoriesQueryKey = 'getCategories';
const getCategoryQueryKey = 'getCategory';
const createCategoryMutationKey = 'createCategory';
const updateCategoryMutationKey = 'updateCategory';
const deleteCategoryMutationKey = 'deleteCategory';

export const useCategoryApi = () => {
    const { token } = useAppSelector(x => x.profileReducer);
    const config = getAuthenticationConfiguration(token);

    const getCategories = (page: ApiCategoryGetPageGetRequest) => new CategoryApi(config).apiCategoryGetPageGet(page);
    const getCategory = (id: string) => new CategoryApi(config).apiCategoryGetByIdIdGet({ id });
    const createCategory = (category: CategoryAddDTO) => new CategoryApi(config).apiCategoryAddPost({ categoryAddDTO: category });
    const updateCategory = (category: CategoryUpdateDTO) => new CategoryApi(config).apiCategoryUpdatePut({ categoryUpdateDTO: category });
    const deleteCategory = (id: string) => new CategoryApi(config).apiCategoryDeleteIdDelete({ id });

    return {
        getCategories: {
            key: getCategoriesQueryKey,
            query: getCategories
        },
        getCategory: {
            key: getCategoryQueryKey,
            query: getCategory
        },
        createCategory: {
            key: createCategoryMutationKey,
            mutation: createCategory
        },
        updateCategory: {
            key: updateCategoryMutationKey,
            mutation: updateCategory
        },
        deleteCategory: {
            key: deleteCategoryMutationKey,
            mutation: deleteCategory
        }
    }
};
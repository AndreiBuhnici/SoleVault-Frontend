import { Stack, Grid, FormControl, FormLabel, OutlinedInput, FormHelperText, Button, CircularProgress, MenuItem, Select, Typography } from '@mui/material';
import { isEmpty, isUndefined } from "lodash";
import { useIntl, FormattedMessage } from "react-intl";
import { useProductAddFormController } from "./ProductAddForm.controller";
import { useCategoryApi } from "@infrastructure/apis/api-management/category";
import { useQuery } from "@tanstack/react-query";

export const ProductAddForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useProductAddFormController(props.onSubmit);
    const { getCategories: { key: queryKey, query } } = useCategoryApi();
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, 1, 100],
        queryFn: () => query({ page: 1, pageSize: 100 })
    });

    const categories = data?.response?.data;

    return <form onSubmit={actions.handleSubmit(actions.submit)}>
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.name)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.name" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("name")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.name",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.name)}
                            >
                                {state.errors.name?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.description)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.description" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("description")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.description",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.description)}
                            >
                                {state.errors.description?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.price)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.price" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("price")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({ id: "globals.price" }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.price)}
                            >
                                {state.errors.price?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.stock)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.stock" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("stock")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({ id: "globals.stock" }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.stock)}
                            >
                                {state.errors.stock?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.size)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.size" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("size")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({ id: "globals.size" }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.size)}
                            >
                                {state.errors.size?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.color)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.color" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("color")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({ id: "globals.color" }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.color)}
                            >
                                {state.errors.color?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.imageUrl)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.imageUrl" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("imageUrl")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({ id: "globals.imageUrl" }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.imageUrl)}
                            >
                                {state.errors.imageUrl?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl fullWidth error={!isUndefined(state.errors.categoryId)}>
                            <FormLabel required>
                                <FormattedMessage id="globals.category" />
                            </FormLabel>
                            {isError ? (
                                <Typography color="error">
                                    Error occurred while fetching categories.
                                </Typography>
                            ) : isLoading ? (
                                <CircularProgress />
                            ) : (
                                <Select
                                    {...actions.register("categoryId")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.selectInput" },
                                        {
                                            fieldName: formatMessage({ id: "globals.category" }),
                                        }
                                    )}
                                    autoComplete="none"
                                >
                                    {categories?.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                            <FormHelperText hidden={isUndefined(state.errors.categoryId)}>
                                {state.errors.categoryId?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}> {/* Add a button with type submit to call the submission callback if the button is a descended of the form element. */}
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    </form>
};
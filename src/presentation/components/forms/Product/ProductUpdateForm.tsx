import { ProductDTO } from "@infrastructure/apis/client";
import { FormattedMessage, useIntl } from "react-intl";
import { useProductUpdateFormController } from "./ProductUpdateForm.controller";
import { Stack, Grid, FormControl, OutlinedInput, FormHelperText, Button, CircularProgress, FormLabel } from "@mui/material";
import { isUndefined, isEmpty } from "lodash";

export const ProductUpdateForm = (props: { onSubmit?: () => void; entry : ProductDTO}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useProductUpdateFormController(props.entry, props.onSubmit);

    return <form onSubmit={actions.handleSubmit(actions.submit)}>
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.description)}
                        >
                            <FormLabel>
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
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.price)}
                        >
                            <FormLabel>
                                <FormattedMessage id="globals.price" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("price")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.price",
                                        }),
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
                            <FormLabel>
                                <FormattedMessage id="globals.stock" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("stock")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.stock",
                                        }),
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
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.imageUrl)}
                        >
                            <FormLabel>
                                <FormattedMessage id="globals.imageUrl" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("imageUrl")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.imageUrl",
                                        }),
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
                </Grid>
                <Grid container item direction="row" xs={12} className="padding-top-sm">
                    <Grid container item direction="column" xs={12} md={7}></Grid>
                    <Grid container item direction="column" xs={5}>
                        <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                            {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                            {computed.isSubmitting && <CircularProgress />}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Stack>
    </form>
};
import { FormattedMessage, useIntl } from "react-intl";
import { useCategoryUpdateFormController } from "./CategoryUpdateForm.controller";
import { Button, CircularProgress, FormControl, FormHelperText, FormLabel, Grid, OutlinedInput, Stack } from "@mui/material";
import { isEmpty, isUndefined } from "lodash";
import { CategoryDTO } from "@infrastructure/apis/client";

export const CategoryUpdateForm = (props: { onSubmit?: () => void; entry : CategoryDTO}) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useCategoryUpdateFormController(props.entry, props.onSubmit);

    return <form onSubmit={actions.handleSubmit(actions.submit)}>
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.name)}
                        >
                            <FormLabel>
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
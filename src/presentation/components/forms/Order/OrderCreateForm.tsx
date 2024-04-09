import { FormattedMessage, useIntl } from "react-intl";
import { useOrderCreateFormController } from "./OrderCreateForm.controller";
import { Stack, Grid, FormControl, FormLabel, OutlinedInput, FormHelperText, Button, CircularProgress } from "@mui/material";
import { isEmpty, isUndefined } from "lodash";

export const OrderCreateForm = (props: { onSubmit?: () => void }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useOrderCreateFormController(props.onSubmit);

    return <form onSubmit={actions.handleSubmit(actions.submit)}>
        <Stack spacing={4} style={{ width: "100%" }}>
            <div>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.phoneNumber)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.phoneNumber" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("phoneNumber")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.phoneNumber",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.phoneNumber)}
                            >
                                {state.errors.phoneNumber?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={6} md={6}>
                        <FormControl
                            fullWidth
                            error={!isUndefined(state.errors.shippingAddress)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.shippingAddress" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("shippingAddress")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.shippingAddress",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.shippingAddress)}
                            >
                                {state.errors.shippingAddress?.message}
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
    </form>;
};
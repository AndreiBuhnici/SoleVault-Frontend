import { FormattedMessage, useIntl } from "react-intl";
import { useFeedbackFormController } from "./FeedbackForm.controller";
import { Stack, Grid, FormControl, FormLabel, FormHelperText, OutlinedInput, Button, CircularProgress, FormGroup, Checkbox, FormControlLabel, Select, MenuItem, RadioGroup, Radio } from "@mui/material";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { isEmpty, isUndefined } from "lodash";

export const FeedbackForm = () => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useFeedbackFormController();

    return <form onSubmit={actions.handleSubmit(actions.submit)}>
        <Stack spacing={4} style={{ width: "100%" }}>
            <ContentCard title={formatMessage({ id: "globals.feedbackForm" })}>
                <Grid container item direction="row" xs={12} columnSpacing={4}>
                    <Grid container item direction="column" xs={12} md={12} style={{ marginBottom: "1rem" }}>
                        <FormControl 
                            fullWidth
                            error={!isUndefined(state.errors.feedback)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.feedback" />
                            </FormLabel>
                            <OutlinedInput
                                {...actions.register("feedback")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.textInput" },
                                    {
                                        fieldName: formatMessage({
                                            id: "globals.feedback",
                                        }),
                                    })}
                                autoComplete="none"
                            />
                            <FormHelperText
                                hidden={isUndefined(state.errors.feedback)}
                            >
                                {state.errors.feedback?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={12} md={12} style={{ marginBottom: "1rem" }}>
                        <FormControl 
                            fullWidth
                            error={!isUndefined(state.errors.overallRating)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.overallRating" />
                            </FormLabel>
                            <Select
                                {...actions.register("overallRating")}
                                placeholder={formatMessage(
                                    { id: "globals.placeholders.selectInput" },
                                    {
                                        fieldName: formatMessage({ id: "globals.overallRating" }),
                                    }
                                )}
                                autoComplete="none"
                            >
                                {
                                    [1, 2, 3, 4, 5].map((value) => (
                                        <MenuItem key={value} value={value}>{value}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText
                                hidden={isUndefined(state.errors.overallRating)}
                            >
                                {state.errors.overallRating?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={12} md={12} style={{ marginBottom: "1rem" }}>
                        <FormControl 
                            fullWidth
                            error={!isUndefined(state.errors.deliveryRating)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.deliveryRating" />
                            </FormLabel>
                            <RadioGroup row>
                                {
                                    [1, 2, 3, 4, 5].map((value) => (
                                        <FormControlLabel 
                                            key={value} 
                                            value={value.toString()} 
                                            control={<Radio {...actions.register('deliveryRating')} />} 
                                            label={value} 
                                        />
                                    ))
                                }
                            </RadioGroup>
                            <FormHelperText
                                hidden={isUndefined(state.errors.deliveryRating)}
                            >
                                {state.errors.deliveryRating?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid container item direction="column" xs={12} md={12} style={{ marginBottom: "1rem" }}>
                        <FormControl 
                            fullWidth
                            error={!isUndefined(state.errors.favoriteFeatures)}
                        >
                            <FormLabel required>
                                <FormattedMessage id="globals.favoriteFeatures" />
                            </FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox {...actions.register("favoriteFeatures")} value="feature1" />}
                                    label="Feature 1"
                                />
                                <FormControlLabel
                                    control={<Checkbox {...actions.register("favoriteFeatures")} value="feature2" />}
                                    label="Feature 2"
                                />
                                <FormControlLabel
                                    control={<Checkbox {...actions.register("favoriteFeatures")} value="feature3" />}
                                    label="Feature 3"
                                />
                            </FormGroup>
                            <FormHelperText
                                hidden={isUndefined(state.errors.favoriteFeatures)}
                            >
                                {state.errors.favoriteFeatures?.message}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </ContentCard>
            <Grid container item direction="row" xs={12} className="padding-top-sm">
                <Grid container item direction="column" xs={12} md={7}></Grid>
                <Grid container item direction="column" xs={5}>
                    <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                        {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                        {computed.isSubmitting && <CircularProgress />}
                    </Button>
                </Grid>
            </Grid>
        </Stack>
    </form>
};
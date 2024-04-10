import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { FeedbackForm } from "@presentation/components/forms/FeedbackForm/FeedbackForm";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { FeedbackFormTable } from "@presentation/components/ui/Tables/FeedbackFormTable";

export const FeedbackFormPage = memo(() => {
    const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
    const isClient = useOwnUserHasRole(UserRoleEnum.Client);
    if (isClient) {
        return <Fragment>
            <Seo title="Send Feedback" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                    <FeedbackForm />
                </Box>
            </WebsiteLayout>
        </Fragment>
    } else if (isAdmin) {
        return <Fragment>
            <Seo title="User Feedback" />
            <WebsiteLayout>
                <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
                    <ContentCard>
                        <FeedbackFormTable />
                    </ContentCard>
                </Box>
            </WebsiteLayout>
        </Fragment>
    }
});

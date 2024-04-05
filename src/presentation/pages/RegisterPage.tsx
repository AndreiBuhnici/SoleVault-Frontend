import { Box } from "@mui/material";
import { RegisterForm } from "@presentation/components/forms/Register/RegisterForm";
import { Seo } from "@presentation/components/ui/Seo";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";

export const RegisterPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Register" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <RegisterForm />
            </Box>
        </WebsiteLayout>
    </Fragment>
});
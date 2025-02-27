import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Typography } from "@mui/material";
import { Fragment, memo } from "react";
import { useIntl } from "react-intl";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";

export const HomePage = memo(() => {
  const { formatMessage } = useIntl();

  return <Fragment>
      <Seo title="Home" />
      <WebsiteLayout>
        <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
          <ContentCard title={formatMessage({ id: "globals.welcome" })}>
            <Typography>
               Welcome to SoleVault! Kick off your look with some new kicks! Explore our collection of sneakers and find the perfect pair for you.
            </Typography>
          </ContentCard>
        </Box>
      </WebsiteLayout>
    </Fragment>
});

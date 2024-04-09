import { Box } from "@mui/material";
import { memo, Fragment } from "react";
import { ContentCard } from '../components/ui/ContentCard/ContentCard';
import { WebsiteLayout } from '../layouts/WebsiteLayout/WebsiteLayout';
import { Seo } from '../components/ui/Seo/Seo';
import { OrderTable } from "@presentation/components/ui/Tables/OrderTable";

export const OrderPage = memo(() => {
    return <Fragment>
    <Seo title="Products" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
            <OrderTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
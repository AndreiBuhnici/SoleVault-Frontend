import { Box } from "@mui/material";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Seo } from "@presentation/components/ui/Seo";
import { CartTable } from "@presentation/components/ui/Tables/CartTable/CartTable";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";

export const CartPage = memo(() => {
    return <Fragment>
    <Seo title="Cart" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <CartTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});

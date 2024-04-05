import { Box } from "@mui/material";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Seo } from "@presentation/components/ui/Seo";
import { ProductTable } from "@presentation/components/ui/Tables/ProductTable";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";

export const ProductPage = memo(() => {
    return <Fragment>
    <Seo title="MobyLab Web App | Users" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
            <ProductTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
import { Box } from "@mui/material";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { Seo } from "@presentation/components/ui/Seo";
import { CategoryTable } from "@presentation/components/ui/Tables/CategoryTable";
import { WebsiteLayout } from "@presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";

export const CategoryPage = memo(() => {
    return <Fragment>
    <Seo title="MobyLab Web App | Users" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <CategoryTable />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});

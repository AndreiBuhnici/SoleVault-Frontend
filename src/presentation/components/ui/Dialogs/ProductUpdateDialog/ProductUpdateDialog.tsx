import { ProductDTO } from "@infrastructure/apis/client";
import { useIntl } from "react-intl";
import { useProductUpdateDialogController } from "./ProductUpdateDialog.controller";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { ProductUpdateForm } from "@presentation/components/forms/Product/ProductUpdateForm";

export const ProductUpdateDialog = (props: { entry: ProductDTO , tryReload: () => Promise<void>}) => {
    const { open, close, isOpen } = useProductUpdateDialogController();
    const { formatMessage } = useIntl();

    const onSubmit = async () => {
        await props.tryReload();
        close();
    };

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.updateProduct" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.updateProduct" })}
            </DialogTitle>
            <DialogContent>
                <ProductUpdateForm onSubmit={onSubmit} entry={props.entry} />
            </DialogContent>
        </Dialog>
    </div>
};
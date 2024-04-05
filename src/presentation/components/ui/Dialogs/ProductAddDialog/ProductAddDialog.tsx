import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useIntl } from "react-intl";
import { useProductAddDialogController } from "./ProductAddDialog.controller";
import { ProductAddForm } from "@presentation/components/forms/Product/ProductAddForm";

export const ProductAddDialog = (props: {tryReload: () => Promise<void>}) => {
    const {open, close, isOpen} = useProductAddDialogController();
    const { formatMessage } = useIntl();

    const onSubmit = async () => {
        await props.tryReload();
        close();
    };

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addProduct" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addProduct" })}
            </DialogTitle>
            <DialogContent>
                <ProductAddForm onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    </div>
};
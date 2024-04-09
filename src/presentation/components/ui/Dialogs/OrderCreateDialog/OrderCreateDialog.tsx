import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useIntl } from "react-intl";
import { OrderCreateForm } from "@presentation/components/forms/Order/OrderCreateForm";
import { useOrderCreateDialogController } from "./OrderCreateDialog.controller";

export const OrderCreateDialog = () => {
    const {open, close, isOpen} = useOrderCreateDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.createOrder" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.createOrder" })}
            </DialogTitle>
            <DialogContent>
                <OrderCreateForm onSubmit={close} />
            </DialogContent>
        </Dialog>
    </div>
};
import { useIntl } from "react-intl";
import { useCategoryAddDialogController } from "./CategoryAddDialog.controller";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CategoryAddForm } from "@presentation/components/forms/Category/CategoryAddForm";

export const CategoryAddDialog = () => {
    const {open, close, isOpen} = useCategoryAddDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.addCategory" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.addCategory" })}
            </DialogTitle>
            <DialogContent>
                <CategoryAddForm onSubmit={close} />
            </DialogContent>
        </Dialog>
    </div>
};
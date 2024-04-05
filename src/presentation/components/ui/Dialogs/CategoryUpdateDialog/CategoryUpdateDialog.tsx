import { useIntl } from "react-intl";
import { useCategoryUpdateDialogController } from "./CategoryUpdateDialog.controller";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CategoryUpdateForm } from "@presentation/components/forms/Category/CategoryUpdateForm";
import { CategoryDTO } from "@infrastructure/apis/client";

export const CategoryUpdateDialog = ({ entry } : {entry : CategoryDTO}) => {
    const { open, close, isOpen } = useCategoryUpdateDialogController();
    const { formatMessage } = useIntl();

    return <div>
        <Button variant="outlined" onClick={open}>
            {formatMessage({ id: "labels.updateCategory" })}
        </Button>
        <Dialog
            open={isOpen}
            onClose={close}>
            <DialogTitle>
                {formatMessage({ id: "labels.updateCategory" })}
            </DialogTitle>
            <DialogContent>
                <CategoryUpdateForm onSubmit={close} entry={entry}  />
            </DialogContent>
        </Dialog>
    </div>
};
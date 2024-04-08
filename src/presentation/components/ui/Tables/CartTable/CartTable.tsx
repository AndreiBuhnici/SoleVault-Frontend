import { CartItemDTO } from "@infrastructure/apis/client";
import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import { useCartTableController } from "./CartTable.controller";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { TextField, TablePagination, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const useHeader = (): { key: keyof CartItemDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "product", name: formatMessage({ id: "globals.product" }) },
        { key: "quantity", name: formatMessage({ id: "globals.quantity" }) },
        { key: "price", name: formatMessage({ id: "globals.price" }) }
    ]
}

const getRowValues = (entries: CartItemDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

export const CartTable = () => {
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove, handleSearch, infoData, infoError, infoLoading, clear, update } = useCartTableController();
    const rowValues = getRowValues(pagedData?.data, orderMap);

    return <DataLoadingContainer isError={isError && infoError} isLoading={isLoading && infoLoading} tryReload={tryReload}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label={formatMessage({ id: "labels.search" })}
                variant="outlined"
                size="small"
                onChange={(event) => handleSearch(event.target.value)}
            />
            <div>
                <div>Size: {infoData?.response?.size}</div>
                <div>Total Price: {infoData?.response?.totalPrice}</div>
            </div>
            <div>
                <IconButton color="error" onClick={() => clear()}>
                    <RemoveShoppingCartIcon color="error" fontSize='small' />
                </IconButton>
            </div>
        </div>
        {!isUndefined(pagedData) && !isUndefined(pagedData?.totalCount) && !isUndefined(pagedData?.page) && !isUndefined(pagedData?.pageSize) &&
            <TablePagination
                component="div"
                count={pagedData.totalCount}
                page={pagedData.totalCount !== 0 ? pagedData.page - 1 : 0}
                onPageChange={handleChangePage}
                rowsPerPage={pagedData.pageSize}
                onRowsPerPageChange={handleChangePageSize}
                labelRowsPerPage={formatMessage({ id: "labels.itemsPerPage" })}
                labelDisplayedRows={labelDisplay}
                showFirstButton
                showLastButton
            />}
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
                    <TableRow>
                        {
                           header.map(e => <TableCell key={`header_${String(e.key)}`}>{e.name}</TableCell>)
                        }
                        <TableCell>{formatMessage({ id: "labels.actions" })}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowValues?.map(({ data, entry }, rowIndex) => (
                        <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => {
                                let cellContent;
                                if (keyValue.key === "product") {
                                    cellContent = keyValue.value.name;
                                } else {
                                    cellContent = keyValue.value;
                                }

                                return (
                                    <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                        {cellContent}
                                    </TableCell>
                                );
                            })}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {<IconButton color="error" onClick={() => remove(entry.id ?? '')}>
                                    <DeleteIcon color="error" fontSize='small' />
                                </IconButton>}
                                {<IconButton color="primary" onClick={() => update({ id: entry.id ?? '', quantity: (entry.quantity ?? 0) + 1 })}>
                                    <AddIcon color="primary" fontSize='small' />
                                </IconButton>}
                                {<IconButton color="primary" onClick={() => update({ id: entry.id ?? '', quantity: (entry.quantity ?? 0) - 1 })}>
                                    <RemoveIcon color="primary" fontSize='small' />
                                </IconButton>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
};
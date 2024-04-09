import { OrderDTO } from "@infrastructure/apis/client";
import { useIntl } from "react-intl";
import { useOrderTableController } from "./OrderTable.controller";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { isUndefined } from "lodash";

const useHeader = (): { key: keyof OrderDTO, name: string }[] => {
    const { formatMessage } = useIntl();
    
    return [
        { key: "id", name: formatMessage({ id: "globals.id" })},
        { key: "orderItems", name: formatMessage({ id: "globals.orderItems" }) },
        { key: "orderDate", name: formatMessage({ id: "globals.orderDate" }) },
        { key: "deliveryDate", name: formatMessage({ id: "globals.deliveryDate" }) },
        { key: "phoneNumber", name: formatMessage({ id: "globals.phoneNumber" }) },
        { key: "shippingAddress", name: formatMessage({ id: "globals.shippingAddress" }) },
        { key: "status", name: formatMessage({ id: "globals.status" }) },
        { key: "total", name: formatMessage({ id: "globals.totalPrice" }) }
    ]
}

const getRowValues = (entries: OrderDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })            }
        });

export const OrderTable = () => {
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, handleSearch } = useOrderTableController();
    const rowValues = getRowValues(pagedData?.data, orderMap);

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                label={formatMessage({ id: "labels.search" })}
                variant="outlined"
                size="small"
                onChange={(event) => handleSearch(event.target.value)}
            />
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
                        {header.map(e => <TableCell key={e.key}>{e.name}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowValues?.map(({ data, entry }, rowIndex) => (
                        <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => {
                                let cellContent;
                                if (keyValue.key === "orderDate" || keyValue.key === "deliveryDate") {
                                    cellContent = new Date(keyValue.value).toLocaleString();
                                } else if (keyValue.key === "orderItems") {
                                    cellContent = keyValue.value.map((e: any, i: any) => <div key={`orderItem_${i + 1}`}>{e.product.name} x {e.quantity}</div>);
                                } else {
                                    cellContent = keyValue.value;
                                }
                                return (
                                    <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                        {cellContent}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
};
import { ProductDTO, UserRoleEnum } from "@infrastructure/apis/client";
import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useClientProductTableController, usePersonnelProductTableController } from "./ProductTable.controller";
import { ProductAddDialog } from "../../Dialogs/ProductAddDialog";
import { ProductUpdateDialog } from "../../Dialogs/ProductUpdateDialog";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { useCartTableController } from "../CartTable/CartTable.controller";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const useHeader = (): { key: keyof ProductDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "imageUrl", name: formatMessage({ id: "globals.image" }) },
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) },
        { key: "price", name: formatMessage({ id: "globals.price" }) },
        { key: "stock", name: formatMessage({ id: "globals.stock" }) },
        { key: "size", name: formatMessage({ id: "globals.size" }) },
        { key: "color", name: formatMessage({ id: "globals.color" }) },
        { key: "category", name: formatMessage({ id: "globals.category" }) },
        { key: "owner", name: formatMessage({ id: "globals.owner" }) }
    ]
}

const getRowValues = (entries: ProductDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => e !== 'id' && !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

export const ProductTable = () => {
    const { formatMessage } = useIntl();
    const header = useHeader();
    const isPersonnel = useOwnUserHasRole(UserRoleEnum.Personnel);
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    if (isPersonnel) {
        const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove, handleSearch } = usePersonnelProductTableController();
        const rowValues = getRowValues(pagedData?.data, orderMap);

        return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
                 <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ProductAddDialog tryReload={tryReload} />
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
                                        if (keyValue.key === "category" || keyValue.key === "owner") {
                                            cellContent = keyValue.value.name;
                                        } else if (keyValue.key === "imageUrl") {
                                            cellContent = <img src={keyValue.value} alt="" width="120" height="120" />;
                                        } else {
                                            cellContent = keyValue.value;
                                        }
        
                                        return (
                                            <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                                {cellContent}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <IconButton color="error" onClick={() => remove(entry.id ?? "")}>
                                              <DeleteIcon color="error" fontSize="small" />
                                        </IconButton>
                                        <ProductUpdateDialog entry={entry} tryReload={tryReload} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
             </DataLoadingContainer>
    } else {
        const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, handleSearch } = useClientProductTableController();
        const { add } = useCartTableController();
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
                                        if (keyValue.key === "category" || keyValue.key === "owner") {
                                            cellContent = keyValue.value.name;
                                        } else if (keyValue.key === "imageUrl") {
                                            cellContent = <img src={keyValue.value} alt="" width="120" height="120" />;
                                        } else {
                                            cellContent = keyValue.value;
                                        }
        
                                        return (
                                            <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>
                                                {cellContent}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => {
                                            add({ productId: entry.id ?? "", quantity: 1 }, tryReload);
                                        }}>
                                            <AddShoppingCartIcon color="primary" fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
             </DataLoadingContainer>
    }
};
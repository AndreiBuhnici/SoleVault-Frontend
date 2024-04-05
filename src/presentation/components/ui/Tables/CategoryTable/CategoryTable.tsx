import { CategoryDTO } from "@infrastructure/apis/client";
import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import { useCategoryTableController } from "./CategoryTable.controller";
import { DataLoadingContainer } from "../../LoadingDisplay";
import { CategoryAddDialog } from "../../Dialogs/CategoryAddDialog";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { CategoryUpdateDialog } from "../../Dialogs/CategoryUpdateDialog";

const useHeader = (): { key: keyof CategoryDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "name", name: formatMessage({ id: "globals.name" }) },
        { key: "description", name: formatMessage({ id: "globals.description" }) }
    ]
}

const getRowValues = (entries: CategoryDTO[] | null | undefined, orderMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(orderMap[e])).sort(([a], [b]) => orderMap[a] - orderMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

export const CategoryTable = () => {
    const { formatMessage } = useIntl();
    const header = useHeader();
    const orderMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, remove, handleSearch } = useCategoryTableController();
    const rowValues = getRowValues(pagedData?.data, orderMap);

    return <DataLoadingContainer isError={isError} isLoading={isLoading} tryReload={tryReload}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <CategoryAddDialog />
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
                    {
                        rowValues?.map(({ data, entry }, rowIndex) => <TableRow key={`row_${rowIndex + 1}`}>
                            {data.map((keyValue, index) => <TableCell key={`cell_${rowIndex + 1}_${index + 1}`}>{keyValue.value}</TableCell>)} {/* Add the row values. */}
                            <TableCell> {/* Add other cells like action buttons. */}
                                {<IconButton color="error" onClick={() => remove(entry.id ?? '')}>
                                    <DeleteIcon color="error" fontSize='small' />
                                </IconButton>}
                                <CategoryUpdateDialog entry={entry} />
                            </TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </DataLoadingContainer>
};

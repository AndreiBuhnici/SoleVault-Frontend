import { FeedbackFormDTO } from "@infrastructure/apis/client";
import { isUndefined } from "lodash";
import { useIntl } from "react-intl";
import { useFeedbackFormController } from "./FeedbackFormTable.controller";
import { TextField, TablePagination, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { DataLoadingContainer } from "../../LoadingDisplay";

const useHeader = (): { key: keyof FeedbackFormDTO, name: string }[] => {
    const { formatMessage } = useIntl();

    return [
        { key: "id", name: formatMessage({ id: "globals.id" }) },
        { key: "feedback", name: formatMessage({ id: "globals.feedback" }) },
        { key: "overallRating", name: formatMessage({ id: "globals.overallRating" }) },
        { key: "deliveryRating", name: formatMessage({ id: "globals.deliveryRating" }) },
        { key: "favoriteFeatures", name: formatMessage({ id: "globals.favoriteFeatures" }) },
        { key: "createdAt", name: formatMessage({ id: "globals.createdAt" }) }
    ]
}

const getRowValues = (entries: FeedbackFormDTO[] | null | undefined, feedbackFormMap: { [key: string]: number }) =>
    entries?.map(
        entry => {
            return {
                entry: entry,
                data: Object.entries(entry).filter(([e]) => !isUndefined(feedbackFormMap[e])).sort(([a], [b]) => feedbackFormMap[a] - feedbackFormMap[b]).map(([key, value]) => { return { key, value } })
            }
        });

export const FeedbackFormTable = () => {
    const { formatMessage } = useIntl();
    const header = useHeader();
    const feedbackFormMap = header.reduce((acc, e, i) => { return { ...acc, [e.key]: i } }, {}) as { [key: string]: number };
    const { handleChangePage, handleChangePageSize, pagedData, isError, isLoading, tryReload, labelDisplay, handleSearch } = useFeedbackFormController();
    const rowValues = getRowValues(pagedData?.data, feedbackFormMap);

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
                                if (keyValue.key === "createdAt") {
                                    cellContent = new Date(keyValue.value).toLocaleString();
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
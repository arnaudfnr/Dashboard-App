import Client from '../../models/client';
import { ClientTableHeader } from './ClientTableHeader';
import { Paper, Table, TableContainer, TablePagination } from '@mui/material';
import { ClientTableBody } from './ClientTableBody';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ClientTableState, getClientPage, selectClientTable, setClientPage, setError, setPage } from './clientTableSlice';
import { useEffect } from 'react';

export interface ClientTableProps {
    clients: Client[];
    count: number;
}

export const ROWS_PER_PAGE = 20;

export function ClientTable({ clients, count }: ClientTableProps) {
    const dispatch = useAppDispatch();
    const { page, clientPage } = useAppSelector(selectClientTable) as ClientTableState;

    useEffect(() => {
        dispatch(setClientPage(clients));
    }, [dispatch, clients]);

    const handleChangePage = (_: unknown, newPage: number) => {
        dispatch(setPage(newPage));
        dispatch(getClientPage(newPage));
    };

    return (
        <Paper sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <ClientTableHeader />
                    <ClientTableBody clients={clientPage} />
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={count}
                rowsPerPage={ROWS_PER_PAGE}
                rowsPerPageOptions={[]}
                page={page}
                onPageChange={handleChangePage}
            />
        </Paper>
    );
}
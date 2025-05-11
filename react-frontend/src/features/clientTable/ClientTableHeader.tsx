import { TableHead, TableRow, TableCell } from '@mui/material';

export interface Column {
    id: 'id' | 'full_name' | 'heating' | 'health' | 'details';
    label: string;
}

export const COLUMNS: readonly Column[] = [
    {
        id: 'id',
        label: 'Id'
    },
    {
        id: 'full_name',
        label: 'Nom'
    },
    {
        id: 'heating',
        label: 'Chauffage',
    },
    {
        id: 'health',
        label: 'Santé',
    },
    {
        id: 'details',
        label: 'Détails',
    },
];

export function ClientTableHeader() {
    return (
        <TableHead>
            <TableRow>
                {COLUMNS.map((COLUMNS) => (
                    <TableCell
                        key={COLUMNS.id}
                    >
                        {COLUMNS.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
};

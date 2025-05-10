import React from 'react';
import styles from './ClientTable.module.css';
import { ClientEntry } from './ClientEntry';
import Client from '../../models/client';

export interface ClientTableState {
    query: string;
    clients: Client[];
    loading: boolean;
    error: string | null;
}

export interface ClientTableProps {
    clients: Client[];
}


export function ClientTable({ clients }: ClientTableProps) {
    return (
        <table className={styles['clients-list']}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th className={styles['text-center']}>Heating</th>
                    <th className={styles['text-center']}>Health</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <ClientEntry client={client} />
                ))}
            </tbody>
        </table>
    );
}
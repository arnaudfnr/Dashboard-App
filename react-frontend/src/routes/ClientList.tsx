import { Await, useLoaderData } from "react-router-dom";
import { ClientTable } from "../features/clientTable/ClientTable";
import { Suspense } from "react";
import styles from './Routes.module.css';

export function ClientList() {
    const { count, clients } = useLoaderData();
    console.log("ClientList", clients);
    return (
        <div className={styles['feature-container']}>
            <h1>Liste des clients</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={clients}>
                    <ClientTable count={count} clients={clients} />
                </Await>
            </Suspense>
        </div>
    );

}
export default ClientList;
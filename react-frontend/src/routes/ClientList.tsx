import { Await, useLoaderData } from "react-router-dom";
import { ClientTable } from "../features/clientTable/ClientTable";
import { Suspense } from "react";

export function ClientList() {
    const { clients } = useLoaderData();
    console.log("ClientList", clients);
    return (
        <div>
            <h1>Liste des clients</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={clients}>
                    <ClientTable clients={clients} />
                </Await>
            </Suspense>
        </div>
    );

}
export default ClientList;
import { Await, useLoaderData, useLocation } from "react-router-dom";
import ConsumptionDashboard from "../features/consumptionDashboard/ConsumptionDashboard";
import { Suspense } from "react";

export function ConsumptionDetails() {
    const { client } = useLocation().state;
    const { conso } = useLoaderData();
    console.log("Client state", client);
    console.log("ConsumptionDetails", conso);
    return (
        <div>
            <h1>Bienvenue {client.full_name}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={conso}>
                    <ConsumptionDashboard client={client} conso={conso} />
                </Await>
            </Suspense>
        </div>
    );

}

export default ConsumptionDetails;
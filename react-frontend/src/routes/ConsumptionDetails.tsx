import { Await, useLoaderData, useParams } from "react-router-dom";
import ConsumptionDashboard from "../features/consumptionDashboard/ConsumptionDashboard";
import { Suspense } from "react";

export function ConsumptionDetails() {
    const { clientId } = useParams();
    const { conso } = useLoaderData();
    console.log("ConsumptionDetails", conso);
    return (
        <div>
            <h1>Consumption Details</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={conso}>
                    <ConsumptionDashboard clientName="mock" conso={conso} />
                </Await>
            </Suspense>
        </div>
    );

}

export default ConsumptionDetails;
import { Await, useLoaderData, useLocation } from "react-router-dom";
import ConsumptionDashboard from "../features/consumptionDashboard/ConsumptionDashboard";
import { Suspense } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export function ConsumptionDetails() {
    const { client } = useLocation().state;
    const { conso } = useLoaderData();
    return (<>
        <Typography variant="h4" component="h1" gutterBottom>
            Bienvenue {client.full_name}
        </Typography>

        <Suspense
            fallback={
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px',
                    }}
                >
                    <CircularProgress />
                </Box>
            }
        >
            <Await resolve={conso}>
                <ConsumptionDashboard client={client} conso={conso} />
            </Await>
        </Suspense>
    </>
    );

}

export default ConsumptionDetails;
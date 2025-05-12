import { Await, useLoaderData } from "react-router-dom";
import { ClientTable } from "../features/clientTable/ClientTable";
import { Suspense } from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export function ClientList() {
    const { count, clients } = useLoaderData();
    console.log("ClientList", clients);
    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Liste des clients
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    padding: 2,
                }}
            >
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
                    <Await resolve={clients}>
                        <ClientTable count={count} clients={clients} />
                    </Await>
                </Suspense>
            </Paper>
        </>
    );

}
export default ClientList;
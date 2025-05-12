import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Client from "../../models/client";
import FlashOffIcon from '@mui/icons-material/FlashOff';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';

import { red, yellow } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { createTheme, Link, Tooltip } from '@mui/material';

interface ClientTableBodyProps {
    clients: Client[];
}

const theme = createTheme({
    palette: {
        warning: yellow,
        error: {
            main: red[800]
        },
    },
});

export function ClientTableBody({ clients }: ClientTableBodyProps) {
    const navigate = useNavigate();
    return (
        <TableBody>
            {clients.map((client) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={client.id}>
                        <TableCell>
                            {client.id}
                        </TableCell>
                        <TableCell>
                            {client.full_name}
                        </TableCell>
                        <TableCell>
                            <Tooltip title={client.has_elec_heating ? "Le chauffage est électrique" : "Le chauffage n'est pas électrique"}>
                                {client.has_elec_heating ? (
                                    <FlashOnIcon color="warning" />
                                ) : (
                                    <FlashOffIcon color="disabled" />
                                )}
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title={client.has_anomaly ? `Anomalie détectée en ${client.anomaly_month}/${client.anomaly_year}` : "Pas d'anomalie détectée"}>
                                {!client.has_anomaly ? (
                                    <WarningRoundedIcon color="disabled" />
                                ) : (
                                    <WarningRoundedIcon color="error" />
                                )}
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title="View consumption details">
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate(`/consumption/${client.id}`, { state: { client } });
                                    }}
                                >
                                    Voir le détail de la consommation
                                </Link>
                            </Tooltip>
                            <Tooltip title="Open external link">
                                <ArrowOutwardOutlinedIcon color="success" />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}
import { Box, Button, Alert } from '@mui/material';
import { useRouteError, useNavigate } from 'react-router-dom';

function PageError() {
    const error = useRouteError() as {
        status: any; message?: string
    };
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
                textAlign: 'center',
                padding: 2,
            }}
        >
            <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error?.message || 'An unexpected error occurred. Please try again later.'}
                {error?.status && (
                    <Box component="span" sx={{ display: 'block', marginTop: 1 }}>
                        <strong>Error Code:</strong> {error.status}
                    </Box>
                )}
            </Alert>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ marginTop: 2 }}
            >
                Go Back to Home
            </Button>
        </Box>
    );
}

export default PageError;
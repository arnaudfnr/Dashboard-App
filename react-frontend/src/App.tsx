import { RouterProvider, NavLink, useRouteError, useNavigation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ClientList from './routes/ClientList';
import ConsumptionDetails from './routes/ConsumptionDetails';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { fetchClients, fetchConsumptions } from './app/axiosClient';
import HeaderBar from './components/HeaderBar';
import { Container } from '@mui/material';
import PageError from './components/PageError';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <PageError />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'consumption/:clientId',
        element: <ConsumptionDetails />,
        loader: async ({ params }) => {
          if (!params.clientId) {
            throw new Error("Client ID is required");
          }
          const response = await fetchConsumptions(params.clientId);
          console.log("ConsumptionDetails", response);
          return { conso: response.data.results };
        }
      },
      {
        path: 'admin/clients',
        element: <ClientList />,
        loader: async () => {
          const data = (await fetchClients(1)).data;
          console.log("ClientList", data.results);
          return { count: data.count, clients: data.results };
        }
      }
    ]
  }
]);

function Root() {
  return <>
    <header>
      <HeaderBar />
    </header>
    <Container sx={{
      maxWidth: '100%',
      paddingTop: {
        xs: '64px',
        sm: '80px',
      },
    }}>
      <Outlet />
    </Container>
  </>;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;

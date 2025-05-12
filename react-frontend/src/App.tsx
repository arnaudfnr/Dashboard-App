import { RouterProvider, NavLink, useRouteError, useNavigation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import ClientList from './routes/ClientList';
import ConsumptionDetails from './routes/ConsumptionDetails';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { fetchClients, fetchConsumptions } from './app/axiosClient';
import HeaderBar from './components/HeaderBar';

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

function PageError() {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error?.toString()}</p>
    </div>
  );
}

function Root() {
  const { state } = useNavigation();
  return <>
    <header>
      <HeaderBar />
    </header>

    <section>
      {state === 'loading' && <p>Loading...</p>}
      <Outlet />
    </section>
  </>;
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;

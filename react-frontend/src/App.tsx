import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './routes/Home';
import ClientList from './routes/ClientList';
import ConsumptionDetails from './routes/ConsumpptionDetails';
import { NavBar } from './components/NavBar';
import Page from './models/page'

const homePage: Page = {
  title: 'Home',
  path: '/',
  component: Home,
};

const clientListPage: Page = {
  title: 'Client List',
  path: '/admin/clients',
  component: ClientList,
};

const consumptionPage: Page = {
  title: 'Search',
  path: '/consumption:id',
  component: ConsumptionDetails,
};

const App = () => {
  return (
    <Router>
      <NavBar pages={[homePage, clientListPage, consumptionPage]} />
      <Routes>
        <Route path={homePage.path} element={<homePage.component />} />
        <Route path={clientListPage.path} element={<clientListPage.component />} />
        <Route path={consumptionPage.path} element={<consumptionPage.component />} />
      </Routes>
    </ Router>
  );
};

export default App;

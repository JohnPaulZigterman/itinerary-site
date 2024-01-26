import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import MyTrips from './pages/MyTrips.jsx';
import PlanTrip from './pages/PlanTrip.jsx';
import Public from './pages/Public.jsx';
import SingleTrip from './pages/SingleTrip.jsx';
import SingleUser from './pages/SingleUser.jsx';

import './styles/index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <MyTrips />
      }, {
        path: '/plan',
        element: <PlanTrip />
      }, {
        path: '/browse',
        element: <Public />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/trip/:tripId', 
        element: <SingleTrip />
      },
      {
        path: '/user/:username', 
        element: <SingleUser />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

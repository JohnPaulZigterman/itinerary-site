import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import MyTrips from './pages/MyTrips.jsx';
import PlanTrip from './pages/PlanTrip.jsx';
import Public from './pages/Public.jsx';

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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);

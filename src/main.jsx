import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage.jsx';
import Dashboard from './Pages/Dashboard.jsx';

const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

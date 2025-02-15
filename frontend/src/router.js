import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import DashBoard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])

export default router

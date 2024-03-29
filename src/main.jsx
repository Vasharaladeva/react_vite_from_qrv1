import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction } from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from './pages/Index'

import ErrorPage from './components/ErrorPage'

import Formulario from './pages/Formulario' 
import User from './pages/User'
import EstudiantePerfil from './pages/EstudiantePerfil'
import Inactivo from './pages/Inactivo'
import ReporteInactivos from './pages/ReporteInactivos'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <User />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/formulario',
        element: <Formulario />,
        errorElement: <ErrorPage />
      },
      {
        path: '/estudiante/:id',
        element:<EstudiantePerfil/>,
        errorElement: <ErrorPage />
      },
      {
        path: '/inactivo',
        element:<Inactivo/>,
        errorElement: <ErrorPage />
      }
    ]
  },
  {
    path: '/reporteinactivos',
    element:<ReporteInactivos/>,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)

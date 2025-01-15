import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {routes} from './routes.tsx'
import { App } from './App.tsx'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,

  <React.StrictMode>
      <App>
        <RouterProvider router={router} />
      </App>
  </React.StrictMode>

)

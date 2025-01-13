import ReactDOMServer from 'react-dom/server'
import {App} from './App.tsx'
import { createStaticRouter, createStaticHandler, StaticRouterProvider, StaticHandlerContext } from 'react-router-dom/server'
import { createFetchRequest } from './request.ts'
import {Request as expRequest} from 'express'
import {routes} from './routes.tsx'

const handler = createStaticHandler(routes)

export async function render(req: expRequest ) {
    const fetchRequest = createFetchRequest(req)
    const context = await handler.query(fetchRequest) as StaticHandlerContext
    const router = createStaticRouter(handler.dataRoutes, context)

    return ReactDOMServer.renderToString(
        <App>
            <StaticRouterProvider router={router} context={context} />
        </App>
    )
}



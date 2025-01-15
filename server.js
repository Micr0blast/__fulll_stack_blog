import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { generateSitemap } from './generateSitemap.js'
import dotenv from 'dotenv'
dotenv.config()

// returns the file:// url to the project dir
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createDevServer() {
  const app = express()

  const vite = await (
    await import('vite')
  ).createServer({
    server: { middlewareMode: true }, // set up vite as middleware for hot reloading
    appType: 'custom', // supply own HTML serving logic
  })

  app.use(vite.middlewares)

  // for all paths
  app.use('*', async (req, res, next) => {
    if (req.originalUrl === '/sitemap.xml') {
      const sitemap = await generateSitemap()
      return res
        .status(200)
        .set({ 'Content-Type': 'application/xml' })
        .end(sitemap)
    }
    try {
      // read index.html synchronously from absolute path using utf-8 encoding
      const templateHTML = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      )

      // inject vite for hot reloading
      const template = await vite.transformIndexHtml(
        req.originalUrl,
        templateHTML,
      )

      // transform server entrypoint to node runnable code and get the render function
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

      // render the react app on the server side
      const appHTML = await render(req)

      // place the rendered appHTML into the template
      const html = await template.replace(`<!--ssr-outlet-->`, appHTML)

      // send the html to the client witht the appropriate type and HTTP status
      return res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (err) {
      vite.ssrFixStacktrace(err)
      next(err)
    }
  })

  return app
}

async function createProductionServer() {
  const app = express()
  app.use((await import('compression')).default())
  app.use(
    (await import('serve-static')).default(
      path.resolve(__dirname, 'dist/client'),
      {
        index: false,
      },
    ),
  )
  app.use('*', async (req, res, next) => {
    if (req.originalUrl === '/sitemap.xml') {
      const sitemap = await generateSitemap()
      return res
        .status(200)
        .set({ 'Content-Type': 'application/xml' })
        .end(sitemap)
    }
    try {
      // read index.html synchronously from absolute path using utf-8 encoding
      const templateHTML = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8',
      )

      const render = (await import('./dist/server/entry-server.js')).render
      // render the react app on the server side
      const appHTML = await render(req)

      // place the rendered appHTML into the template
      const html = await templateHTML.replace(`<!--ssr-outlet-->`, appHTML)

      // send the html to the client witht the appropriate type and HTTP status
      return res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (err) {
      next(err)
    }
  })

  return app
}

if (process.env.NODE_ENV === 'production') {
  const app = await createProductionServer()
  app.listen(process.env.SERVER_PORT, () => {
    console.log(
      `ssr production server running on http://localhost:${process.env.SERVER_PORT}`,
    )
  })
} else {
  const app = await createDevServer()
  app.listen(process.env.SERVER_PORT, () => {
    console.log(
      `ssr dev server running on http://localhost:${process.env.SERVER_PORT}`,
    )
  })
}

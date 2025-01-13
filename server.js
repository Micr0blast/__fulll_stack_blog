import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
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

const app = await createDevServer()
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `ssr dev server running on http://localhost:${process.env.SERVER_PORT}`,
  )
})

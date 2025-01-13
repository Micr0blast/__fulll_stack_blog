import {Request as expRequest} from 'express'

export function createFetchRequest(req: expRequest) {
    const origin = `${req.protocol}://${req.get('host')}`
    const url = new URL(req.originalUrl || req.url, origin)
    const controller = new AbortController()
    req.on('close', () => controller.abort())

    const headers = new Headers()

    for (const [key, values] of Object.entries(req.headers)) {
        if (!values) continue
        if (Array.isArray(values)) {
            for (const value of values) {
                headers.append(key, value)
            }
        } else {
            headers.append(key,values)
        }

    }

    const init = {
        method: req.method,
        headers,
        signal: controller.signal,
        body: undefined
    }
    if (req.method !== 'GET' && req.method !== 'HEADER') {
        init.body = req.body
    }
    
    return new Request(url.href, init)
}
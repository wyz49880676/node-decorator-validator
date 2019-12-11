import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import { getParameterName } from '../utils/utils'


type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

type RouteOptions = {
    prefix?: string;
    middlewares?: Array<Koa.Middleware>
}

export const router = new KoaRouter()

const router_api_parser = (method: HTTPMethod) => (path?: string, options?: RouteOptions) => (target, name, descriptor) => {
    let descriptorArgs = getParameterName(descriptor.value)
    path = path || `/${name}${descriptorArgs.map(item => `/:${item}`).toString().replaceAll(',', '')}`

    const middlewares = []
    if (options && options.middlewares) {
        middlewares.push(...options.middlewares)
    }

    router[method](path, ...middlewares, (ctx: Koa.Context) => {
        let data = ctx.request ? ctx.request.body : ctx.params || {}
        ctx.body = descriptor.value.apply(null, descriptorArgs.map(item => data[item] || null))
    })
}
export const get = router_api_parser('get')
export const post = router_api_parser('post')


// const validateRule = paramPart => rule => {
//     return function (target, name, descriptor) {
//         const oldValue = descriptor.value
//         descriptor.value = function () {
//             const ctx = arguments[0]
//             const p = new Parameter()
//             const data = ctx[paramPart]
//             const errors = p.validate(rule, data)
//             console.log('error', errors)
//             if (errors) throw new Error(JSON.stringify(errors))
//             return oldValue.apply(null, arguments);
//         }
//         return descriptor;
//     }
// }

// export const querystring = validateRule('query')
// export const body = validateRule('body')
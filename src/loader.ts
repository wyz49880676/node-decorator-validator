import * as Koa from 'koa'
import * as glob from 'glob';
import { resolve } from 'path'
import { router } from './routes/router_parser'

type LoadOptions = {
    extname?: string
}

export const load_services = (app: Koa, path: string, options: LoadOptions = {}) => {
    const extname = options.extname || '.{js,ts}'
    glob.sync(resolve(path, `./**/*${extname}`)).forEach((item) => require(item))
    app.use(router.routes())
}
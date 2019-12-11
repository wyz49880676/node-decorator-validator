import * as Koa from 'koa'
import * as bodify from 'koa-body'   //body-parser
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'
import { resolve } from 'path'
import { load_services } from './loader'

export default class MyServer {
    private app: Koa

    constructor() {
        this.app = new Koa();
        this.init()
    }

    private init() {
        this.app.use(timing());                      // 加载打日志的功能
        this.app.use(serve(`${__dirname}/public`));  // 加载静态路由
        this.app.use(bodify({                        // 加载bodify的配置
            multipart: true,
            strict: false,      // 使用非严格模式，解析 delete 请求的请求体
        }));
        this.app.use(async (ctx, next) => {
            try {
                await next()
            } catch (err) {
                // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
                this.app.emit('error', err, this)
                const status = err.status || 500
                // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
                const error = err.message
                // 从 error 对象上读出各个属性，设置到响应中
                ctx.body = {
                    code: status, // 服务端自身的处理逻辑错误(包含框架错误500 及 自定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
                    error: error
                }
                if (status === 422) {
                    ctx.body.detail = err.errors
                }
                ctx.status = 200
            }
        })
        this.use_routes()
    }
    private use_routes() {
        load_services(this.app, resolve(`${__dirname}/services`))
    }

    public Start(port: number) {
        this.app.listen(port, () => {
            console.log('MyKoa server instance has been started.')
        })
    }
}
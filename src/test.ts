// // 类装饰器
// function anotationClass(id){
//     console.log('anotationClass evaluated', id);
//     return (target) => console.log('anotationClass executed', id);
// }
// // 方法装饰器
// function anotationMethods(id){
//     console.log('anotationMethods evaluated', id);
//     return (target, property, descriptor) => console.log('anotationMethods executed', id);
// }

// @anotationClass(1)
// @anotationClass(2)
// class Example {
//     @anotationMethods(1)
//     @anotationMethods(2)
//     method(){console.log('yyyyyyyyyyyyyyyyyyy')}
// }

// //==============================================
// // Decorator demo
// //==============================================

// // 日志应用和切面实现
// console.log('日志应用和切面实现.....')
// function log(target, name, method) {
//     console.log(target)
//     console.log(name)
//     console.log(method)
    
//     var oldValue = method.value;

//     method.value = function () {
//         console.log(`Calling "${name}" with`, arguments);
//         return oldValue.apply(null, arguments);
//     }
//     return method;
// }
// class Maths {
//     @log
//     add(a, b) {
//         return a + b;
//     }
// }
// const math = new Maths()
// math.add(2, 4)

//==============================================
// Simple Router
//==============================================
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

const app = new Koa()
export const router = new KoaRouter()


router.get('/string1', async (ctx, next) => {
    ctx.body = 'koa2 string1'
})
router.post('/json1', async (ctx, next) => {
    console.log(ctx.status, ctx.reuqest)
    ctx.body = {
        title: 'koa2 json1'
    }
})

router['get']('/string2', (ctx) => { ctx.body = 'string22222'})

app.use(router.routes())

app.listen(3000, () => {
    console.log('MyKoa server instance has been started.')
})

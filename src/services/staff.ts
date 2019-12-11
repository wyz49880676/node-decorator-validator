import * as Koa from 'koa'
import { get, post } from '../routes/router_parser'
import { descriptor_list, descriptor_set } from '../rules/staff_rule'
import { test_data } from '../utils/test_data'
import { validator_sync, validator_async } from '../validators/validator'


export default class UserService {
    // @get()
    // public get_by_name(name) {
    //     return { ok: 200, name }
    // }

    // @get()
    // public get_by_id(id) {
    //     return { ok: 200, id }
    // }

    @get('/get_user/:sex/:age_from/:age_to',
        {
            middlewares: [
                async (ctx: Koa.Context, next: () => Promise<any>) => {
                    let data = ctx.reuqest ? ctx.reuqest.body : ctx.params || {};
                    try {
                        await validator_async(descriptor_list, data)
                        await next();
                    }
                    catch (err) {
                        ctx.body = 'Got error: ' + err.toString()
                    }
                }
            ]
        }
    )
    public list(sex, age_from, age_to) {
        return {
            ok: 200,
            data: test_data.filter(
                (item) =>
                    item.age >= age_from
                    && item.age <= age_to
                    && item.sex === sex)
        }
    }

    @post('/set_user', {
        middlewares: [
            async (ctx: Koa.Context, next: () => Promise<any>) => {
                let data = ctx.request ? ctx.request.body : ctx.params || {};
                try {
                    await validator_async(descriptor_set, data)
                    await next();
                }
                catch (err) {
                    console.log(err)
                    ctx.body = 'Got error: '+ err.errors[0].message
                }
            }
        ]
    })
    public set(name, sex, age) {
        return `save staff info: { id: ${test_data.length + 1} name: ${name}, sex: ${sex}, age: ${age} }`
    }
}


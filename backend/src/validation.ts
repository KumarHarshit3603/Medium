import {z} from 'zod'

 const signupschema = z.object(
    {
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
        name: z.string()
    }
)

const signinschema = z.object({
    username: z.string(),
    password: z.string()
})
export {signupschema,signinschema}

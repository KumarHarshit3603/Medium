import {Hono} from 'hono'
import {PrismaClient} from './generated/prisma/client.js'
import {PrismaPg} from '@prisma/adapter-pg'
// import {serve} from '@hono/node-server'
import 'dotenv/config';
import bcrypt from "bcryptjs"
import {sign,decode, verify} from 'hono/jwt'
import {signupschema,signinschema} from './validation'
import {cors} from 'hono/cors'

const app = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables:{
        prisma: PrismaClient
    }
}>();

app.use('/app/v1/*',cors({
    origin:"http://localhost:5173",
}))
app.use('*',async(c,next)=>{
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
    const prisma = new PrismaClient({adapter})
    c.set("prisma",prisma);
    await next()
})

app.post('/app/v1/signup', async(c)=>{
    const prisma = c.get("prisma");
    
    const userdata = await c.req.json();
    
    const valid = signupschema.safeParse(userdata);

    if(!valid.success){
        return c.json({
            message:"invalid credentials"
        })
    } 
   try{
     const user = await prisma.user.create({
        data:{
            name:userdata.name,
            username : userdata.username,
            email:userdata.email,
            password:await bcrypt.hash(userdata.password, 10)
        }
    })

    const token = await sign(userdata,process.env.JWT_SECRET||"")
    return c.json({
        message:"successfully signed up",
        token: token
    });
   }
   catch(e){
    c.status(403);
    return c.text('error');
   }
})


app.post('/app/v1/signin',async(c)=>{
    const prisma = c.get("prisma")
    const userdata = await c.req.json();

    const valid = signinschema.safeParse(userdata)

    if(!valid.success){
        return c.json(
            {
                message: "invalid credentials"
            }
        )
    }
    try{
          const result = await prisma.user.findUnique({
        where:{
            username: userdata.username
        }
        })
        console.log(result);
        if(result){
            const founduser = {
                name:result.name,
                username: result.username,
                email:result.email,
                password:result.password
            }
            const isMatch = await bcrypt.compare(userdata.password,founduser.password);
            if(!isMatch){
                return c.text("wrong password");
            }

            const token = await sign(userdata,process.env.JWT_SECRET||"")

            return c.json({
                message:"successfully signed in",
                token: token
            })
        }
        else{
            return c.text('unable to sign in ');
        }
    
    }
    catch(e){
        c.status(403)
        return c.text('some error happened')
    }
})

app.post('/app/v1/blog',async(c)=>{
        const prisma = c.get("prisma");
        const userdata = await c.req.json();
       try{
         const result = await prisma.blogs.create({
            data:{
                username:userdata.username,
                title:userdata.title,
                content: userdata.content

            }
        })

        return c.json({
            message:"blog successfully posted",            
        })
       }
       catch(e){
        c.status(403);
        return c.text("error")
       }
})

app.put('/app/v1/blog',async(c)=>{
    const prisma = c.get("prisma");
    const userdata = await c.req.json();

   try{
     const result = await prisma.blogs.update({
        where:{
            id:userdata.id
        },
        data:{
            title:userdata.title,
            content: userdata.content
        }
    })

    if(result)return c.json({message:"updated successfully"});
    else return c.json({message:"error"});

   }
   catch(e){
    c.status(403);
    return c.json({message:"error"})
   }
})
app.get('/app/v1/blogs',async(c)=>{
    const prisma = c.get("prisma");
    try{
            const userdata = await prisma.blogs.findMany({});
            return c.json(userdata);
            
    } 
    catch(e){
        return c.text("couldnt connect to database");

    }   

    
})
// serve({
//     fetch:app.fetch,
//     port: 3000
// })
export default app
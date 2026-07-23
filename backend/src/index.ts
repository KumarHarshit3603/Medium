import {Hono} from 'hono'
import {PrismaClient} from './generated/prisma/client.js'
import {PrismaPg} from '@prisma/adapter-pg'
import {serve} from '@hono/node-server'
import 'dotenv/config';
import bcrypt from "bcryptjs"
import {sign,decode, verify} from 'hono/jwt'
import {signupschema,signinschema} from './validation'
import {cors} from 'hono/cors'
import {handle} from 'hono/vercel' 

const app = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables:{
        prisma: PrismaClient
    }
}>();
async function authenticate(c:any,next:any){
    const auth_header = c.req.header("Authorization");
    if (!auth_header) {
    return c.json({ message: "Authorization header missing" }, 401);
    }

    const arr = auth_header.split(" ");
    if(arr.length<2)return c.json({
                "value" : true
            });
    const token = auth_header.split(" ")[1];

    try{
        
            const check = await verify(token,process.env.JWT_SECRET!,"HS256");

            if(check){
                await next();
            }
            else{
                return c.json({
                "value" : true
            });
            }

    }
    catch(e){
        return c.json({
                "value" : true
            });
    }
    
}
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)
app.use('*',async(c,next)=>{
    const adapter = new PrismaPg({
        connectionString: process.env.DATABASE_URL
    })
    const prisma = new PrismaClient({adapter})
    c.set("prisma",prisma);
    await next()
})
app.get('/auth',async(c)=>{
    const auth_string = c.req.header("Authorization");
    if(!auth_string){
        return c.json({"value": false})
    }
    try{
        const arr = auth_string.split(" ");
        if(arr.length<2){
             return c.json({"value": false})
        }
        const token = arr[1];

        const valid = await verify(token!,process.env.JWT_SECRET!,"HS256")

        if(valid) return c.json({"value":true})
        else return c.json({"value": false})

    }
    catch(e){
        return c.json({"value": false})
    }
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

    const token = await sign(userdata,process.env.JWT_SECRET||"","HS256")
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
    console.log(userdata);
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
            console.log(founduser.password,userdata.password);
            const isMatch = await bcrypt.compare(userdata.password,founduser.password);
            if(!isMatch){
                return c.text("wrong password");
            }

            const token = await sign(userdata,process.env.JWT_SECRET||"","HS256")

            return c.json({
                message:"successfully signed in",
                token: token
            })
        }
        else{
            return c.json({
                message:"no user with this username"
            });
        }
    
    }
    catch(e){
        c.status(403)
        return c.json({
                message:"some error"
            });
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
app.get('/app/v1/blogs',authenticate,async(c)=>{
    const prisma = c.get("prisma");
    try{
            const userdata = await prisma.blogs.findMany({});
            return c.json(userdata);
            
    } 
    catch(e){
        return c.text("couldnt connect to database");

    }   

    
})
serve({
    fetch:app.fetch,
    port: 3000
})
export default app
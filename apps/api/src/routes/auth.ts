import { Request, Response, Router } from "express";
import { loginSchema, registerSchema } from "@repo/types";
import bcrypt from "bcrypt";
import client  from "@repo/db"
import jwt, { JwtPayload }  from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import verifyJwt from "../middleware/verifyJwt";

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<any> => {
    const parsedData = registerSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(411).json({'message' : 'Invalid Credentials'});
        return;
    }
    // Find existing user
    const existingUser = await client.user.findFirst({
        where : {
            username : parsedData.data.username
        }
    })

    if (existingUser) {
        res.status(403).json({'message' : 'User already exists'});
        return;
    }
    const hashedPwd = await bcrypt.hash(parsedData.data.password, 10);
    // Save to DB
    const user = await client.user.create({
        data : {
            username : parsedData.data.username,
            password : hashedPwd
        }
    })
    if (!user) {
        res.status(501).json({'message' : 'Server Error'});
        return;
    }
    res.json({
        id : user.id
    });
})

router.post('/login', async (req : Request, res : Response) : Promise<any> => {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(411).json({'message' : 'Invalid Credentials'});
        return;
    }

    const validUser = await client.user.findFirst({
        where : {
            username : parsedData.data.username
        }
    })
    if (!validUser) return res.sendStatus(401);
    const validPassword = await bcrypt.compare(parsedData.data.password, validUser.password);
    if (!validPassword) return res.sendStatus(401);

    const accessToken = jwt.sign({
        id : validUser.id
    }, ACCESS_TOKEN_SECRET);
    
    const refreshToken = jwt.sign({
        id : validUser.id
    }, REFRESH_TOKEN_SECRET)

    await client.user.update({
        where : {
            id : validUser.id
        },
        data : {
            refreshToken
        }
    })

    res.cookie('jwt', refreshToken, { 
        httpOnly: true, 
        sameSite: 'lax',        // or 'None' + secure for cross-site
        secure: false,          // set to true in production (with HTTPS)
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({
        accessToken
    })

})

router.get('/refresh', async (req : Request, res) => {
    const cookie = req.cookies;
    if( !cookie || !cookie.jwt ) {
        res.sendStatus( 401 );
        console.log("No Cookie");
        return
    } 
    const refreshToken = cookie.jwt;    

    const validUser = await client.user.findFirst({
        where : {
            refreshToken
        }
    })

    if (!validUser) {
        res.sendStatus(404);
        return
    } 

    jwt.verify(
        validUser.refreshToken,
        REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            const decodedPayload = decoded as JwtPayload
            //@ts-ignore
            const id = decodedPayload.id;

            const accessToken = jwt.sign({
                id
                },ACCESS_TOKEN_SECRET
            )

            res.json({accessToken});
            return
        }
    )
})

router.get('/logout',verifyJwt, async(req, res) => {
    // @ts-ignore
    const id = req.id;
    const cookie = req.cookies;
    if( !cookie || !cookie.jwt ) {
        res.sendStatus( 204 );
        return
    } 
    const refreshToken = cookie.jwt; 
    
    await client.user.update({
        where : {
            id,
            refreshToken : refreshToken
        },
        data : {
            refreshToken : ""
        }
    })

    res.sendStatus(204)
})
export const authRouter = router;
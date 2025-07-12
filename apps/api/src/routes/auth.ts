import { Request, Response, Router } from "express";
import { loginSchema, registerSchema } from "../types";
import bcrypt from "bcrypt";
import client  from "@repo/db"
import jwt  from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

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

    return res.json({
        accessToken
    })

})

export const authRouter = router;
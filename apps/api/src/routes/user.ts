import { Router } from "express";
import client from "@repo/db"

const router = Router();

router.get('/', async (req, res) => {
    // @ts-ignore
    const id = req.id
    const user = await client.user.findFirst({
        where :{
            id : id
        }
    })
    if (!user) {
        res.status(403).json({'message' : 'User not Found'});
    }
    res.json({
        user
    })
    
})

export const userRouter = router;
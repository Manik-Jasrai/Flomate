import { Router } from "express";
import client from "@repo/db"
import { actionCreateSchema } from "../types";

const router = Router();

router.post('/', async (req, res) => {
    const parsedData = actionCreateSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    // check for existance
    const duplicate = await client.availableAction.findFirst({
        where : {
            name : parsedData.data.name
        }
    })
    if (duplicate) {
        res.status(403).json({
            message: "Action already exists"
        })
        return;
    }
    const action = await client.availableAction.create({
        data : {
            name : parsedData.data.name,
            id : parsedData.data?.id
        }
    })

    res.json({
        action
    })
})

router.get('/', async (req, res) => {
    const actions =  await client.availableAction.findMany({});
    res.json({actions})
})

export const actionRouter = router;
import { Router } from "express";
import client from "@repo/db"
import { triggerCreateSchema } from "../types";

const router = Router();

router.post('/', async (req, res) => {
    const parsedData = triggerCreateSchema.safeParse(req.body);
    console.log(parsedData)
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    // check for existance
    const duplicate = await client.availableTrigger.findFirst({
        where : {
            name : parsedData.data.name
        }
    })
    if (duplicate) {
        res.status(403).json({
            message: "Trigger already exists"
        })
        return;
    }
    const trigger = await client.availableTrigger.create({
        data : {
            name : parsedData.data.name,
            id : parsedData.data?.id
        }
    })

    res.json({
        trigger
    })
})

router.get('/', async (req, res) => {
    const triggers =  await client.availableTrigger.findMany({});
    res.json({triggers})
})

export const triggerRouter = router;
import { Router } from "express";
import client from "@repo/db"
import { flowCreateSchema } from "../types";

const router = Router();

router.post('/', async (req, res) => {
    // @ts-ignore
    const userId = req.id;
    const parsedData = flowCreateSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(411).json({
            message: "Incorrect inputs"
        });
        return;
    }

    const flowId = await client.$transaction(async (tx : any) => {
        const flow = await tx.flow.create({
            data : {
                userId : parseInt(userId),
                triggerId : "",
                action : {
                    create : parsedData.data.actions.map((action, idx) => ({
                        actionId : action.availableAction, 
                        sortingOrder : idx,
                        metaData : action.metadata
                    }))
                }
            }
        })
        console.log(flow);
        const trigger = await tx.trigger.create({
            data : {
                triggerId : parsedData.data.availableTriggerId,
                flowId : flow.id
            }
        })

        const newFlow = await tx.flow.update({
            where : {
                id : flow.id
            }, 
            data : {
                triggerId : trigger.id
            }
        })
        console.log(flow);
        return flow.id

    })

    res.json({flowId})
})

router.get('/', async (req, res) => {
    // @ts-ignore
    const id  = req.id;
    const flows = await client.flow.findMany({
        where : {
            userId : id
        },
        include : {
            trigger : {
                include : {
                    type : true
                }
            },
            action : {
                include : {
                    type : true
                }
            }
        }
    })

    res.json({
        flows
    })
})
router.get('/:flowId', async (req, res) => {
    // @ts-ignore
    const id  = req.id;
    const flowId = req.params.flowId;
    const flows = await client.flow.findMany({
        where : {
            userId : id,
            id : flowId
        },
        include : {
            trigger : {
                include : {
                    type : true
                }
            },
            action : {
                include : {
                    type : true
                }
            }
        }
    })

    res.json({
        flows
    })
})

export const flowRouter = router;
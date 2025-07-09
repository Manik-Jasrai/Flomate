import express from "express"
import { PrismaClient } from "@repo/db/src/generated/prisma"
const app = express();

const client = new PrismaClient();

app.post('/hooks/catch/:userId/:zapId', async (req, res) => {
    const userId = req.params.userId
    const zapId = req.params.zapId

    await client.$transaction(async tx => {
        const zapRun = await tx.zapRun.create({
            data : {
                zapId
            }
        })
        await tx.zapRunOutBox.create({
            data : {
                zapRunId : zapRun.id
            }
        })
    })

    res.json({message : "Done"})
})

app.listen(3000, () => {
    console.log('Server has started')
})
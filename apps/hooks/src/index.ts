import express from "express"
import prisma  from "@repo/db"
const app = express();


app.post('/hooks/catch/:userId/:flowId', async (req, res) => {
    const userId = req.params.userId
    const flowId = req.params.flowId

    await prisma.$transaction(async tx => {
        const flowRun = await tx.flowRun.create({
            data : {
                flowId
            }
        })
        await tx.flowRunOutBox.create({
            data : {
                flowRunId : flowRun.id
            }
        })
    })

    res.json({message : "Done"})
})

app.listen(3000, () => {
    console.log('Server has started')
})
import express from "express"
import prisma  from "@repo/db"
const app = express();

const PORT = process.env.PORT || 3000
app.use(express.json());

app.post('/hooks/catch/:userId/:flowId', async (req, res) => {
    const userId = req.params.userId
    const flowId = req.params.flowId
    const body = req.body;

    await prisma.$transaction(async tx => {
        const flowRun = await tx.flowRun.create({
            data : {
                flowId,
                metadata : body
            }
        })
        
        await tx.flowRunOutBox.create({
            data : {
                flowRunId : flowRun.id
            }
        })
    })

    res.json({message : "Webhook Received"})
})

app.listen(PORT, () => {
    console.log(`Hooks Server has started on port ${PORT}`)
})
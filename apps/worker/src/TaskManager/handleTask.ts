import client from "@repo/db"
import { JsonValue } from "@repo/db/generated/prisma/runtime/library";
import { Queue } from "bullmq";
import { parse } from "./parser";
import { sendEmail } from "../Actions/email";
import { writeText } from "../Actions/notion";

export type TaskType = {flowRunId : string, stage : number}

export type ActionType = {
    id: string,
    flowId: string,
    actionId: string,
    sortingOrder: number,
    metaData: string,
    type: {
        id: string,
        name: string,
        dataRequired: string[]
    }
}

const queue = new Queue('Flows', {
    connection : {
        host : "127.0.0.1",
        port : 6379
    }
})

export const handleTask = async (task : TaskType) => {
    console.log(task);

    const flowRun = await client.flowRun.findFirst(
        { where : { id : task.flowRunId}
    });
    if (!flowRun) return;
    
    const flow = await client.flow.findFirst({
        where : {id : flowRun.flowId},
        include : {action : {
            include : {
                type : true
            }
        }}
    })
    if (!flow) return;
    
    // Find the lastStage;
    const lastStage = (flow.action.length || 1) - 1;
    const currStage = task.stage;

    const currAction = flow.action.find(act => act.sortingOrder === currStage);
    
    // Execute action
    await executeAction(currAction as ActionType, flowRun.metadata)

    if (currStage <= lastStage) {
        // Push to queue with stage+1
        await queue.add('FlowTasks', { flowRunId : flowRun.id, stage : currStage+1 })

    }

}

const executeAction = async (currAction : ActionType, flowRunMetadata : any) => {
    console.log(`Executing Action with id ${currAction.type.id} `)
    
    const metadata = JSON.parse(currAction.metaData)
    
    if (currAction.type.id === 'send_email') {
        const to = parse(metadata.To, flowRunMetadata)
        const body = parse(metadata.Body, flowRunMetadata)

        await sendEmail(to, body)
    }

    if (currAction.type.id === 'save_to_notion') {
        const secret = parse(metadata.API_SECRET, flowRunMetadata)
        const pageName = parse(metadata.PageName, flowRunMetadata)
        const content = parse(metadata.Content, flowRunMetadata)

        await writeText(secret, pageName, content)
    }

}

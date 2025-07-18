import {config} from "dotenv"
config();
import { Worker } from "bullmq";
import { handleTask, TaskType } from "./TaskManager/handleTask";

const main = async () => {
    new Worker("Flows", async job => {
        await handleTask(job.data as object as TaskType)
    }, {
        connection : {
            host : "127.0.0.1",
            port : 6379
        }
    })
}

console.log("Worker Started")
main();
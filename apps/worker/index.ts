import { Worker } from "bullmq";

const main = async () => {
    const worker = new Worker("Flows", async job => {
        console.log(job.data)
    }, {
        connection : {
            host : "127.0.0.1",
            port : 6379
        }
    })
}

console.log("Worker Started")
main();

import prisma  from "@repo/db"
import { Queue } from "bullmq";

const queue = new Queue('Flows', {
    connection : {
        host : "127.0.0.1",
        port : 6379
    }
})


const main = async () => {
    while(1) {
        // Get from database
        const requests = await prisma.flowRunOutBox.findMany({ take : 10});
        if (requests.length) console.log(requests);
        // push to queue
        requests.forEach(async req => {
            await queue.add('FlowTasks', req);
        });
        // delete from database
        const response = await prisma.flowRunOutBox.deleteMany({
            where : {
                id : {
                    in : requests.map(r => r.id)
                }
            }
        })
        if (response.count) console.log(response);
    }
}

console.log('Sweeper Started')
main()
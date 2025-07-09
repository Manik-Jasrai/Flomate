import RedisQueue from "@repo/queue"
import { PrismaClient } from "@repo/db/src/generated/prisma"

const queue = RedisQueue.getInstance();
const client = new PrismaClient();

const main = async () => {
    while(1) {
        // Get from database
        const requests = await client.zapRunOutBox.findMany({ take : 10});
        if (requests.length) console.log(requests);
        // push to queue
        requests.forEach(async req => {
            await queue.push("zapTasks", req)
        });
        // delete from database
        const response = await client.zapRunOutBox.deleteMany({
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
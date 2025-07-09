import { createClient, RedisClientType } from "redis"

export default class RedisQueue {
    private static instance : RedisQueue
    private redisClient : RedisClientType;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
    }

    public static getInstance() {
        if (!RedisQueue.instance) {
            RedisQueue.instance =  new RedisQueue();
        }
        return RedisQueue.instance;
    }

    public async push(name : string, data : Object) {
        await this.redisClient.lPush(name, JSON.stringify(data));
    }

    public async pop(name : string) {
        const data = await this.redisClient.rPop(name)
        if (!data) return null;
        return JSON.parse(data);
    }

    public async disconnect() {
        await this.redisClient.quit();
    }

}
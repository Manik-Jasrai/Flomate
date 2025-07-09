"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class RedisQueue {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
    }
    getInstance() {
        if (!RedisQueue.instance) {
            RedisQueue.instance = new RedisQueue();
        }
        return RedisQueue.instance;
    }
    push(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.lPush(name, JSON.stringify(data));
        });
    }
    pop(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.redisClient.rPop(name);
            if (!data)
                return null;
            return JSON.parse(data);
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.redisClient.quit();
        });
    }
}
exports.default = RedisQueue;

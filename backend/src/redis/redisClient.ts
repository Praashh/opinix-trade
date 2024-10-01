import { createClient } from "redis";


export const redisClient = createClient({
    url : "rediss://default:AVNS_fojB1SJngfHsuGIixFI@caching-13c381d2-aryanpachori03-1866.e.aivencloud.com:12329",
 
})

redisClient.on('error',(err)=>{
    console.error('Error connecting to redis',err)
})

async function connect() {
    await redisClient.connect();
    console.log("Connected to redis")
}
connect()

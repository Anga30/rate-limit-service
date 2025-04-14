import mongoose from "mongoose";
import redis from 'redis';
const connection_string = process.env.DB_CONNECTION_STRING

class ManageConnection {
    constructor () {
        this.client = redis.createClient({
            socket: { host: 'localhost', port: 6379 }
        });
    }

    async connect_mongodb () 
    {
        try {
            await mongoose.connect(connection_string);
            console.log("MongoDB Connected...");
        } catch (error) {
            console.error("MongoDB Connection Failed:", error);
        }
    }

    async connect_redis ()
    {
        try {
            this.client.on('connect', () => console.log('Connected to Redis'));
            this.client.on('error', (err) => console.error('Redis error:', err));

            await this.client.connect();
        } catch (error) {
            console.error("Redis Connection Failed:", error);
        }
    }

    async close_mongodb() {
        await mongoose.connection.close();
        console.log("MongoDB Connection Closed");
    }

    // Expose Redis Client for Reuse
    // this means that I wont have to establish a connection each time I need to use redis
    getRedisClient() {
        return this.client;
    }

    // Expose MongoDB Connection for Reuse
    // this means that I wont have to establish a connection each time I need to use mongo
    getMongooseConnection() {
        return mongoose.connection;
    }
}
export default ManageConnection;
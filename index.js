import app from './server.js';
import ManageConnection from './ManageConnection.js';

const port = process.env.PORT || 8000;

// Initialize the database connections
const dbManager = new ManageConnection();
await dbManager.connect_mongodb();
await dbManager.connect_redis();

// Attach redis client to the app object so it's accessible globally
app.locals.redis = dbManager.getRedisClient();

// Connect the app to the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
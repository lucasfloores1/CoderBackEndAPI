import http from 'http';
import app from './app.js';
import { init as initSocket } from './socket.js';
import { init as MongoDBInit } from './db/mongodb.js';
import { logger } from './config/logger.js';

await MongoDBInit();

const server = http.createServer(app);
const PORT = process.env.PORT;

//socket server
initSocket(server);

//HTTP server
server.listen(PORT, (req, res) => {
    logger.info(`Server Running into hhtp://localhost:${PORT}`);
});

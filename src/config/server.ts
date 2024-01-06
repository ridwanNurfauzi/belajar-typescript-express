import dotenv from 'dotenv';

dotenv.config();

const server = {
    host: process.env.APP_HOST || '127.0.0.1',
    port: Number(process.env.APP_PORT) || 3000
};

export default server;

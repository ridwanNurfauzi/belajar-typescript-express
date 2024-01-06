import express from "express";
import bodyParser from "body-parser";
import server from "./config/server";
import router from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

app.listen(server.port, server.host, () => {
    console.info(`server : http://${server.host}:${server.port}/`);
});

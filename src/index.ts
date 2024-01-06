import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import server from "./config/server";
import router from "./routes";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride((req: Request, res: Response) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;

        delete req.body._method;
        return method;
    }
}));

app.use(router);

app.listen(server.port, server.host, () => {
    console.info(`server : http://${server.host}:${server.port}/`);
});

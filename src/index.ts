import express, { Request, Response } from "express";
import formData from "express-form-data";
import methodOverride from "method-override";
import cors from "cors";
import path from "path";
import server from "./config/server";
import router from "./routes";

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(cors());

app.use(formData.parse({ uploadDir: path.join(__dirname, '/tmp'), autoClean: true }));
app.use(formData.format());
app.use(formData.stream());
// app.use(formData.union());

app.use(methodOverride((req: Request, res: Response) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;

        delete req.body._method;
        return method;
    }
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(server.port, server.host, () => {
    console.info(`server : http://${server.host}:${server.port}/`);
});

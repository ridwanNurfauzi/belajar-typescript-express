import fs from "fs";
import path from "path";
import { Request, Response, Router } from "express";
import barang from "./barang";
import auth from "./auth";
import { verifyToken } from "../middleware/verify";

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        // await fs.promises.unlink(`${__dirname}/../public/n.png`);
        console.log((await fs.promises.lstat(`${__dirname}/../public/logo.jpg`)).isFile());
        res.send({ success: true });
    } catch (error) {
        res.send({ success: false, error });
    }
});

router.use(auth);

router.use('/barang', barang);

router.post('/test', async (req: Request, res: Response) => {
    try {
        res.locals.files = req.files;

        console.log(req.headers["content-type"]);
        // const filename = (new Date().getTime()).toString(16);
        // const extension = path.extname(res.locals.files.file.path);

        // console.log(fs.existsSync(`${__dirname}/../public/img`));

        // await fs.promises.copyFile(res.locals.files.file.path, `${__dirname}/../public/${filename}${extension}`);
        res.send({
            success: true,
            data: req.body,
            files: req.files
        });

        // console.log(path.extname(res.locals.files.file.path));
        // console.log(__dirname + "");
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
});

router.use((req: Request, res: Response) => {
    res.status(404).send({
        success: false,
        status: res.statusCode
    });
});

export default router;

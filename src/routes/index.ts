import { Request, Response, Router } from "express";
import barang from "./barang";
import auth from "./auth";
import { verifyToken } from "../middleware/verify";

const router = Router();

router.get('/', verifyToken, (req: Request, res: Response) => {
    res.send({ success: true });
});

router.use(auth);

router.use('/barang', barang)

router.use((req: Request, res: Response) => {
    res.status(404).send({
        success: false,
        status: res.statusCode
    });
});

export default router;

import { Request, Response, Router } from "express";
import barang from "./barang";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send({ success: true });
});

router.use('/barang', barang)

router.use((req: Request, res: Response) => {
    res.status(404).send({
        success: false,
        status: res.statusCode
    });
});

export default router;

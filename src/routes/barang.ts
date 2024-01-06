import { Router } from "express";
import * as barang from "../controllers/barangController";

const router = Router();

router.get('/', barang.getAll);
router.get('/:id', barang.getBarangById);
router.post('/', barang.addBarang);
router.put('/:id', barang.editBarang);
router.delete('/:id', barang.deleteBarang);

export default router;

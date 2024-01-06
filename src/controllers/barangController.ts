import { Request, Response } from "express";
import Barang from "../db/models/barang";
import { checkSchema, validationResult } from "express-validator";

const getAll = async (req: Request, res: Response) => {
    try {
        const data = await Barang.findAll();

        return res.send({
            success: !!data,
            status: res.statusCode,
            data
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
}

const getBarangById = async (req: Request, res: Response) => {
    try {
        const data = await Barang.findAll({
            where: {
                id: req.params.id
            }
        });

        return res.send({
            success: !!data,
            status: res.statusCode,
            data
        });
    } catch (error) {
        console.log(error);

        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
}

const addBarang = async (req: Request, res: Response) => {
    await checkSchema({
        nama: {
            notEmpty: { errorMessage: 'Nama tidak boleh kosong.' }
        },
        harga: {
            notEmpty: { errorMessage: 'Harga tidak boleh kosong.' },
            isNumeric: { errorMessage: 'Harga harus berupa angka.' }
        }
    }).run(req);

    const vResult = validationResult(req);

    if (!vResult.isEmpty()) {
        return res.send({
            success: false,
            vResult
        });
    }

    const values = {
        nama: req.body.nama,
        harga: req.body.harga
    };

    try {
        const data = await Barang.create(values);

        return res.send({
            success: true,
            values,
            vResult,
            data
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
}

const editBarang = async (req: Request, res: Response) => {
    await checkSchema({
        nama: {
            notEmpty: { errorMessage: 'Nama tidak boleh kosong.' }
        },
        harga: {
            notEmpty: { errorMessage: 'Harga tidak boleh kosong.' },
            isNumeric: { errorMessage: 'Harga harus berupa angka.' }
        }
    }).run(req);

    const vResult = validationResult(req);

    if (!vResult.isEmpty()) {
        return res.send({
            success: false,
            vResult
        });
    }

    const values = {
        nama: req.body.nama,
        harga: req.body.harga
    };

    try {
        const data = await Barang.update(values, {
            where: {
                id: req.params.id
            }
        });

        return res.send({
            success: true,
            values,
            vResult,
            data
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
}

const deleteBarang = async (req: Request, res: Response) => {
    try {
        const data = await Barang.destroy({
            where: {
                id: req.params.id
            }
        });

        return res.send({
            success: true,
            data
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
}

export {
    getAll,
    getBarangById,
    addBarang,
    editBarang,
    deleteBarang
};

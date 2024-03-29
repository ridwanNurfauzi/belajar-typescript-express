import { Request, Response } from "express";
import User from "../db/models/user";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const signUp = async (req: Request, res: Response) => {
    res.locals.files = req.files
    await checkSchema({
        email: {
            notEmpty: { errorMessage: 'Email tidak boleh kosong.' },
            isEmail: { errorMessage: 'Email harus berupa email.' }
        },
        firstname: {
            notEmpty: { errorMessage: 'Nama depan tidak boleh kosong.' }
        },
        password: {
            notEmpty: { errorMessage: 'Password tidak boleh kosong.' },
            isLength: { options: { min: 6, max: 255 }, errorMessage: "Password harus terdiri dari 6 - 255 karakter." }
        },
        // photo: {
        //     custom: {
        //         options: function (value, filename) {
        //             console.log(!!res.locals.files.photo);

        //             // var extension = (path.extname(filename)).toLowerCase();
        //             // switch (extension) {
        //             //     case '.jpg':
        //             //         return '.jpg';
        //             //     case '.jpeg':
        //             //         return '.jpeg';
        //             //     case '.png':
        //             //         return '.png';
        //             //     default:
        //             //         return false;
        //             return 1;
        //             // }
        //         }
        //     }
        // }
    }).run(req);

    const vResult = validationResult(req);

    if (!vResult.isEmpty()) {
        return res.send({
            success: false,
            vResult
        });
    }

    let values: any = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: await bcrypt.hash(req.body.password, 7)
    };



    try {
        // Add profile photo
        if (!!res.locals.files.photo) {
            if (!fs.existsSync(`${__dirname}/../public/img/profile_photos`)) {
                await fs.promises.mkdir(`${__dirname}/../public/img/profile_photos`);
            }
            let filename = (new Date().getTime()).toString(16);
            let extension = path.extname(res.locals.files.photo.path);

            values['photo'] = filename + extension;

            await fs.promises.copyFile(res.locals.files.photo.path, `${__dirname}/../public/img/profile_photos/${values['photo']}`);
        }
        const data = await User.create(values);

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
};

const signIn = async (req: Request, res: Response) => {
    await checkSchema({
        email: {
            notEmpty: { errorMessage: 'Email tidak boleh kosong.' },
            isEmail: { errorMessage: 'Email harus berupa email.' }
        },
        password: {
            notEmpty: { errorMessage: 'Password tidak boleh kosong.' },
            isLength: { options: { min: 6, max: 255 }, errorMessage: "Password harus terdiri dari 6 - 255 karakter." }
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
        email: req.body.email,
        password: req.body.password
    };

    try {
        const data = await User.findOne({
            where: {
                email: values.email
            }
        });
        const success = await bcrypt.compare(values.password, (data?.password) as string);
        const msg = success ? '' : 'Password tidak sesuai.';

        jwt.sign({
            id: data?.id,
            email: data?.email
        }, process.env.JWT_KEY as string, {
            expiresIn: '365d'
        }, (err, token) => {
            return res.send({
                success,
                values,
                vResult,
                data,
                token,
                msg
            });
        });
        return res.send({
            data
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
};

const getProfile = async (req: Request, res: Response) => {
    try {
        if (req.headers.authorization) {
            const data = await User.findOne({
                where: {
                    id: res.locals.user.id
                }
            });

            return res.status(200).send({
                success: true,
                status: res.statusCode,
                data
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            status: res.statusCode,
            error
        });
    }
};

export {
    signUp,
    signIn,
    getProfile
};

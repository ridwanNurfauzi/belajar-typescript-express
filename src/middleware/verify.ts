import jwt, { VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);

        jwt.verify(token, process.env.JWT_KEY as string, (error: VerifyErrors | null, decode) => {
            console.log(decode);
            if (error) {
                return res.status(500).send({
                    success: false,
                    auth: false,
                    status: res.statusCode,
                    error
                });
            } else {
                res.locals.user = decode;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            auth: false,
            status: res.statusCode
        });
    }
};

export {
    verifyToken
};

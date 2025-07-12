import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET } from '../config';

const verifyJwt = (req : Request, res : Response, next : NextFunction) : void => {
    const authHeader  = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !(authHeader as string).startsWith('Bearer')){
        res.sendStatus(401);
        return;
    } 
    const token = (authHeader as string).split(' ')[1];
    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET as string,
        (err,decoded) => {
            if (err) return res.sendStatus(401);
            const decodedPayload = decoded as JwtPayload;
            //@ts-ignore
            req.id = decodedPayload.id;              

            next();
        }

    );
};

export default verifyJwt
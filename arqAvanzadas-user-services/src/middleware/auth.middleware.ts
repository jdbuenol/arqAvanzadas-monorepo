import {Request, Response} from "express";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.AUTH_SECRET;

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
      const querySecret = req.query.authSecret;
      if (secret !== querySecret) {
        res.status(403).send({
          isError: true,
          message: 'Not authorized',
          body: null,
        });
        return;
      }
      next();
    } catch (e) {
      return res.status(401).send({
          message: 'unauthenticated'
      });
    }
}

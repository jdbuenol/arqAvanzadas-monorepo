import { Request, Response } from "express";
import axios from "axios";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Bearer ") === -1
    ) {
      return res.status(401).send({
        error: true,
        message: "You are not authorized to request this operation",
      });
    }

    const { data: authData } = await axios.get(
      `${process.env.AUTH_SERVICE_URL}/api/validate-token`,
      {
        headers: {
          Authorization: req.headers.authorization,
        },
      }
    );

    const is_ambassador = req.path.indexOf("api/ambassador") >= 0;

    if (
      (is_ambassador && authData.body.is_admin) ||
      (!is_ambassador && !authData.body.is_admin)
    ) {
      return res.status(401).send({
        message: "unauthorized",
      });
    }

    const { data: userData } = await axios.get(
      `${process.env.USER_SERVICE_URL}/find-by-id/${authData.body.uid}?authSecret=${process.env.AUTH_SECRET}`
    );

    req["user"] = userData.body;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};

import { Request, Response } from "express";
import response from "./utils/response";
import z from "zod";
import bcryptjs from "bcryptjs";
import Services from "./services";
import producer from "./kafka";
import axios from "axios";
import { IUser } from "./models/user";

const validateToken = async (req: Request, res: Response) => {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization.indexOf("Bearer ") === -1
    ) {
      return response({
        res,
        status: 401,
        error: true,
        message: "You are not authorized to request this operation",
      });
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    const { success, uid, is_admin } = await Services().verifyToken(token);
    if (!success) {
      return response({
        res,
        status: 401,
        error: true,
        message: "You are not authorized to request this operation",
      });
    }

    return response({
      res,
      status: 200,
      error: false,
      message: "",
      body: { uid, is_admin },
    });
  } catch (error) {
    return response({
      res,
      status: 500,
      error: true,
      message: error.message ?? "Error at authentication",
    });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const result = z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        password: z.string(),
        password_confirm: z.string(),
      })
      .safeParse(req.body);

    if (result.success === false) {
      return response({
        res,
        status: 400,
        error: true,
        message: JSON.parse(result.error.message),
      });
    }

    if (result.data.password !== result.data.password_confirm) {
      return response({
        res,
        status: 400,
        error: true,
        message: "Passwords do not match",
      });
    }

    const { success, message, token, uid } = await Services().createUser(
      result.data.email.trim().toLowerCase(),
      result.data.password
    );
    if (success === false) {
      return response({
        res,
        status: 400,
        error: true,
        message: message,
      });
    }

    const isAdminRegister = req.path === "/api/admin/register";
    if (isAdminRegister) await Services().setAdminClaim(uid);

    const value = JSON.stringify({
      id: uid,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      email: result.data.email.trim().toLowerCase(),
      password: await bcryptjs.hash(result.data.password, 10),
      is_ambassador: isAdminRegister,
    });

    await producer.connect();
    await producer.send({
      topic: "newUser",
      messages: [{ value }],
    });

    return response({
      res,
      status: 200,
      error: false,
      message: "",
      body: { token },
    });
  } catch (error: any) {
    return response({
      res,
      status: 500,
      error: true,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const result = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .safeParse(req.body);

    if (result.success === false) {
      return response({
        res,
        status: 400,
        error: true,
        message: JSON.parse(result.error.message),
      });
    }

    const { data } = await axios.get(
      `${process.env.USER_SERVICE_URL}/find-by-email/${result.data.email
        .trim()
        .toLowerCase()}?authSecret=${process.env.AUTH_SECRET}`
    );
    if (data.isError) {
      return response({
        res,
        status: 404,
        error: true,
        message: "User not found",
      });
    }

    const userData = data.body as IUser;
    if (!(await bcryptjs.compare(result.data.password, userData.password))) {
      return response({
        res,
        status: 401,
        error: true,
        message: "Invalid credentials",
      });
    }

    const token = await Services().createToken(userData.id);

    return response({
      res,
      status: 200,
      error: false,
      message: "",
      body: { token },
    });
  } catch (error: any) {
    return response({
      res,
      status: 500,
      error: true,
      message: error.message,
    });
  }
};

const controller = {
  validateToken,
  register,
  login,
};

export default controller;

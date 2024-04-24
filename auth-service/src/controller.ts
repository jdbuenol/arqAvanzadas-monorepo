import { Request, Response } from "express";
import response from "./utils/response";
import z from "zod";
import bcryptjs from "bcryptjs";
import Services from "./services";
import producer from "./kafka";

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
      result.data.email,
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

    const value = JSON.stringify({
      id: uid,
      first_name: result.data.first_name,
      last_name: result.data.last_name,
      email: result.data.email,
      password: await bcryptjs.hash(result.data.password, 10),
      is_ambassador: false,
    });

    await producer.connect();
    await producer.send({
      topic: "newUser",
      messages: [{ value }],
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1 day
    });

    return response({
      res,
      status: 200,
      error: false,
      message: "",
      body: {},
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

    // const res: { }

    // const token = await auth.createCustomToken(user.uid);

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, //1 day
    // });

    return response({
      res,
      status: 200,
      error: false,
      message: "",
      body: {},
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

const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });

  return response({
    res,
    status: 200,
    error: false,
    message: "",
    body: {},
  });
};

const controller = {
  register,
  login,
  logout,
};

export default controller;

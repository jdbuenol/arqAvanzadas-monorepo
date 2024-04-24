import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import {client} from "../index";

export const Ambassadors = async (req: Request, res: Response) => {
    res.send(await getRepository(User).find({
        is_ambassador: true,
    }));
};

export const Rankings = async (req: Request, res: Response) => {
    const result: string[] = await client.sendCommand(['ZREVRANGEBYSCORE', 'rankings', '+inf', '-inf', 'WITHSCORES']);
    let name;

    res.send(result.reduce((o, r) => {
        if (isNaN(parseInt(r))) {
            name = r;
            return o;
        } else {
            return {
                ...o,
                [name]: parseInt(r),
            };
        }
    }, {}));
};

export const findByEmail = async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await getRepository(User).find({
    email,
  });
  if (user) {
    res.status(200).send({
      isError: false,
      body: user,
    })
  } else {
    res.status(404).send({
      isError: true,
      message: 'User not found',
      body: null,
    });
  }
};

export const findById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await getRepository(User).find({
    id,
  });
  if (user) {
    res.status(200).send({
      isError: false,
      body: user,
    })
  } else {
    res.status(404).send({
      isError: true,
      message: 'User not found',
      body: null,
    });
  }
};

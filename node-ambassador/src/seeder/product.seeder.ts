import { createConnection, getRepository } from "typeorm";
import * as faker from "faker";
import { Product } from "../entity/product.entity";
import { randomInt } from "crypto";

createConnection().then(async () => {
  const repository = getRepository(Product);

  for (let i = 0; i < 30; i++) {
    await repository.save({
      title: faker.lorem.words(2),
      description: faker.lorem.words(10),
      image:
        "https://firebasestorage.googleapis.com/v0/b/arq-avanzadas-47f60.appspot.com/o/615zTIQKzXL%20(1).jpg?alt=media&token=3339945b-778f-4eb3-809c-f5f2e2ade57a",
      price: randomInt(10, 100),
    });
  }

  process.exit();
});

import { EachMessagePayload, Kafka } from "kafkajs";
import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: "email-consumer",
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_SECRET,
  },
});

const consumer = kafka.consumer({ groupId: "email-consumer" });

const transporter = createTransport({
  host: "host.docker.internal",
  port: 1025,
});

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "topic_0" });
  await consumer.run({
    eachMessage: async (message: EachMessagePayload) => {
      const order = JSON.parse(message.message.value.toString());
      await transporter.sendMail({
        from: "from@example.com",
        to: "admin@admin.com",
        subject: "An order has been completed",
        html: `Order #${order.id} with a total of $${order.admin_revenue} has been completed`,
      });

      await transporter.sendMail({
        from: "from@example.com",
        to: order.ambassador_email,
        subject: "An order has been completed",
        html: `You earned $${order.ambassador_revenue} from the link #${order.code}`,
      });

      await transporter.close();
    },
  });
};
run().then(console.error);

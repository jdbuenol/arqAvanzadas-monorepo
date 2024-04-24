import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "email-consumer",
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.KAFKA_API_KEY,
    password: process.env.KAFKA_API_SECRET,
  },
});

export = kafka.producer();

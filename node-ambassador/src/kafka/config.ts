import { EachMessagePayload, Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: 'email-consumer',
    brokers: ['pkc-12576z.us-west2.gcp.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'MVUKMAXV6YCAXADW',
        password: 'HrF+SU5gmsgvlMyDwCJg06Q9Ng+fLM04WAA19SJNV7cXNkJWSwYeHs7f8sGf7V4m'
    }
});

export=kafka.producer();

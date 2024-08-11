import amqplib from "amqplib";

const queue = "product_inventory";

async function consumeMessages() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await channel.close();
      await connection.close();
    });

    await channel.assertQueue(queue, { durable: false });

    channel.consume(
      queue,
      (msg) => {
        if (msg) {
          console.log(" [x] Received %s", JSON.parse(msg.content.toString()));
        }
      },
      { noAck: true }
    );

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  } catch (e) {
    console.error(e);
  }
}

consumeMessages();

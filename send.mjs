import amqplib from "amqplib";

const queue = process.argv[2];
const text = {
  id: "test_id",
  text: process.argv[3],
};

async function sendMessage() {
  let connection;
  try {
    connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));

    console.log(" [x] Message sent %s to %s ", text, queue);

    await channel.close();
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) await connection.close();
  }
}

sendMessage();

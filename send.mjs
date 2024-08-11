import amqplib from "amqplib";

const queue = "product_inventory";
const text = {
  itemId: "nuevo mensaje",
  text: process.argv[2],
};

async function sendMessage() {
  let connection;
  try {
    connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(text)));

    console.log(" [x] Sent %s", text);

    await channel.close();
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) await connection.close();
  }
}

sendMessage();

# node-rabbit-mq
A Simple Node RabbitMQ implementation
=====================================

steps to run it locally :

***docker run -p 15692:15692 -p 5672:5672 rabbitmq***

(this will pull latest rabbitmq image and create a container, mapping the ports 5672 which is used by the client and 15692 which is used to access the manager)

***npm i***
(this will install the package.json listed dependencies)

after this you can just run the consumer that will be listening for messages by running :

***node consume.mjs <QUEUE_NAME>***

output :
[*] Waiting for messages in <QUEUE_NAME>. To exit press CTRL+C

* now you can send messages 

***node send.mjs <QUEUE_NAME> <MESSAGE>***

output :
 [x] Message sent { id: 'test_id', text: <MESSAGE> } to <QUEUE_NAME>

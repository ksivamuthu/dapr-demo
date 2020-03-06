const { EventHubProducerClient } = require("@azure/event-hubs");

const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

async function main() {
    const producer = new EventHubProducerClient(connectionString, eventHubName);

    const events = [
        'Order received',
        'Being prepared',
        'On the way',
        'Delivered'
    ];

    for (let index = 0; index < events.length; index++) {       
        console.log(`Sending event: ${events[index]}`) 
        const batch = await producer.createBatch();
        batch.tryAdd({ body: { msg: events[index] }});
        await producer.sendBatch(batch);        
        await delay(2000);
    }
    
    await producer.close();
}

async function delay(ms) {
    return  new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
}

main().catch(e => console.error('Error occurred: ', e));

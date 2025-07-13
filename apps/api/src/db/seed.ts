import client from "@repo/db"

const availableTriggers = [
    {
        "id": "webhook",
        "name": "webhook"
    }   
];

const availableActions = [
    {
        "id" : "send email",
        "name" : "send email"
    }
];
export const seedDB = async () => {
    await client.availableTrigger.createMany({
        data : availableTriggers,
        skipDuplicates:true
    })
    await client.availableAction.createMany({
        data : availableActions,
        skipDuplicates:true
    })
    console.log('Seed Successful');
}
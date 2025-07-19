import client from "@repo/db"

const availableTriggers = [
    {
        id: "webhook",
        name: "Webhook"
    }   
];

const availableActions = [
    {
        id : "send_email",
        name : "Send Email",
        dataRequired : ["To", "Body"]
    },
    {
        id : "save_to_notion",
        name : "Save To Notion",
        dataRequired : ["API_SECRET", "PageName", "Content"]
    }
];

/* Notion -> Data required 
    ["Name of Parent", -> Database Name, Page Name
     "Type of Parent", -> Database, Page, Block etc.
     " "
    ] 
*/
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
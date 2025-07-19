import Notion, { Client} from "@notionhq/client"

export const writeText = async (API_SECRET : string, PageName : string, Content : string) => {
    try {
        console.log('Starting Save To Notion')
        const notion = new Client({auth : API_SECRET});
        console.log('Connection To Notion Established')

        const pageId = await searchId(notion, PageName)
        console.log(pageId)
        // Write to page
        await notion.blocks.children.append({
            block_id : pageId,
            children : [
                {
                    paragraph : {
                        rich_text : [
                            {
                                text : {
                                    content : Content
                                }
                            }
                        ]
                    }
                }
            ]
        })

        console.log("Written")
    } catch(err) {
        console.log(err)
    }

}


const searchId = async (notion : Notion.Client, pageName : string) => {
    const response = await notion.search({
        query : pageName
    })
    return response.results[0].id
}
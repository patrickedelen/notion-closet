// @ts-nocheck
import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const db = process.env.NOTION_DB || ''

interface ClothesPage {
    properties: {
      [key:string]: {
        number?: number
        title?: Array<{
            text: {
              content: string | null
            }
        }>
        url?: string
      }
    }
    id: string
}
interface ClothesEndpoint {
  results: [
    ClothesPage
  ]
}

const getClothes = async (_: NextApiRequest, res: NextApiResponse) => {
  console.log('in function')
  const clothes: any = await notion.databases.query({
    database_id: db,
    sorts: [
      {
        property: "Times Worn",
        direction: "descending"
      }
    ]
  })

  if (clothes && clothes?.results.length > 0) {
    const results = clothes.results.map((page: ClothesPage) => {
      console.log(page)
      if (page?.properties["Name"] && page?.properties["Name"].title) {

        return {
          timesWorn: page.properties["Times Worn"].number,
          cost: page?.properties["Cost"].rich_text[0]?.text?.content,
          name: page?.properties["Name"].title[0]?.text?.content,
          imageUrl: page.properties["Image Link"].url,
          type: page?.properties["Type"].rich_text[0]?.text?.content,
          id: page.id
        }
        return { "msg": "error" }
        // return {

        //   id: page.id
        // }
      }
    })

    console.log(`got ${results.length} results from notion`)
    return res.status(200).json(results)
  }
  return res.status(500).json({ "err": "could not load clothes" })
}

export default getClothes

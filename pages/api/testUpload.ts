
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const db = process.env.NOTION_DB

const uploadPage = async (req, res) => {
  console.log('in function', req.body)
  return res.json({test: "test"})
  // try {
  //   const response = await notion.pages.create({
  //     parent: {
  //       type: "database_id",
  //       database_id: db
  //     },
  //     properties: {
  //       "Image Link": {
  //         "url": req.body.url
  //       },
  //       "Times Worn": {
  //         "number": req.body.timesWorn
  //       },
  //       "Cost": {
  //         "number": req.body.cost
  //       },
  //       "Name": {
  //         "title": [
  //           {
  //           "text": {
  //             "content": req.body.name
  //           }
  //           }
  //         ]
  //       }
  //     }
  //   })

  //   return res.json({ success: true, msg: "item added" })
  // } catch (err) {
  //   return res.json({ "err": "could not add item" })
  // }
  
  
}

export default uploadPage

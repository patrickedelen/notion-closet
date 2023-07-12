// @ts-nocheck
import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const db = process.env.NOTION_DB || ''
const outfits_db = process.env.NOTION_OUTFITS_DB || ''


function ordinalSuffix(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return "st";
    }
    if (j == 2 && k != 12) {
        return "nd";
    }
    if (j == 3 && k != 13) {
        return "rd";
    }
    return "th";
}

async function updateChildWearCount(pageId: string) {
    const pageData = await notion.pages.retrieve({
        page_id: pageId
    })
    console.log(pageData)

    const timesWorn = pageData.properties["Times Worn"].number

    const updateData = await notion.pages.update({
        page_id: pageId,
        properties: {
            "Times Worn": {
                number: timesWorn + 1
            }
        }
    })
}

const uploadOutfit = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log('got body', req.body)

    // loop through properties that exist, add to properties object
    // add images from property to page children object
    const properties = {}
    const children = []

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const todayShort = yyyy + '-' + mm + '-' + dd;

    let options = { month: 'long', day: 'numeric' };
    let datePart = today.toLocaleDateString('en-US', options);
    let yearPart = today.getFullYear();
    let dayWithSuffix = ordinalSuffix(today.getDate());

    const formattedDate = `${datePart.split(",")[0]}${dayWithSuffix}, ${yearPart}`;

    properties["title"] = {
        "id": "title",
        "type": "title",
        "title": [
            {
                "type": "text",
                "text": {
                    "content": `Your Outfit on ${formattedDate}`,
                }
            }
        ]
    }



    properties["worn on"] = {
        "type": "date",
        "date": {
            "start": todayShort,
            "end": null,
            "time_zone": null
        }
    }

    for (const key in req.body) {
        let item = req.body[key]

        properties[key.toLowerCase()] = {
            "type": "relation",
            "relation": [
                {
                    "id": item.id
                }
            ],
            "has_more": false
        }

        children.push({
            "type": "image",
    		"image": {
                "caption": [],
                "type": "external",
                "external": {
                    "url": item.url
                }
            }
        })

        updateChildWearCount(item.id)
    }

    children.push({
        "object": "block",
        "type": "heading_3",
        "heading_3": {
            "rich_text": [{ "type": "text", "text": { "content": "What do you think?" } }]
        }
    },)

    // if (topId) {
    //     // properties.top = topId
    //     children.push({
    //         "type": "image",
	// 		"image": {
    //             "caption": [],
    //             "type": "external",
    //             "external": {
    //                 "url": topUrl
    //             }
    //         }
    //     })
    // }




    const notionResp = await notion.pages.create({
        "parent": {
            "database_id": outfits_db
        },
        "properties": properties,
        "children": children
    })



    console.log('notionResp', notionResp)


    // console.log(`got ${results.length} results from notion`)
    return res.status(200).json({ url: notionResp.url })
    // return res.status(500).json({ "err": "could not load clothes" })
}

export default uploadOutfit
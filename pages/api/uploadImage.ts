// @ts-nocheck
const aws = require('aws-sdk');
import multer from 'multer'
import multerS3 from 'multer-s3'
import nextConnect from 'next-connect'
import { Client } from '@notionhq/client'

import { NextApiRequest, NextApiResponse } from 'next'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const db = process.env.NOTION_DB || ''

interface RequestForm {
  files: [
    {
      location: string
    }
  ]
  body: {
    timesWorn: string,
    cost: string,
    name: string,
    age: string,
    type: string
  }
}

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: 'us-east-1',
  signatureVersion: 'v4',
});

const s3 = new aws.S3();

const multerUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'notion-closet',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: 'photo' })
    },
    key: (req, fule, cb) => {
      cb(null, Date.now().toString())
    }
  })
})

const uploadRoute = nextConnect({
  onError(error, req, res) {
    console.log('got error', error)
  },
  onNoMatch(req, res) {
    res.write("Disallowed request")
  }
})

uploadRoute.use(multerUpload.array('photo'))

uploadRoute.post(async (req: RequestForm, res: NextApiResponse) => {

  console.log("req", req.files)
  console.log('body', req.body)
  // res.json({ data: "test" })

  try {
    const response = await notion.pages.create({
      parent: {
        type: "database_id",
        database_id: db
      },
      properties: {
        "Image Link": {
          "url": req.files[0].location
        },
        "Times Worn": {
          "number": parseInt(req.body.timesWorn)
        },
        "Cost": {
          "rich_text": [
            {
            "text": {
              "content": req.body.cost
            }
            }
          ]
        },
        "Name": {
          "title": [
            {
            "text": {
              "content": req.body.name
            }
            }
          ]
        },
        "Type": {
          "rich_text": [
            {
            "text": {
              "content": req.body.type
            }
            }
          ]
        },
        "Age": {
          "rich_text": [
            {
            "text": {
              "content": req.body.age
            }
            }
          ]
        },
      }
    })

    return res.json({ success: true, msg: "item added" })
  } catch (err) {
    return res.json({ "err": "could not add item" })
  }


})


export default uploadRoute

export const config = {
  api: {
    bodyParser: false
  }
}

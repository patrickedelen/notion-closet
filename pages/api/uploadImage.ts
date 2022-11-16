
const aws = require('aws-sdk');
import multer from 'multer'
import multerS3 from 'multer-s3'
import nextConnect from 'next-connect'


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
    res.status(405).json({ err: "method not allowed" })
  }
})

uploadRoute.use(multerUpload.array('photo'))

uploadRoute.post((req, res) => {
  console.log("req", req.files)
  res.json({ data: "test" })
})


export default uploadRoute

export const config = {
  api: {
    bodyParser: false
  }
}

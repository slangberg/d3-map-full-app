const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ storage: multer.memoryStorage() });

function s3Upload(file) {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: "d3mapimages",
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
    },
  });

  return upload.done();
}

async function deleteFileFromS3(key) {
  const command = new DeleteObjectCommand({
    Bucket: "d3mapimages",
    Key: key,
  });

  return s3Client.send(command);
}

module.exports = { upload, s3Upload, deleteFileFromS3 };

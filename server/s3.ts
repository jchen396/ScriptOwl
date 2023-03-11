import { GetObjectCommand } from "@aws-sdk/client-s3";

require("dotenv").config();
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
		secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY,
	},
	region: process.env.AWS_BUCKET_REGION,
});

// uploads a file to s3
async function uploadFile(file) {
	const fileStream = fs.createReadStream(file.path);
	const uploadParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Body: fileStream,
		Key: file.filename,
		BucketKeyEnabled: true,
	};
	let putCommand = new PutObjectCommand(uploadParams);
	await s3Client.send(putCommand);
	return file.filename;
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
	const downloadParams = {
		Key: fileKey,
		Bucket: process.env.AWS_BUCKET_NAME,
	};
	let getCommand = new GetObjectCommand(downloadParams);
	return s3Client.send(getCommand);
}
exports.getFileStream = getFileStream;

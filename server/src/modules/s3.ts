import { GetObjectCommand } from "@aws-sdk/client-s3";

require("dotenv").config();
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

interface File {
    path: string;
    filename: string;
}

const s3ClientImages = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_BUCKET1_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET1_SECRET_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
});

const s3ClientVideos = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_BUCKET2_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET2_SECRET_KEY,
    },
    region: process.env.AWS_BUCKET_REGION,
});

// uploads an image to s3
async function uploadImage(file: File) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET1_NAME,
        Body: fileStream,
        Key: file.filename,
        BucketKeyEnabled: true,
    };
    let putCommand = new PutObjectCommand(uploadParams);
    await s3ClientImages.send(putCommand);
    return file.filename;
}
exports.uploadImage = uploadImage;

// downloads a file from s3
async function getImageFileStream(fileKey: string) {
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET1_NAME,
    };
    let getCommand = new GetObjectCommand(downloadParams);
    return await s3ClientImages.send(getCommand);
}
exports.getImageFileStream = getImageFileStream;

//uploads a video to s3
async function uploadVideo(file: File) {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET2_NAME,
        Body: fileStream,
        Key: file.filename,
        BucketKeyEnabled: true,
    };
    let putCommand = new PutObjectCommand(uploadParams);
    await s3ClientVideos.send(putCommand);
    return file.filename;
}
exports.uploadVideo = uploadVideo;

async function uploadThumbnail(file: string) {
    const filePath = `${__dirname}/../uploads/${file}`;
    const fileStream = fs.createReadStream(filePath);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET2_THUMBNAILS_NAME,
        Body: fileStream,
        Key: file,
        BucketKeyEnabled: true,
    };
    let putCommand = new PutObjectCommand(uploadParams);
    await s3ClientVideos.send(putCommand);
    return file;
}
exports.uploadThumbnail = uploadThumbnail;

async function getThumbnailFileStream(fileKey: string) {
    const downloadParams = {
        Key: fileKey,
        Bucket: process.env.AWS_BUCKET2_THUMBNAILS_NAME,
    };
    let getCommand = new GetObjectCommand(downloadParams);
    return s3ClientVideos.send(getCommand);
}
exports.getThumbnailFileStream = getThumbnailFileStream;

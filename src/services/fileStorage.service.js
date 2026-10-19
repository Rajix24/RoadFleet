const crypto = require("node:crypto")
const s3 = require("../config/s3")
const {
  CreateBucketCommand,
  HeadBucketCommand,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");
// S3 bucket names cannot contain underscores.
const bucket = "assigne-pdf-file"
let bucketInitialization;

// THAT IS CREATE FILE 

async function initializeBucket() {
    try {
        await s3.send(
            new HeadBucketCommand({ Bucket: bucket })
        );
        return;
    } catch (error) {
        const bucketNotFound =
            error.name === "NotFound" ||
            error.name === "NoSuchBucket" ||
            error.$metadata?.httpStatusCode === 404;

        if (!bucketNotFound) {
            throw error;
        }
    }

    try {
        await s3.send(
            new CreateBucketCommand({ Bucket: bucket })
        );
    } catch (error) {
        // Another request may have created the bucket after the HeadBucket check.
        if (error.name === "BucketAlreadyOwnedByYou" || error.name === "BucketAlreadyExists") {
            return;
        }
        throw error;
    }
}



// UPLOAD FILE 
// TODO: FIX THE UPLOAD PROBLEMS
async function uploadFile(file){
    try{
        bucketInitialization ??= initializeBucket();
        await bucketInitialization;

        const key = crypto.randomUUID()
        await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentLength:file.size,
            ContentType: file.mimetype
        })
        )
        // THAT IS WORKING AS THE DOCUMENTATION SAY:
        return {
            key,
            bucket,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
        }
    }catch(err){
        throw new Error(`error detected ${err}`)
    }
}


// GET FILE: 
async function getFileUrl(key){
    try{
        const command = new GetObjectCommand({
            Bucket: bucket, 
            Key: key,
        })
        return getSignedUrl(s3, command, {
            expiresIn: 3000 
        })
    }catch(err){
        console.log(err)
        throw err;
    }
}
// DELETE FILE FROM THE BUCKET: 
async function deleteFile(key){
    await s3.send(
        new DeleteObjectCommand({
            Bucket: bucket,
            Key:key
        })
    )
}


module.exports = {
    initializeBucket,
    uploadFile,
    getFileUrl,
    deleteFile
}

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucket = process.env.S3_BUCKET ?? "";
let client: S3Client | null = null;

export const isStorageConfigured = () =>
  !!(bucket && process.env.S3_ENDPOINT && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY);

function r2() {
  if (!isStorageConfigured()) throw new Error("R2 storage is not configured (S3_* env vars)");
  client ??= new S3Client({
    region: process.env.S3_REGION || "auto",
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });
  return client;
}

/** Everything this site writes lives under one prefix, so the bucket can be shared safely. */
export const KEY_PREFIX = "portfolio/";

export async function putObject(key: string, body: Uint8Array | Buffer, contentType: string) {
  await r2().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
}

export async function deleteObject(key: string) {
  // Never delete anything outside our own prefix, whatever the caller passes in.
  if (!key.startsWith(KEY_PREFIX)) return;
  await r2().send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}

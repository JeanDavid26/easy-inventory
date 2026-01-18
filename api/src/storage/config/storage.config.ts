// config/storage.config.ts
export const storageConfig = {
  method: process.env['STORAGE_METHOD'] || 'volume',
  rootPath: process.env['STORAGE_ROOT_PATH'] || '/usr/src/app/storage',
  s3Bucket: process.env['S3_BUCKET']
}
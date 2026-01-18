// storage.interface.ts
export interface IStorageService {
  upload({ buffer, relativePath } : { buffer :Buffer, relativePath : string}): Promise<void>;
  download({ relativePath }: { relativePath :string}): Promise<Buffer>;
  delete({ relativePath }: { relativePath :string}): Promise<void>
}
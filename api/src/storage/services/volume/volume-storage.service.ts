import { Injectable } from '@nestjs/common'
import { IStorageService } from 'src/storage/models/storage-service.interface'
import * as fs from 'fs' 
import * as path from 'path'
import { storageConfig } from 'src/storage/config/storage.config'

@Injectable()
export class VolumeStorageService implements IStorageService {

  constructor (private _config : typeof storageConfig) {
    if (!this._config.method) {
      throw new Error('STOAGE ROOT PATH env variable missing')
    }

    if (!fs.existsSync(this._config.rootPath)) {
      fs.mkdirSync(this._config.rootPath, { recursive: true })
    }
  }

  async delete ({ relativePath }: { relativePath: string }): Promise<void> {
    const requestedPath = String(relativePath || '')
    const fullPath = path.join(this._config.rootPath, requestedPath)
    const resolvedRoot = path.resolve(this._config.rootPath) + path.sep
    const resolvedPath = path.resolve(fullPath)

    if (!resolvedPath.startsWith(resolvedRoot)) {
      throw new Error('Invalid path')
    }

    // Ensure file exists and is a file
    try {
      const stats = await fs.promises.stat(resolvedPath)
      if (!stats.isFile()) {
        throw new Error('Path is not a file')
      }
    } catch (err) {
      throw new Error('File not found')
    }

    // Delete the file
    await fs.promises.unlink(resolvedPath)

    // Remove empty parent directories up to the storage root
    const root = path.resolve(this._config.rootPath)
    let dir = path.dirname(resolvedPath)
    while (dir.startsWith(root) && dir !== root) {
      try {
        const entries = await fs.promises.readdir(dir)
        if (entries.length === 0) {
          await fs.promises.rmdir(dir)
          dir = path.dirname(dir)
        } else {
          break
        }
      } catch {
        break
      }
    }
  }

  async upload ({ buffer, relativePath }: { buffer: Buffer; relativePath: string; }): Promise<void> {
    const fullPath = path.join(this._config.rootPath, relativePath)
    
    await fs.promises.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.promises.writeFile(fullPath, new Uint8Array(buffer))
  }

  async download ({ relativePath }: { relativePath: any; }): Promise<Buffer> {
    // Build absolute path and protect against path traversal
    const requestedPath = String(relativePath || '')
    const fullPath = path.join(this._config.rootPath, requestedPath)
    const resolvedRoot = path.resolve(this._config.rootPath) + path.sep
    const resolvedPath = path.resolve(fullPath)

    if (!resolvedPath.startsWith(resolvedRoot)) {
      throw new Error('Invalid path')
    }

    // Ensure file exists and is a file
    let stats: fs.Stats
    try {
      stats = await fs.promises.stat(resolvedPath)
    } catch (err) {
      throw new Error('File not found')
    }

    if (!stats.isFile()) {
      throw new Error('Path is not a file')
    }

    // Read and return buffer
    const data = await fs.promises.readFile(resolvedPath)
    return data
  }
}

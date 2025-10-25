import { Injectable } from '@nestjs/common'
import { AppFileManagerService } from 'src/database/db-manager/app-file-manager/app-file-manager.service'
import { AppFile } from 'src/database/entities/AppFile.entity'
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs'

@Injectable()
export class FileService {
  constructor (private _appFileManagerService: AppFileManagerService) {}

  public async addAppFile (file: Express.Multer.File): Promise<AppFile> {
    const appFile: Partial<AppFile> = {
      contentType: file.mimetype,
      originalName: file.originalname,
      size: file.size
    }
    const path = await this._writeFile(file)
    appFile.path = path
    return this._appFileManagerService.insert({ data : appFile })
  }

  public async getFileBuffer (id: number): Promise<Buffer> {
    const appFile = await this._appFileManagerService.get({ id })
    try {
      // Read the file into a buffer asynchronously
      const buffer = await fs.promises.readFile(appFile.path)
      return buffer
    } catch (error) {
      console.error('Error reading file:', error)
      throw new Error('Failed to read file')
    }
  }

  private async _writeFile (file: Express.Multer.File): Promise<string> {
    const folderPath = process.env.VOLUME_URL || 'uploads'
    this._createFolderVolumeIfNotExist(folderPath)
    const uniqueFilename = uuidv4() + '_' + file.originalname // Generate a unique filename
    const filePath = `./${folderPath}/${uniqueFilename}` // Define the file path

    try {
      await fs.promises.writeFile(filePath, file.buffer) // Write the file to disk asynchronously
      return uniqueFilename // Return the unique filename
    } catch (error) {
      console.error('Error saving file:', error)
      throw new Error('Failed to save file')
    }
  }

  private async _createFolderVolumeIfNotExist (
    folderPath: string,
  ): Promise<void> {
    const isFolderCreated = await this._isFolderCreated(folderPath)
    if (isFolderCreated) {
      return
    }
    await this._createFolder(folderPath)
  }

  private async _createFolder (folderPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(folderPath, (err) => {
        if (err) {
          if (err.code && err.code === 'EEXIST') {
            resolve()
          } else {
            reject(err)
          }
        } else {
          resolve()
        }
      })
    })
  }

  private _isFolderCreated (folderPath: string): Promise<boolean> {
    return new Promise((resolve) => {
      fs.stat(folderPath, (err, stat) => {
        if (err || !stat.isDirectory()) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  public getBufferFromPath (path: string): Promise<Buffer> {
    const wholePath = `uploads/${path}`
    return fs.promises.readFile(wholePath)
  }
}

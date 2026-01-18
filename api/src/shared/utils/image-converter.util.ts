import * as fs from 'fs'
import * as path from 'path'

export class ImageConverterUtil {
  static encodeImageToBase64 (imagePath: string): string {
    try {
      const fullPath = path.join(process.cwd(), imagePath)
      const imageBuffer = fs.readFileSync(fullPath)
      const base64 = imageBuffer.toString('base64')
      
      // Détermine le type MIME basé sur l'extension
      const ext = path.extname(imagePath).toLowerCase()
      const mimeTypes: { [key: string]: string } = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp'
      }
      
      const mimeType = mimeTypes[ext] || 'image/png'
      return `data:${mimeType};base64,${base64}`
    } catch (error) {
      console.error(`Erreur lors de la conversion de l'image ${imagePath}:`, error)
      return ''
    }
  }
}

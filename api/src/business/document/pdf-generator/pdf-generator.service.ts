import * as puppeteer from 'puppeteer-core'
import * as fs from 'fs'
import * as path from 'path'
import { Injectable, Logger } from '@nestjs/common'
import * as handlebars from 'handlebars'

const puppeteerConfig = {
  // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  executablePath: process.env['PUPPETEER_PATH'] || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Path Chromium Alpine
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage', // Important pour Docker
    '--disable-gpu'
  ],
  headless: true
}

@Injectable()
export class PdfGeneratorService {
  private readonly _logger = new Logger(PdfGeneratorService.name)
  private readonly _templatesDir: string
  private readonly _templateCache = new Map<string, HandlebarsTemplateDelegate<any>>()

  constructor () {
    const fromEnv = process.env['TEMPLATES_PATH']
    if (fromEnv && fromEnv.length > 0) {
      this._templatesDir = path.resolve(fromEnv)
    } else {
      // fallback: templates folder inside dist at project root (dist/templates)
      this._templatesDir = path.resolve(process.cwd(), 'dist', 'templates')
    }
    this._logger.debug(`Templates directory set to: ${this._templatesDir}`)
    handlebars.registerHelper('times', (n, block) => {
      let result = ''
      for (let i = 0; i < n; ++i) {
        result += block.fn(i)
      }
      return result
    })

    handlebars.registerHelper('isEven', (index) => {
      return index % 2 === 0
    })
  }

  private _resolveTemplatePath (templateName: string) {
    const candidate = path.resolve(this._templatesDir, `${templateName}.hbs`)
    const root = this._templatesDir.endsWith(path.sep) ? this._templatesDir : this._templatesDir + path.sep
    if (!candidate.startsWith(root)) {
      throw new Error('Invalid template path')
    }
    return candidate
  }

  private async _loadTemplateSource (templateName: string): Promise<string> {
    const tplPath = this._resolveTemplatePath(templateName)
    await fs.promises.access(tplPath, fs.constants.R_OK)
    return fs.promises.readFile(tplPath, 'utf8')
  }

  private async _getCompiledTemplate (templateName: string): Promise<HandlebarsTemplateDelegate<any>> {
    if (this._templateCache.has(templateName)) {
      return this._templateCache.get(templateName) as HandlebarsTemplateDelegate<any>
    }
    const src = await this._loadTemplateSource(templateName)
    const compiled = handlebars.compile(src)
    this._templateCache.set(templateName, compiled)
    return compiled
  }

  async generatePdf (templateName: string, data: any): Promise<Buffer> {
    const browser = await puppeteer.launch(puppeteerConfig)

    try {
      // 1. Charger et compiler (avec cache) le template Handlebars
      const template = await this._getCompiledTemplate(templateName)
      const html = template(data)
    
      // 3. Créer une page et injecter le HTML
      const page = await browser.newPage()
      await page.setContent(html, { 
        waitUntil: 'networkidle0' // Attend que tout soit chargé
      })
    
      // 4. Générer le PDF
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true, // Pour les couleurs de fond CSS
        margin: {
          top: '20mm',
          bottom: '20mm',
          left: '10mm',
          right: '10mm'
        }
      })
    
      return Buffer.from(pdfBuffer)
    
    } finally {
      await browser.close()
    }
  }

}

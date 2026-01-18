import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpException, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => new HttpException(errors, 422)
    }),
  )

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('Easy Inventory API')
    .setDescription('API de gestion d\'inventaire et de ventes')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const port = process.env.API_PORT || 3000
  await app.listen(port)
  
  // Logs des configurations
  console.log(`
  ╔════════════════════════════════════════╗
  ║     Easy Inventory API Started        ║
  ╚════════════════════════════════════════╝
  
  🚀 API: http://localhost:${port}/api
  📚 Swagger: http://localhost:${port}/docs
  
  📋 Configuration:
  - TEMPLATES_PATH: ${process.env['TEMPLATES_PATH'] || 'default (dist/templates)'}
  - STORAGE_PATH: ${process.env['STORAGE_PATH'] || 'non défini'}
  - PUPPETEER_PATH: ${process.env['PUPPETEER_PATH'] || 'default'}
  `)
}
bootstrap()

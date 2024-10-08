import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpException, ValidationPipe } from '@nestjs/common'

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

  await app.listen(process.env.API_PORT || 3000)
}
bootstrap()

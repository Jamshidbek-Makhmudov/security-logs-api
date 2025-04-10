import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Apply global validation pipe to automatically validate incoming requests
  // whitelist: ensures only properties defined in the DTO are accepted
  // transform: automatically transforms request payloads into instances of the DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  // Use a global exception filter to handle HTTP exceptions throughout the app
  app.useGlobalFilters(new HttpExceptionFilter())

  app.setGlobalPrefix('api')

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Security Event Api')
    .setDescription('Api for monitoring and tracking security events')
    .setVersion('1.0')
    .addTag('security-events')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api/docs', app, document)

  const port = process.env.PORT || 4000

  await app.listen(port)

  console.log(`Application is running on: http://localhost:${port}`)
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`)
}

void bootstrap()

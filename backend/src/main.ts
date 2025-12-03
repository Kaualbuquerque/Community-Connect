import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilita CORS
  app.enableCors({
    origin: (origin, callback) => {
      const allowedLocalhost = 'http://localhost:3000';
      const vercelRegex = /\.vercel\.app$/;

      // Permite localhost (desenvolvimento)
      if (!origin || origin === allowedLocalhost) {
        return callback(null, true);
      }

      // Permite QUALQUER domínio da Vercel
      if (vercelRegex.test(origin)) {
        return callback(null, true);
      }

      // Caso contrário → bloqueia
      return callback(new Error('Not allowed by CORS'), false);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Header para permitir cross-origin resource access (resolve ERR_BLOCKED_BY_ORB)
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });

  // Limite do body JSON
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Catálogo Comunitário de Serviços Locais')
    .setDescription('API para gerenciar usuários, serviços, imagens, favoritos, notas, histórico e conversas.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  await app.listen(port);
  console.log(`Server running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}
bootstrap();

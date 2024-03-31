import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Todo API")
    .setDescription("The Todo API description")
    .setVersion(process.env.npm_package_version || "1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "alpha",
    },
  });

  await app.listen(3000);
}
bootstrap();

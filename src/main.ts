import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {WhatsappConfigService} from "./config.service";
import {AllExceptionsFilter} from "./api/exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: process.env.DEBUG != undefined ? ['log', 'debug', 'error', 'verbose', 'warn'] :
            ['log', 'error', 'warn'],
    });

    app.enableShutdownHooks();
    app.useGlobalFilters(new AllExceptionsFilter());
    const options = new DocumentBuilder()
        .setTitle('WhatsApp HTTP API')
        .setDescription('WhatsApp HTTP API that you can configure in a click!')
        .setExternalDoc("Github WhatsApp HTTP API", "https://github.com/allburov/whatsapp-http-api")
        .setVersion('1.0')
        .addTag('sessions', 'Control your WhatsApp sessions')
        .addTag('screenshot', 'Get screenshot of WhatsApp and show QR code')
        .addTag('chatting', 'Chat methods')
        .addTag('device', 'Device information')
        .addApiKey({
                type: 'apiKey',
                description: 'Your secret key',
                name: 'X-VENOM-TOKEN'
            }
        )
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('', app, document);

    const config = app.get(WhatsappConfigService);
    await app.listen(config.port);
    console.log(`WhatsApp HTTP API is running on: ${await app.getUrl()}`);
}

bootstrap();

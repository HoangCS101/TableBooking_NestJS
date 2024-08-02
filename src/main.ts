import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
// import * as passport from 'passport';
// import * as session from 'express-session';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as fs from 'fs';
import * as dotenv from "dotenv";

dotenv.config();
async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./src/cert/key.pem'),
    cert: fs.readFileSync('./src/cert/cert.pem'),
  };
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    { httpsOptions },
  );

  // app.use(
  //   session({
  //     secret: 'keyboard cat', // better put this in .env
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 3600000 }, // in miliseconds, thats 1hr
  //   }),
  // );

  // app.use(passport.initialize());
  // app.use(passport.session());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/partials'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
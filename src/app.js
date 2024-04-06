import express from 'express';
import path from 'path';
import { __dirname } from './utils/utils.js';
import { create as hbscreate } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import passport from 'passport';
import { init as passportInit } from './config/passport.config.js';
import productsRoter from './routers/api/products.router.js';
import cartsRouter from './routers/api/carts.router.js';
import viewsRouter from './routers/views/views.router.js';
import authRouter from './routers/api/auth.router.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware.js'
import { addLogger } from './config/logger.js';
import cors from 'cors'

const app = express();

//CORS
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(addLogger);

//docs
if (process.env.NODE_ENV !== 'prod') {
    const swaggerOpts = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'E-commerce API',
          description: 'This is the documentation of an E-commerce API',
        },
      },
      apis: [path.join(__dirname, '..', 'docs', '**', '*.yaml')],
    };
    const specs = swaggerJSDoc(swaggerOpts);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('public'));

//handlebars
const hbs = hbscreate({
  helpers: {
    multiply( a, b ) { return a * b; }
  }
})
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

passportInit();
app.use(passport.initialize());

app.use('/api', productsRoter, cartsRouter, authRouter);
app.use('/', viewsRouter);


app.use(errorHandlerMiddleware);

export default app;
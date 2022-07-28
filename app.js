import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from './config/database.js';
import router from './routes/admin.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import { dirname } from 'path';
import logger from 'morgan';
import adminRouter from './routes/admin.js';
import indexRouter from './routes/index.js';
import apiRouter from './routes/api.js';
import session from 'express-session';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

if (!db) {
  (async () => {
    await db.sync();
  })();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'asddsasadasdasdasdasdasdasdasdasd',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
    // cookie: { maxAge: 60000 },
    maxAge: Date.now() + 30 * 86400 * 1000,
  })
);
app.use(
  '/sb-admin-2',
  express.static(
    path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')
  )
);

try {
  await db.authenticate();
  console.log('Database connected');
} catch (err) {
  console.log(err);
}
app.use('/admin', adminRouter);
app.use('/api', apiRouter);
app.use('/', indexRouter);

// app.use(cors())
app.use(
  cors({
    credentials: false,
    origin: '*',
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

app.use(router);

app.listen(5000, () => {
  console.log('Server running at port: 5000');
});

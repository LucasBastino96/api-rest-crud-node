import express from 'express';
import morgan from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/routes.js';
import flash from 'connect-flash';
import session from 'express-session';
import passport from 'passport';
import './passport.js'

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//setings
app.use(express.static(join(__dirname, "public")));
// app.use('/public', express.static(join(__dirname, '/public'))); // .static indica donde van a estar los archivos de scripts, css.. los publicos
// el primer public es lo que queres que escriban en la url, el segundo es donde se encuentra ubicado
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended : false }));
app.use(passport.initialize());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.session());
app.use(flash());
app.use(router);


app.listen(process.env.PORT);
console.log(`Server on port ${process.env.PORT}`);



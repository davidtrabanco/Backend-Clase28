import config from "./config.js";

//Yargs Parametros
import _yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv))

//creo un servidor Express:
import express, { application } from "express";
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuro templates:
app.set('view-engine', 'ejs')

//Configuro WebSockets:
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
const httpServer = new HttpServer(app);
export const io = new IOServer(httpServer);

//Inicializo los WebSockets:
import {initWebSocket} from "./src/sockets/index.js";
initWebSocket(io);


//Configuro Session Cookies:
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MongoDB.URL + '/Clase26',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
    }),
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1 * 60000,
    },
}))
app.use(flash());


//Configuro e Inicializo Passport
import passport from "passport";
import {initiliazePassport} from "./passport-config.js";
app.use(passport.initialize());
app.use(passport.session());
initiliazePassport(passport);
passport.authenticate()


//Configuro Rutas y Public
import {router} from "./src/routes/index.js";
//Middleware para guardar los mensajes de flash
app.use( (req,res,next)=>{
    console.log(`Access to URL: ${req.url} --> Method: ${req.method}`);
    res.locals.message = req.flash('status');
    next();
})
app.use("/", router)
app.use(express.static('./public'));


//Inicio Servidor:
const PORT = yargs.argv._[0] || 8080;
const activeServer = httpServer.listen(PORT, ()=>console.log(`HTTP Server Up on Port ${activeServer.address().port}`))
activeServer.on('error', err => console.error(err));

//Inicio otro child process para funciones random
import {fork} from "child_process";
const childProcessRandom = fork("mainProcess.js")

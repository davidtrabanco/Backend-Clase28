import {Router} from "express";
import {isAuthenticated} from "./Middleware/checkIsAuthenticated.js";
import {authLogin} from "./Middleware/authtenticateLogin.js";
import {controller} from "./Controller/index.js";

//Declaro el router Productos:
export const router = Router();

//Información
router.get('/info', controller.info)

//Index
router.get('/', isAuthenticated('next', '/login'))

//ruta para registrar usuario
router.get("/signup", controller.showSignupForm)
router.post("/signup", controller.signup)

//Login:
router.get('/login', isAuthenticated('/', 'next'), controller.showLoginForm)
router.post('/login', authLogin, controller.login)

//Logout
router.post('/logout', isAuthenticated('next', '/login'), controller.logout)

//valido que el usuario esté registrado:
router.use( isAuthenticated('next', '/login') )
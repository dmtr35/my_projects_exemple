import Router from "express"
import authController from "../controllers/auth-controller.js"
import authMiddleware from "../middlewares/auth-middleware.js"
import { body } from 'express-validator'
const authRouter = new Router()



authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    authController.registration)


authRouter.post('/login', authController.login)

authRouter.get('/check', authMiddleware, authController.check)






export default authRouter

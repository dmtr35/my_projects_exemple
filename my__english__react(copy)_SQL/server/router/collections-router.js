import Router from "express"
import collectionsController from "../controllers/collections-controler.js"
import authMiddleware from '../middlewares/auth-middleware.js'
const collectionsRouter = new Router()



collectionsRouter.post('/createCollections/:userId', collectionsController.createCollections)
collectionsRouter.post('/addWorlds/:id', collectionsController.addWorlds)
collectionsRouter.post('/addWordsFromFile/:id', collectionsController.addWordsFromFile)





collectionsRouter.get('/getCollections/:userId', authMiddleware, collectionsController.getCollections)



collectionsRouter.post('/updateCollection/:id', collectionsController.updateCollection)
collectionsRouter.post('/updateWords/:wordId', collectionsController.updateWords)



collectionsRouter.post('/deleteOneWord/:id', collectionsController.deleteOneWord)
collectionsRouter.delete('/deleteOneCollection/:id', collectionsController.deleteOneCollection)



collectionsRouter.post('/deleteManyCollection/', collectionsController.deleteManyCollection)



collectionsRouter.post('/deleteAndMove/:id', collectionsController.deleteAndMove)

collectionsRouter.post('/createFromFile/:userId', collectionsController.createFromFile)


export default collectionsRouter
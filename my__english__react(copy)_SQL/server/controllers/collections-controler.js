import 'dotenv/config'
import { Collections, Words } from '../models/models.js'
import path from 'path'
import fs from 'fs'
import util from 'util'
const __dirname = path.resolve()
import sequelize from "../db.js"



class CollectionsController {
    async createCollections(req, res) {
        try {
            const { userId } = req.params
            const { name, filterArrWord } = req.body
            console.log("name66::", name);

            const words = JSON.parse(filterArrWord)
            await sequelize.transaction(async (t) => {

                const collections = await Collections.create({ collection_name: name, userUserId: userId })
                await Words.bulkCreate(words)
                    .then(() => Words.update({ collectionCollectionId: collections.dataValues.collection_id }, { where: { collectionCollectionId: null } }))
                console.log(collections);

                return res.json(collections)
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }
    async createFromFile(req, res) {
        try {
            const { userId } = req.params
            const { name, filterArrWord } = req.body
            const words = JSON.parse(filterArrWord)
            const file = req.files.file
            await file.mv(path.resolve(__dirname, 'static', 'dictionary.txt'))
            const readFile = util.promisify(fs.readFile);
            const result = await readFile(path.resolve(__dirname, './static/dictionary.txt'), 'utf-8')
            result.split(/\r?\n/).forEach(line => {
                if (line.length === 0) {
                    return
                } else {
                    const word = `${line}`.split(';')
                    const objWord = Object.assign({ eng: word[0], rus: word[1] })
                    words.push(objWord)
                }
            })
            await sequelize.transaction(async (t) => {
                const collections = await Collections.create({ collection_name: name, userUserId: userId })
                await Words.bulkCreate(words)
                    .then(() => Words.update({ collectionCollectionId: collections.dataValues.collection_id }, { where: { collectionCollectionId: null } }))
                return res.json(collections)
            })
            fs.rm(path.resolve(__dirname, './static/dictionary.txt'), (err) => {
                if (err) {
                    throw err;
                }
            })
            return res.json(collections)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }

    async addWorlds(req, res) {
        try {
            const collectionId = req.params.id
            const { filterArrWord } = req.body
            const arrWord = JSON.parse(filterArrWord)
            await Words.bulkCreate(arrWord)
                .then(() => Words.update({ collectionCollectionId: collectionId }, { where: { collectionCollectionId: null } }))
            return res.json("excellent")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error2' })
        }
    }
    async addWordsFromFile(req, res) {
        try {
            const collectionId = req.params.id
            const { filterArrWord } = req.body
            const arrWord = JSON.parse(filterArrWord)
            const file = req.files.file
            await file.mv(path.resolve(__dirname, 'static', 'dictionary.txt'))
            const readFile = util.promisify(fs.readFile);
            const result = await readFile(path.resolve(__dirname, './static/dictionary.txt'), 'utf-8')
            result.split(/\r?\n/).forEach(line => {
                if (line.length === 0) {
                    return
                } else {
                    const word = `${line}`.split(';')
                    const objWord = Object.assign({ eng: word[0], rus: word[1] })
                    arrWord.push(objWord)
                }
            })
            await Words.bulkCreate(arrWord)
                .then(() => Words.update({ collectionCollectionId: collectionId }, { where: { collectionCollectionId: null } }))
            fs.rm(path.resolve(__dirname, './static/dictionary.txt'), (err) => {
                if (err) {
                    throw err;
                }
            })
            return res.json("excellent")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error2' })
        }
    }


    async getCollections(req, res) {
        try {
            const { userId } = req.params
            const collections = await Collections.findAll({
                include: Words,
                where: { userUserId: userId },
                attributes: [
                    ['"userUserId"', 'userId'],
                    'collection_id',
                    ['collection_name', 'name'],
                    'words._id',
                    'words.eng',
                    'words.rus'
                ]
            })
            return res.json(collections)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }


    async updateCollection(req, res) {
        try {
            const collectionId = req.params.id
            const name = req.body
            Collections.update({ collection_name: name.name }, { where: { collection_id: collectionId } })
            return res.json("update")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }
    async updateWords(req, res) {
        try {
            const { wordId } = req.params
            const arrWord = req.body
            const response = Words.update({ eng: arrWord.eng, rus: arrWord.rus }, { where: { _id: wordId } })
            return res.json(response)
        } catch (e) {
            res.status(500).json({ message: 'Create error' })
        }
    }


    async deleteOneWord(req, res) {
        try {
            const collectionId = req.params.id
            const { wordId } = req.body
            await Words.destroy({ where: { _id: wordId, collectionCollectionId: collectionId } })
            return res.json("word delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }
    async deleteOneCollection(req, res) {
        try {
            const collectionId = req.params.id
            await sequelize.transaction(async (t) => {
                await Words.destroy({ where: { collectionCollectionId: collectionId } })
                await Collections.destroy({ where: { collection_id: collectionId } })
            })
            return res.json("collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }
    async deleteManyCollection(req, res) {
        try {
            const { arrCollId } = req.body
            await sequelize.transaction(async (t) => {
                await Words.destroy({ where: { collectionCollectionId: arrCollId } })
                await Collections.destroy({ where: { collection_id: arrCollId } })
            })
            return res.json("selected collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }

    async deleteAndMove(req, res) {
        try {
            const transferWord = req.params.id
            const { currentCollId, arrWord, wordId } = req.body
            console.log('transferWord::', transferWord);
            console.log('currentCollId::', currentCollId);
            console.log('arrWord::', arrWord);
            console.log('wordId::', wordId);
            
            await sequelize.transaction(async (t) => {
                await Words.destroy({ where: { _id: wordId, collectionCollectionId: currentCollId } })
                await Words.bulkCreate(arrWord)
                    .then(() => Words.update({ collectionCollectionId: transferWord }, { where: { collectionCollectionId: null } }))
            })
            return res.json("collection delete")
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Create error' })
        }
    }
}




export default new CollectionsController()


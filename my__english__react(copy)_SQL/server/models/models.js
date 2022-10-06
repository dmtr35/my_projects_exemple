import sequelize from "../db.js"
import { DataTypes } from "sequelize";


const User = sequelize.define('user', {
    // (тип поля числовой, первичный ключ будет автоинкрементироваться)
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // (тип поля строчный, уникальное значение)
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING }
})

const Collections = sequelize.define('collections', {
    collection_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    collection_name: { type: DataTypes.STRING, allowNull: false }
})

const Words = sequelize.define('words', {
    _id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eng: { type: DataTypes.STRING, allowNull: false },
    rus: { type: DataTypes.STRING, allowNull: false }
})

User.hasMany(Collections)             // один пользователь может иметь несколько коллекций. (один ко многим)
Collections.belongsTo(User)

Collections.hasMany(Words)                   // одина коллекция может иметь несколько слов. (один ко многим)
Words.belongsTo(Collections)


export { User, Collections, Words }


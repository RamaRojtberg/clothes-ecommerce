//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const FirstCategoriesModel = db.define('first_categories',{
    name: { type: DataTypes.STRING },
    route: {type:DataTypes.STRING},
    img: { type: DataTypes.STRING }
})

export default FirstCategoriesModel
//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const SecondCategoriesModel = db.define('second_categories',{
    first_category_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    route: {type:DataTypes.STRING},
    img: { type: DataTypes.STRING }
})

export default SecondCategoriesModel
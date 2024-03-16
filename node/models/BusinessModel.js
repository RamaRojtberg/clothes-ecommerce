//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const BusinessModel = db.define('business',{
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    shipping: { type: DataTypes.FLOAT },
    tax: { type:DataTypes.FLOAT }
})

export default BusinessModel
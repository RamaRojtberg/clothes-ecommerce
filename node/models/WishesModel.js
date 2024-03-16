//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const WishesModel = db.define('wishes', {
    user_id: {type: DataTypes.INTEGER},
    product_id: {type: DataTypes.INTEGER},
})

export default WishesModel
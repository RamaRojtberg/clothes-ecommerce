//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const ProductModel = db.define('products',{
    first_category_id: { type: DataTypes.INTEGER },
    second_category_id: { type: DataTypes.INTEGER },
    third_category_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    price: { type:DataTypes.FLOAT },
    sizes: { type:DataTypes.TEXT },
    weight: { type:DataTypes.FLOAT }
})

export default ProductModel
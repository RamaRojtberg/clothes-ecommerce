//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const PurchaseModel = db.define('purchases', {
    purchase_id: {type: DataTypes.INTEGER},
    user_id: {type: DataTypes.INTEGER},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    cardEmail: {type: DataTypes.STRING},
    payment_method: {type: DataTypes.STRING},
    payment_type:{type: DataTypes.STRING},
    productName: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    color: {type: DataTypes.STRING},
    size: {type: DataTypes.STRING},
    quantity: {type: DataTypes.INTEGER},
    currency: {type: DataTypes.STRING},
    transaction_amount: {type: DataTypes.FLOAT},
    installments: {type: DataTypes.INTEGER},
    date_created: {type: DataTypes.TEXT}
})

export default PurchaseModel
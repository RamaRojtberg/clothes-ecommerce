//CONNECTION TO DB
import db from "../database/db.js";

//SEQUELIZE
import { DataTypes } from "sequelize";

const UserModel = db.define('users', {
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
})

export default UserModel
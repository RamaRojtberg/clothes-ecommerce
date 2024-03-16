import express from 'express'

import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
//DATABASE
import db from './database/db.js'
//ROUTES
import ecommerceRoutes from './routes/routes.js'


const app = express()

//para poder trabajar con las cookies
app.use(cookieParser())

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json())
app.use('/', ecommerceRoutes)

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//configuramos las variables de entorno
dotenv.config({path: './env/.env'})


try {
    await db.authenticate()
    console.log('Conexión exitosa a la bd')
} catch (error) {
    console.log(`Error en la conexión a la bd: ${error}`);
}

app.listen(3001, () => {
    console.log('Corriendo en localhost:3001');
})
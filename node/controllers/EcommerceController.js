import FirstCategoriesModel from '../models/FirstCategoriesModel.js'
import SecondCategoriesModel from '../models/SecondCategoriesModel.js'
import ThirdCategoriesModel from '../models/ThirdCategoriesModel.js'
import ProductModel from '../models/ProductModel.js'
import UserModel from '../models/UserModel.js'
import BusinessModel from '../models/BusinessModel.js'
import PurchaseModel from '../models/PurchaseModel.js'
import { Op } from 'sequelize'


import { Payment, MercadoPagoConfig } from 'mercadopago';

import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import env from '../env/env.js'
import WishesModel from '../models/WishesModel.js'
const conexion = import('../database/db.js')
const {promisify} = import('util')

//First categories
export const firstCategories = async (req, res) => {
    try {
        const firstCategories = await FirstCategoriesModel.findAll()
        res.json(firstCategories)
    } catch (error) {
        res.json(error)
    }
}
//Second categories
export const secondCategories = async (req, res) => {
    try {
        const secondCategories = await SecondCategoriesModel.findAll()
        res.json(secondCategories)
    } catch (error) {
        res.json(error)
    }
}
//Third categories
export const thirdCategories = async (req, res) => {
    try {
        const thirdCategories = await ThirdCategoriesModel.findAll()
        res.json(thirdCategories)
    } catch (error) {
        res.json(error)
    }
}
//Show all products
export const getAllProducts = async (req, res) => {
    try{
        const products = await ProductModel.findAll()
        res.json(products)
    } catch (error) {
        res.json({message: error.message})
    }
}
//Get related products
export const getRelatedProducts = async (req, res) => {
    try {
        const relatedProds = await ProductModel.findAll({limit:4})
        res.json(relatedProds)
    } catch (error) {
        res.json({message: error.message})
    }
}
//Get this product
export const getThisProduct = async (req, res) => {
    try {
        const thisProduct = await ProductModel.findOne({ where: { name: req.params.name } });
        if (thisProduct === null) {
            res.json('not-found')
          } else {
            res.json(thisProduct)
          }
    } catch (error) {
        res.json({message: error.message})
    }
}
//Get this product BY ID
export const getThisProductByID = async (req, res) => {
    try {
        const thisProduct = await ProductModel.findOne({ where: { id: req.params.id } });
        if (thisProduct === null) {
            res.json(['not-found'])
          } else {
            res.json(['found', thisProduct])
          }
    } catch (error) {
        res.json(error)
    }
}
//Register
export const register = async (req,res) => {
    try {

        if(req.cookies.jwt){
            res.json('session')
        } else {
            const name = req.body.values.name
            const surname = req.body.values.surname
            const email = req.body.values.email
            const password = req.body.values.password
            const confirmPassword = req.body.values.confirmPassword

            if(password === confirmPassword){
                let passHash = await bcryptjs.hash(password, 8)

                const [user, created] = await UserModel.findOrCreate({
                    where: { email: email },
                    defaults: {
                    firstName: name,
                    lastName: surname,
                    password: passHash
                    }
                })
        
                res.json(created)

            } else {
                res.json('no match')
            }
        }
        
    } catch (error) {
        console.log('el error es', error);
    }
}
//Login
export const login = async (req, res) => {
    try {
        //console.log(req.body);
        const user = req.body.values.email
        const pass = req.body.values.password

        if(!user || !pass){
            res.json(['empty'])
        } else {
            
            const thisUser = await UserModel.findOne({ where: { email: req.body.values.email } });
            if (thisUser === null) {
                res.json(['not found'])
                } else {

                if(req.cookies.jwt){
                    res.json(['session'])
                } else {

                    if(await bcryptjs.compare(req.body.values.password, thisUser.password)){

                        const id = thisUser.dataValues.id
                        const token = jwt.sign({id:id}, env.JWT_SECRETO, {
                            expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        })
                        console.log("TOKEN: "+token+" para el usuario:"+user)
                        
                        const cookiesOptions = {
                            expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly: true
                        }
    
                        await res.cookie('jwt', token, cookiesOptions)
                        await res.json(["match", thisUser])
                        
                    } else {
                        res.json(['no match'])
                    }

                }

                
            }

        }


    } catch (error) {
        console.log(error);
    }
}
//Authentication
export const isAuthenticated = async (req, res)=>{
    //console.log('REQ.COOKIES.JWT', req.cookies.jwt)
    //res.json(req.body)
    if(req.cookies.jwt){
        try {
            const decodif = await jwt.verify(req.cookies.jwt, env.JWT_SECRETO)
            //console.log('decodif', decodif);
            //res.json(decodif)
            const thisUser = await UserModel.findOne({ where: { id: decodif.id } })
            //console.log('THIS USER', thisUser)
            if (thisUser === null) {
                res.json(["not found"])
            } else {
                req.user = thisUser.dataValues
                //console.log('thisUser.dataValues', thisUser.dataValues)
            }
            res.json(["session", req.user])
        } catch (error) {
            res.redirect('/')
        }
    } else {
        res.json(["no-session"])
    }
}
//Logout
export const logout = (req, res) => {
    res.clearCookie('jwt')
    res.json("logout")
}
//Fees
export const getFees = async (req, res) => {
    try {
        const fees = await BusinessModel.findOne()
        if(fees !== null){
            res.json(["ok", fees])
        } else {
            res.json(["error"])
        }
    } catch (error) {
        res.json({message: error.message})
    }
}
// MP Transaction
export const transaction = async (req, res) => {
    const client = new MercadoPagoConfig({ accessToken: 'TEST-5177178707591990-022617-e2338b9f5192e8d6b62ec224da37402d-275589178' });
    const payment = new Payment(client);

    console.log(req.body.body);

    payment.create({
        body: { 
            transaction_amount: req.body.body.transaction_amount,
            token: req.body.body.token,
            description: req.body.body.description,
            installments: req.body.body.installments,
            payment_method_id: req.body.body.paymentMethodId,
            issuer_id: req.body.body.issuerId,
                payer: {
                email: req.body.body.payer.cardholderEmail,
                identification: {
            type: req.body.body.payer.identification.type,
            number: req.body.body.payer.identification.number
        }}}
    })
    .then((result) => 
    res.json(result))

    .catch((error) => 
    console.log('error', error))
}
//Purchase validation
export const purchaseValidation = async (req, res) => {
    try {
        //console.log(req.body.body.products.length);
        let products = req.body.body.products
        if(products.length > 0){
            let totalProdsAmount = 0
            let totalShippingAmount = 0
            let totalTaxesAmount = 0
            //let totalAmount = 0

            let shippingFee = 0
            let taxFee = 0

            //console.log('req.body.bodyyyyyyyyyyyyyyyy', req.body.body);
            
            const businessFees = await BusinessModel.findOne()
            if(businessFees !== null){
                //console.log('businessFees', businessFees);
                shippingFee = businessFees.shipping
                taxFee = businessFees.tax

                for (let i = 0; i < products.length; i++) {
                    const thisProduct = await ProductModel.findOne({ where: { name: products[i].name, id:products[i].id} });
                    //console.log(products)
                    //console.log(products.length)
                    //console.log(thisProduct);
                    if (thisProduct === null) {
                        res.json('invalid 1')
                        return
                    } else {
                        if(products[i].name === thisProduct.name && products[i].id === thisProduct.id){
    
                            //Comparación de precio
                            if(products[i].price === thisProduct.price){
                    
                                //Cálculo de la cantidad por precio
                                let pricePerProd = Number(products[i].quantity * thisProduct.price).toFixed(2)
                                let qp = Number(products[i].quantity*products[i].price).toFixed(2)
                    
                                if(pricePerProd === qp){
                                //console.log('COINCIDEN. bd:', pricePerProd, "state:", qp)
                                totalProdsAmount += Number(pricePerProd)
                                totalShippingAmount += (products[i].quantity * products[i].weight * shippingFee)
                                totalTaxesAmount += (products[i].quantity * products[i].price * (taxFee/100))
                                } else {
                                    res.json('invalid 2')
                                    return
                                }       
                            } else {
                                res.json('invalid 3')
                                return
                            }
                        } else {
                            res.json('invalid 4')
                            return
                        }
                    }
                }
    
                let totalAmount = (Number(totalProdsAmount) + Number(totalShippingAmount) + Number(totalTaxesAmount)).toFixed(2)
                let totalAmountState = (Number(req.body.body.totalProdAmount) + Number(req.body.body.shippingAmount) + Number(req.body.body.taxesAmount)).toFixed(2)
    
                /*await console.log('El total calculado por bd es:', totalProdsAmount.toFixed(2), 'y el total según la validación en el front es:', req.body.body.totalProdAmount)
                await console.log('El envío calculado por bd es:', totalShippingAmount.toFixed(2), 'y el envío según la validación en el front es:', req.body.body.shippingAmount)
                await console.log('Los impuestos calculado por bd es:', totalTaxesAmount.toFixed(2), 'y los impuestos según la validación en el front es:', req.body.body.taxesAmount)*/
    
                if(totalProdsAmount.toFixed(2) === req.body.body.totalProdAmount
                    && totalShippingAmount.toFixed(2) === req.body.body.shippingAmount
                    && totalTaxesAmount.toFixed(2) === req.body.body.taxesAmount){
                        console.log('El TOTAL TOTAL calculado por bd es:', totalAmount, 'y el TOTAL TOTAL según la validación en el front es:', totalAmountState)
                        if(totalAmount === totalAmountState){
                            res.json('valid')
                        } else {
                            res.json('invalid 5')
                            return
                        }
    
                } else {
                    /*await console.log('El total calculado por bd es:', totalProdsAmount.toFixed(2), 'y el total según la validación en el front es:', req.body.body.totalProdAmount)
                    await console.log('El envío calculado por bd es:', totalShippingAmount.toFixed(2), 'y el envío según la validación en el front es:', req.body.body.shippingAmount)
                    await console.log('Los impuestos calculado por bd es:', totalTaxesAmount.toFixed(2), 'y los impuestos según la validación en el front es:', req.body.body.taxesAmount)*/
                    res.json('invalid 6')
                    return
                }

            } else {
                res.json('invalid 7')
                return
            }
            
        } else {
            res.json("invalid 8")
            return
        }

        

    } catch (error) {
        res.json(error)   
    }
}
//Add Purchase
export const addPurchase = async (req, res) => {
    try {
        //console.log('REQ.BODY.BODY', req.body.body)

        //let boughtProducts = []
        let time_created = req.body.body.date_created.slice(11,-10)
        let date_created = req.body.body.date_created.slice(0,10)
        let gmt = req.body.body.date_created.slice(23)

        //console.log(time_created)

        //boughtProducts.push(value.name+" "+value.size+" "+value.color+" ("+value.quantity+")")

        const [purchase, created] = await PurchaseModel.create({
            purchase_id: req.body.body.purchase_id,
            user_id: req.body.body.user_id,
            firstName: req.body.body.firstName,
            lastName: req.body.body.lastName,
            email: req.body.body.email,
            cardEmail: req.body.body.cardEmail,
            payment_method: req.body.body.payment_method,
            payment_type: req.body.body.payment_type,
            productName: req.body.body.product.name,
            img: req.body.body.product.img,
            color: req.body.body.product.color,
            size: req.body.body.product.size,
            quantity: req.body.body.product.quantity,
            currency: req.body.body.currency,
            transaction_amount: req.body.body.transaction_amount,
            installments: req.body.body.installments,
            date_created: date_created+" "+time_created+" GMT"+gmt
        })
        console.log(created)

        //console.log(boughtProducts)

        //let boughtProductsString = "["+boughtProducts.toString()+"]"

        /*const [purchase, created] = await PurchaseModel.findOrCreate({
            where: { purchase_id: req.body.body.purchase_id },
            defaults: {
                user_id: req.body.body.user_id,
                firstName: req.body.body.firstName,
                lastName: req.body.body.lastName,
                email: req.body.body.email,
                cardEmail: req.body.body.cardEmail,
                payment_method: req.body.body.payment_method,
                payment_type: req.body.body.payment_type,
                description: boughtProductsString,
                currency: req.body.body.currency,
                transaction_amount: req.body.body.transaction_amount,
                installments: req.body.body.installments,
                date_created: date_created+" "+time_created+" GMT"+gmt
            }
        })*/

        res.json(created)

    } catch (error) {
        res.json(error)
    }
}
//Search
export const search = async (req, res) => {
    try {
        console.log('req.params.search', req.params.search)
        const thisProduct = await ProductModel.findAll({ 
            where: { 
                [Op.or]: [
                    {
                      name: {
                        [Op.like]: req.params.search+'%'
                      }
                    },
                    {
                      description: {
                        [Op.like]: '%'+req.params.search+'%'
                      }
                    }
                  ]
            }
        })

        if (thisProduct === null) {
            res.json('not-found')
          } else {
            res.json(thisProduct)
          }
    } catch (error) {
        res.json({message: error.message})
    }
}
//Purchases by user
export const purchasesByUser = async (req, res) => {
    try {
        console.log('req.params.id', req.params.id);
        const purchases = await PurchaseModel.findAll({ where: { user_id: req.params.id } })
        if (purchases === null) {
            res.json(['not-found'])
          } else {
            res.json(['found', purchases])
          }
    } catch (error) {
        res.json(error)
    }
}

//Add wish
export const addWish = async (req, res) => {
    console.log('PARAMS USER', req.params.idUser)
    console.log('PARAMS PROD', req.params.idProd)
    try {
        const [wish, created] = await WishesModel.findOrCreate({
            where: {
                user_id: req.params.idUser,
                product_id: req.params.idProd,
            }
        })
        res.json(created)
    } catch (error) {
        res.json(error)
    }
}
//Get wishes
export const getWishes = async (req, res) => {
    try {
        const wishes = await WishesModel.findAll({
            where: {
                user_id: req.params.idUser,
            }
        })
        //console.log('WISHES', wishes)
        //console.log('WISHES LENGTH', wishes.length)
          
        let prodsWishedID = []

        wishes.forEach((value)=> {
            prodsWishedID.push(value.product_id)
        })

        if(prodsWishedID.length > 0){

            let thisProduct = ProductModel.findAll({

                where: {
                    id: {
                        [Op.or]: prodsWishedID
                    }
                }

            })
            .then((response) => {
                res.json(response)
            })
            
        } else {
            res.json([])
        }
    

    } catch (error) {
        res.json(error)
    }
}
//Remove wish
export const removeWish = async (req, res) => {
    try {
        const removeWish = await WishesModel.destroy({
            where: {
                user_id: req.params.idUser,
                product_id: req.params.idProd
            }
        })

        console.log('removeWish', removeWish)
        res.json(removeWish)

    } catch (error) {
        res.json(error)
    }
}
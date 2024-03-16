import express from "express"
import { getAllProducts, getRelatedProducts, getThisProduct, getThisProductByID, register, login, isAuthenticated, logout, getFees, transaction, purchaseValidation,
addPurchase, firstCategories, secondCategories, thirdCategories, search, purchasesByUser, addWish, getWishes, removeWish } from "../controllers/EcommerceController.js"
const router = express.Router()

router.get('/firstCategories', firstCategories)
router.get('/secondCategories', secondCategories)
router.get('/thirdCategories', thirdCategories)
//router.get('/product/:name', getThisProduct)
router.get('/', getAllProducts)
router.get('/search/:search', search)
router.get('/product', getRelatedProducts)
router.get('/product/:name', getThisProduct)
router.get('/productByID/:id', getThisProductByID)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/header', isAuthenticated)
router.get('/commerce', getFees)
router.post('/process_payment', transaction)
router.post('/purchaseValid', purchaseValidation)
router.post('/addPurchase', addPurchase)
router.get('/userPurchases/:id', purchasesByUser)
router.get('/addWish/:idUser/:idProd', addWish)
router.get('/getWishes/:idUser', getWishes)
router.get('/removeWish/:idUser/:idProd', removeWish)

export default router
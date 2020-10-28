import express from 'express'
const router = express.Router()
import {getProductById,getProducts,createProductReview,getTopProducts} from '../controllers/productControllers.js'
import {protect} from '../middleware/authMiddleware.js'

router.route('/').get(getProducts)
router.route('/top').get(getTopProducts)
router.route('/:id').get(getProductById)
router.route('/:id/review').post(protect,createProductReview)


export default router
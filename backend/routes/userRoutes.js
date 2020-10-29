import express from 'express'
const router = express.Router()
import {authUser, deleteUser, getUserById, getUserProfile,getUsers,registerUser,updateUser,updateUserProfile} from '../controllers/userControllers.js'
import {admin, protect} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,admin,getUsers).put(protect,admin,getUserById).get(protect,admin,updateUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser)

export default router 
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body
    
    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            fname:user.fname,
            lname:user.lname,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })

    }
    else{
        res.status(404)
        throw new Error ('Invalid email or password')
    }
   
})

const registerUser = asyncHandler(async(req,res)=>{

    const {fname,lname,email,password} = req.body
    
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(401)
        throw new Error('email already exists')
    }
    const user=await User.create({
        fname, 
        lname,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            fname:user.fname,
            lname:user.lname,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)

        })

    }
    else{
        res.status(404)
        throw new Error('Invalid user data')

    }
   
})



const getUserProfile = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
res.json({
    _id:user._id,
    fname:user.fname,
    lname:user.lname,
    email:user.email,
    isAdmin:user.isAdmin,
})
    }else{
        res.status(404)
        throw new Error ('user not found')
    }
   
})


const updateUserProfile = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        user.fname = req.body.fname || user.fname
        user.lname = req.body.lname || user.lname
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password === req.body.password
        }
        const updateUser= await user.save()
        res.json({
            _id:updateUser._id,
            fname:updateUser.fname,
            lname:updateUser.lname,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
            token:generateToken(updateUser._id)
        })
    }
    else{
        res.status(404)
        throw new Error ('user not found')
    }
   
})
//get all user details
const getUsers = asyncHandler(async(req,res)=>{

    const users= await User.find({})
    res.json(users)
})

// delete user
const deleteUser = asyncHandler(async(req,res)=>{

    const users= await User.findById(req.params.id)
    if(users){
        await users.remove()
        res.json({message:'user removed'})
    }
    else{
        res.status(404)
        throw new Error('User not found')
    }
})

const getUserById = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('-password')

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
   
})

const updateUser = asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        user.fname = req.body.fname || user.fname
        user.lname = req.body.lname || user.lname
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
       
        const updateUser= await user.save()
        res.json({
            _id:updateUser._id,
            fname:updateUser.fname,
            lname:updateUser.lname,
            email:updateUser.email,
            isAdmin:updateUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error ('user not found')
    }
   
})

export {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser}
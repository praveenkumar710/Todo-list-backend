// 🔖 imports 
const express = require('express');
const mongoose = require('mongoose');
// 🔖 Schema code  
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    items: { type: [String], default: [] }
});


const UserModel = mongoose.model("user", userSchema);


const userRouter = express.Router();
//  ✨ 🤵 : SIGN-UP  ✨
userRouter.post('/sign-up', async (req, res) => {
    try {
        const payload = req.body;
        const obj = {
            username: payload.username,
            password: payload.password
        };
        const newUser = await UserModel.create(obj);
        
        res.json({
            status: true,
            msg: 'user created successfully.',
            data: newUser
        });
    } catch (error) {
        res.json({
            status: false,
            msg: 'error',
            data: error
        });
    }
});

//  ✨ 🤵 : SIGN-IN  ✨
userRouter.post('/sign-in', async (req, res) => {
    try {
        const payload = req.body;
        const condition = {
            username: payload.username,
            password: payload.password
        };
        const result = await UserModel.findOne(condition);
        const status = result !== null;
        res.json({
            status: status,
            msg: status ? 'success' : 'fail',
            data: result
        });
    } catch (error) {
        res.json({
            status: false,
            msg: 'error',
            data: error
        });
    }
});

userRouter.put('/items', async (req, res) => {
    try {
        const payload = req.body;
        const condition = { _id: payload._id };
        const newObj = { items: payload.items };
        const result = await UserModel.updateOne(condition, newObj);
        
        const status = result.modifiedCount === 1;
        res.json({
            status: status,
            msg: status ? "success" : "fail",
            data: result
        });
    } catch (error) {
        res.json({
            status: false,
            msg: 'error',
            data: error
        });
    }
});


userRouter.get('/items/:id', async (req, res) => {
    try {
        const condition = {
            _id: req.params.id
        };
        const result = await UserModel.findOne(condition);
        //     👆  --> This will return an object store in db or null
        const status = result !== null;
        res.json({
            status: status,
            msg: status ? "success" : "fail",
            data: result
        });
    } catch (error) {
        res.json({
            status: false,
            msg: 'error',
            data: error
        });
    }
});

// 🔖 in user-route.js always export userRouter alone.
module.exports = userRouter;
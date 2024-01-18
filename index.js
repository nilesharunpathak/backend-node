const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/mean-practical');

const userSchema= new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    status: {type: String, enum:['active', 'inactive']},
});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(cors());

app.post('/api/usersPost', async (req, res)=>{
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error : error.message});

    }
});

app.get('/api/usersGet', async (req, res)=>{
    try {
        const users = await User.find();
        res.json(users);
        // console.log("users", users);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

app.put('/api/userPut/:id', async (req, res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.json(updatedUser)
    } catch (error) {
        res.status(500).json({error : error.message});
    }
});

app.delete('/api/usersDelete/:id', async (req, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message : 'User Deleted successfully'});

    } catch (error) {
        res.status(500).json({ error : error.message});
    }
})

app.listen(PORT, ()=>{
    console.log("Server is running");
})
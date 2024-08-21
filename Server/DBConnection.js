const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Model/SignupModel'); 
require('dotenv').config();
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://karanm17ab:karanm2004@trainingproject.77ipet4.mongodb.net/Ans3?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`App listening on port http://localhost:${port}`);
    });
})
.catch(error => {
    console.error('Error connecting to MongoDB', error);
});

app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists' });
        }
        const newUser = new User({
            name,
            email,
            password,
            gender,
        });

        await newUser.save();

        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            user.count += 1;
            user.lastLoginDate = new Date();
            await user.save();

            res.status(200).json(user);
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/userdata', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post('/api/admin-login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            res.status(200).send({ message: 'Admin authenticated' });
        } else {
            res.status(401).send({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/api/admin-data', async (req, res) => {
    try {
        const data = await User.find({ count: { $gt: 0 } }).exec();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching admin data:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

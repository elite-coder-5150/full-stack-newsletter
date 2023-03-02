const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/subscribers', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.post('/subscribe', async (req, res) => {
    const { email, name } = req.body;
    const subscriber = new Subscriber({ email, name });

    try {
       const { email } = req.body;
       const subscriber = new Subscriber({ email, name });
       await subscriber.save();

         res.status(200).json({ email });
    } catch (err) {
        if (err.name === "MongoError" && err.code === 11000) {
            res.status(400).json({ message: "Email already exists" });
        } else {
            res.status(400).json({ message: err.msg });
        }
    }
});

app.listen(3000, () => console.log('Server started on port 3000...'));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const itemsRouter = require('./routes/api/items');
dotenv.config();
const app = express();



app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const db = mongoose.connection;

app.get('/', (req,res)=> {
    res.send("Hello There")
})

app.use('/items', itemsRouter);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());
app.use('/api/', require('./routes/auth'));
app.use('/api/', require('./routes/banquet'));
app.use('/api/', require('./routes/userData'));

app.get('/', (req, res) => {
    res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

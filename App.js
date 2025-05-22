// app.js
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes (bạn sẽ thêm dần vào đây)
app.get('/', (req, res) => {
    res.send('📚 API Library Management Ready!');
});

module.exports = app;

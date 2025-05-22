// server.js
require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app'); // bạn cần tạo app.js

const PORT = process.env.PORT || 5000;

// Kết nối MongoDB bằng Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Đã kết nối MongoDB Atlas');
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error('❌ Kết nối MongoDB thất bại:', err);
});

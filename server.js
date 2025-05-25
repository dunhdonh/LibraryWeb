// server.js
import dotenv from 'dotenv';
dotenv.config(); // Nạp biến môi trường từ file .env
import mongoose from 'mongoose'; // Thư viện Mongoose để kết nối MongoDB
import app from './App.js'; // Import ứng dụng Express từ App.js

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

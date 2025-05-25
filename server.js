// server.js
import dotenv from 'dotenv';
dotenv.config(); // Nạp biến môi trường từ file .env
import mongoose from 'mongoose'; // Thư viện Mongoose để kết nối MongoDB
import cron from 'node-cron'; // Thư viện để lập lịch công việc định kỳ
import Borrowing from './models/Borrowing.js'; // Mô hình Borrowing
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

// Lập lịch công việc định kỳ mỗi ngày lúc 00:00
const markLateBorrowings = async () => {
  const today = new Date();

  const result = await Borrowing.updateMany(
    { status: 'borrowed', dueDate: { $lt: today } },
    { status: 'late' }
  );

  console.log(`[CRON] Updated ${result.modifiedCount} borrowings to 'late' status`);
};

// Schedule cron job to run every day at 00:00
cron.schedule('0 0 * * *', async () => {
  console.log('[CRON] Running markLateBorrowings job');
  try {
    await markLateBorrowings();
  } catch (err) {
    console.error('[CRON] Error updating late borrowings:', err.message);
  }
});
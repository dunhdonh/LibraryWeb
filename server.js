// server.js
import dotenv from 'dotenv';
dotenv.config(); // Nạp biến môi trường từ file .env
import mongoose from 'mongoose'; // Thư viện Mongoose để kết nối MongoDB
import cron from 'node-cron'; // Thư viện để lập lịch công việc định kỳ
import Borrowing from './models/Borrowing.js'; // Mô hình Borrowing
import app from './App.js'; // Import ứng dụng Express từ App.js
import sendEmail from './utils/sendEmail.js'; // Hàm gửi email nhắc lịch trả sách

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

const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

const borrowingsDueToday = await Borrowing.find({
    dueDate: { $gte: todayStart, $lte: todayEnd },
    status: { $in: ['borrowed', 'reserved'] }
}).populate('userId').populate('bookId');

function groupBorrowingsByUser(borrowings) {
    const grouped = {};

    borrowings.forEach(b => {
        const email = b.userId.email;
        if (!grouped[email]) {
            grouped[email] = {
                name: b.userId.name,
                email,
                books: [],
            };
        }

        grouped[email].books.push({
            title: b.bookId.title,
            dueDate: b.dueDate.toISOString().split('T')[0],
            borrowDate: b.borrowDate.toISOString().split('T')[0]
        });
    });

    return Object.values(grouped);
}

cron.schedule('0 8 * * *', async () => {
  console.log('🔔 Chạy cron job nhắc lịch trả sách hôm nay');
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const borrowingsDueToday = await Borrowing.find({
      dueDate: { $gte: todayStart, $lte: todayEnd },
      status: { $in: ['borrowed', 'reserved'] }
    }).populate('userId').populate('bookId');

    const groupedUsers = groupBorrowingsByUser(borrowingsDueToday);

    for (const user of groupedUsers) {
      await sendEmail.sendReminderEmail(user);
    }
  } catch (err) {
    console.error('Lỗi cron:', err);
  }
});





// Lập lịch công việc định kỳ mỗi ngày lúc 00:00
const markLateBorrowings = async () => {
    const today = new Date();

    const result = await Borrowing.updateMany(
        { status: 'borrowed', dueDate: { $lt: today } },
        { status: 'late' }
    );

    const result2 = await Borrowing.updateMany(
        { status: 'reserved', dueDate: { $lt: today } },
        { status: 'cancelled' }
    );

    console.log(`[CRON] Updated ${result.modifiedCount} borrowings to 'late' status`);
    console.log(`[CRON] Updated ${result2.modifiedCount} borrowings to 'cancelled' status`);
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
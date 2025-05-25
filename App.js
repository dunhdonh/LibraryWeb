import BookRoute from './routes/BookRoute.js';
import UserRoute from './routes/UserRoute.js';
import BorrowingRoute from './routes/BorrowingRoute.js';
import CategoryRoute from './routes/CategoryRoute.js';
import AuthRoute from './routes/AuthRoute.js';
// app.js
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Routes (bạn sẽ thêm dần vào đây)
app.get('/', (req, res) => {
    res.send('📚 API Library Management Ready!');
});

app.use('/api/auth', AuthRoute); // Import các route cho xác thực người dùng
app.use('/api/books', BookRoute); // Import các route cho sách
app.use('/api/users', UserRoute); // Import các route cho người dùng
app.use('/api/borrowings', BorrowingRoute); // Import các route cho mượn sách
app.use('/api/categories', CategoryRoute); // Import các route cho danh mục sách


// Import các route từ các file khác

export default app;

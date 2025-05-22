// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/User');
const Book = require('./models/Book');
const Category = require('./models/Category');
const Borrowing = require('./models/Borrowing');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Đã kết nối MongoDB Atlas');

        // Xoá toàn bộ dữ liệu cũ (nếu cần)
        // await User.deleteMany();
        // await Book.deleteMany();
        // await Category.deleteMany();
        await Borrowing.deleteMany();

        // // Thêm dữ liệu mẫu
        // const categories = await Category.insertMany([
        //     { name: 'Truyện thiếu nhi' },
        //     { name: 'Khoa học viễn tưởng' },
        //     { name: 'Kinh tế' },
        //     { name: 'Tâm lý' },
        //     { name: 'Lập trình' },
        //     { name: 'Tiểu thuyết' },
        //     { name: 'Học thuật' },
        //     { name: 'Văn học cổ điển' },
        //     { name: 'Sách giáo khoa' }
        // ]);

        // async function createUser() {
        //     const saltRounds = 10;
        //     const plainPassword = 'Dung@123';

        //     const passwordHash = await bcrypt.hash(plainPassword, saltRounds);

        //     const user = new User({
        //         name: 'Thuỳ Dung',
        //         username: 'thuydung',
        //         email: 'dung.ntt224958@sis.hust.edu.vn',
        //         passwordHash,
        //         role: 'staff',
        //         avatar: 'https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-hai-huoc-cam-dep-duoi-ai-do.jpg?1704789789335' // tùy chọn
        //     });

        //     await user.save();
        //     console.log('✅ User mới đã được thêm!');
        // }

        // await createUser();

        // async function addBook( title, author, categoryName, image, stock) {
        //     // B1: tìm hoặc tạo category
        //     let category = await Category.findOne({ name: categoryName });
        //     if (!category) {
        //         category = await Category.create({ name: categoryName });
        //     }

        //     // B2: tạo sách với category._id
        //     const book = new Book({
        //         title: title,
        //         author: author,
        //         category: category._id, // Gán _id
        //         image: image,
        //         stock: stock
        //     });

        //     await book.save();
        //     console.log('✅ Đã thêm sách');
        // }

        // await addBook('Harry Potter và hòn đá phù thuỷ', 'J.K.Rowling', 'Truyện thiếu nhi', 'https://upload.wikimedia.org/wikibooks/vi/5/5e/B%C3%ACa_s%C3%A1ch_Harry_Potter_ph%E1%BA%A7n_1.jpg', 10);
        // await addBook('Lược sử thời gian', 'Stephen Hawking', 'Học thuật', 'https://www.nxbtre.com.vn/Images/Book/nxbtre_full_20002022_040049.jpg', 5);
        // await addBook('Sapiens', 'Yuval Noah Harari', 'Học thuật', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTciyQv1wvaHKv7m8QXPHGZ1LHmpsNj1nc3w&s', 8);
        // await addBook('Đắc Nhân Tâm', 'Dale Carnegie', 'Tâm lý', 'https://example.com/image4.jpg', 12);
        // await addBook('Clean Code', 'Robert C. Martin', 'Lập trình', 'https://example.com/image5.jpg', 7);

        await Borrowing.insertMany([
            {
                userId: '682dff28b375de5195ff051d',
                bookId: '682dfe10fe563dcb262a560d',
                borrowedAt: new Date(),
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 ngày sau
            }
        ]);

        console.log('🌱 Dữ liệu mẫu đã được thêm thành công!');
        process.exit();
    } catch (err) {
        console.error('❌ Lỗi khi seed dữ liệu:', err);
        process.exit(1);
    }
}

seed();

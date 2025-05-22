const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['reader', 'staff'], required: true },
  avatar: { type: String },  // URL của ảnh đại diện
  email: { type: String, required: true, unique: true },
  name: { type: String },           // Tên người dùng
  phone: { type: String },
  address: { type: String },
}, { timestamps: true });  // tự động tạo createdAt, updatedAt

module.exports = mongoose.model('User', userSchema);

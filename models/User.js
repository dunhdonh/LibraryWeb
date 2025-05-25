import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["Reader", "Admin"], default: "Reader" },
  borrowingCount: { type: Number, default: 0 },  // số lần mượn sách
  avatar: { type: String },  // URL của ảnh đại diện
  phone: { type: String },
  address: { type: String },
}, { timestamps: true });  // tự động tạo createdAt, updatedAt

const User = mongoose.model('User', userSchema);
export default User;
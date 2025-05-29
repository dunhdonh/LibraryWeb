import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // Nạp biến môi trường từ file .env
const sendOtpEmail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,         // thay bằng email thật
      pass: process.env.EMAIL_PASSWORD,            // pass ứng dụng (không phải mật khẩu tài khoản)
    },
  });

  const mailOptions = {
    from: '"Thư viện Bookio" <your_email@gmail.com>',
    to: toEmail,
    subject: '[Thư viện Bookio] Mã OTP khôi phục mật khẩu',
    html: `
      <h3>Xin chào,</h3>
      <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
      <p>Mã có hiệu lực trong 5 phút.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendReminderEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const bookListHtml = user.books.map(book => `
    <li><b>${book.title}</b> (Ngày mượn: ${book.borrowDate}, Hạn trả: ${book.dueDate})</li>
  `).join('');

  const mailOptions = {
    from: `"Thư viện Bookio" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `[Thư viện Bookio] Nhắc lịch trả sách hôm nay`,
    html: `
      <p>Kính gửi <b>${user.name ?? 'Bạn'}</b>,</p>
      <p>Thư viện Bookio xin nhắc bạn về các sách đến hạn trả hôm nay:</p>
      <ul>${bookListHtml}</ul>
      <p>Vui lòng hoàn trả sách đúng hạn.</p>
      <p>Trân trọng,<br/>Thư viện Bookio</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.error(err);
    console.log(`📧 Đã gửi email đến: ${user.email}`);
  });
}


export default { sendOtpEmail, sendReminderEmail };
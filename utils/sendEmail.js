import nodemailer from 'nodemailer';

const sendOtpEmail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kimnguyen3104@gmail.com',         // thay bằng email thật
      pass: 'ohdd owrk snfo wiwb',            // pass ứng dụng (không phải mật khẩu tài khoản)
    },
  });

  const mailOptions = {
    from: '"Library System" <your_email@gmail.com>',
    to: toEmail,
    subject: 'Mã OTP khôi phục mật khẩu',
    html: `
      <h3>Xin chào,</h3>
      <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
      <p>Mã có hiệu lực trong 5 phút.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default {sendOtpEmail};
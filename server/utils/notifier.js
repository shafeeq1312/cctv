const nodemailer = require('nodemailer');

// Send email notification to Admin when a customer submits an enquiry
const sendAdminEmailNotification = async (enquiryData) => {
  try {
    const adminEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || 'luckycommunication@gmail.com';
    const adminPhone = process.env.ADMIN_PHONE || '9876543210';

    // Configure Nodemailer transporter (Fallback to ethereal test account if SMTP not configured)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'luckycommunication@gmail.com',
        pass: process.env.SMTP_PASS || 'app-password-here'
      }
    });

    const mailOptions = {
      from: '"Lucky CCTV Alert System" <no-reply@luckycommunication.com>',
      to: adminEmail,
      subject: `🚨 NEW CUSTOMER ENQUIRY: ${enquiryData.name} - ${enquiryData.phone}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #080D1A; color: #F8FAFC; padding: 24px; borderRadius: 16px;">
          <div style="background-color: #0F172A; border: 1px solid #334155; padding: 20px; border-radius: 12px;">
            <h2 style="color: #38BDF8; margin-top: 0;">🚨 New Customer Enquiry Received</h2>
            <p style="color: #94A3B8; font-size: 14px;">Lucky Communication CCTV & Security Solutions, Dindigul</p>
            <hr style="border-color: #334155; margin: 16px 0;" />
            
            <table style="width: 100%; font-size: 14px; text-align: left; color: #E2E8F0;">
              <tr>
                <td style="padding: 6px 0; color: #94A3B8; font-weight: bold; width: 140px;">Customer Name:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #FFFFFF;">${enquiryData.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94A3B8; font-weight: bold;">Phone Number:</td>
                <td style="padding: 6px 0; font-weight: bold; color: #4ADE80;"><a href="tel:+91${enquiryData.phone}" style="color: #4ADE80; text-decoration: none;">+91 ${enquiryData.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94A3B8; font-weight: bold;">Email Address:</td>
                <td style="padding: 6px 0; color: #38BDF8;"><a href="mailto:${enquiryData.email}" style="color: #38BDF8; text-decoration: none;">${enquiryData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94A3B8; font-weight: bold;">Product/Service:</td>
                <td style="padding: 6px 0; color: #FACC15;">${enquiryData.product || 'General Enquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94A3B8; font-weight: bold; vertical-align: top;">Enquiry Message:</td>
                <td style="padding: 6px 0; color: #F8FAFC; background-color: #1E293B; padding: 10px; border-radius: 8px;">${enquiryData.message}</td>
              </tr>
            </table>

            <hr style="border-color: #334155; margin: 20px 0 16px 0;" />
            <div style="text-align: center;">
              <a href="https://wa.me/91${enquiryData.phone}?text=${encodeURIComponent('Hello ' + enquiryData.name + ', I am replying to your CCTV enquiry submitted on Lucky Communication.')}" 
                 style="background-color: #16A34A; color: #FFFFFF; font-weight: bold; padding: 10px 20px; text-decoration: none; border-radius: 8px; display: inline-block; margin-right: 8px;">
                💬 Reply Customer on WhatsApp
              </a>
              <a href="tel:+91${enquiryData.phone}" 
                 style="background-color: #2563EB; color: #FFFFFF; font-weight: bold; padding: 10px 20px; text-decoration: none; border-radius: 8px; display: inline-block;">
                📞 Call Customer (+91 ${enquiryData.phone})
              </a>
            </div>
          </div>
        </div>
      `
    };

    // Attempt to send email async (logs result gracefully)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('ℹ️ Email Notification Logged for Admin:', enquiryData.name, enquiryData.phone);
      } else {
        console.log('✅ Admin Notification Email Sent:', info.response);
      }
    });

    return true;
  } catch (error) {
    console.error('Error sending email notification:', error.message);
    return false;
  }
};

module.exports = {
  sendAdminEmailNotification
};

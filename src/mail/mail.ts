import nodemailer from "nodemailer";

// Define the SMTP configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP server
  port: 465,
  secure: true,
  auth: {
    user: process.env.SENDER_MAIL, // Replace with your SMTP username
    pass: process.env.MAIL_PASSWORD, // Replace with your SMTP password
  },
});

// Function to send an email
export const welcomeEmailTemplate = (
  name: string
): { subject: string; text: string; html: string } => {
  const subject = "Welcome to Our Platform!";
  const text = `Hi ${name},\n\nWelcome to Our Platform! We're excited to have you on board.\n\nBest regards,\nThe Team`;
  const html = `
      <p>Hi <strong>${name}</strong>,</p>
      <p>Welcome to Our Platform! We're excited to have you on board.</p>
      <p>Best regards,</p>
      <p><strong>The Team</strong></p>
    `;
  return { subject, text, html };
};

export const passwordResetEmailTemplate = (
  name: string,
  resetLink: string
): { subject: string; text: string; html: string } => {
  const subject = "Password Reset Request";
  const text = `Hi ${name},\n\nYou requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nThe Team`;
  const html = `
      <p>Hi <strong>${name}</strong>,</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p><strong>The Team</strong></p>
    `;
  return { subject, text, html };
};

export const forgotPasswordEmailTemplate = (
  name: string,
  resetLink: string
): { subject: string; text: string; html: string } => {
  const subject = "Forgot Your Password?";
  const text = `Hi ${name},\n\nWe received a request to reset your password. Click the link below to reset it:\n\n${resetLink}\n\nIf you did not request this, please contact our support team.\n\nBest regards,\nThe Team`;
  const html = `
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>If you did not request this, please contact our support team.</p>
      <p>Best regards,</p>
      <p><strong>The Team</strong></p>
    `;
  return { subject, text, html };
};

const sendEmail = async (
  to: string,
  template: { subject: string; text: string; html: string }
) => {
  try {
    const mailOptions = {
      from: '"Health Care" <awanabuzar945@gmail.com>',
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Info: ", info);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Example usage
export const sendWelcomeEmail = async (email: string, name: string) => {
  console.log("Email sent: %s", email);
  const template = welcomeEmailTemplate(name);
  await sendEmail(email, template);
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  resetLink: string
) => {
  const template = passwordResetEmailTemplate(name, resetLink);
  await sendEmail(email, template);
};

export const sendForgotPasswordEmail = async (
  email: string,
  name: string,
  resetLink: string
) => {
  const template = forgotPasswordEmailTemplate(name, resetLink);
  await sendEmail(email, template);
};

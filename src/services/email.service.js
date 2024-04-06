import nodemailer from 'nodemailer'

export default class EmailService {

  static #instance = null;

  constructor() {
    this.transport = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments,
    });
  }

  static getInstance() {
    if (!EmailService.#instance) {
      EmailService.#instance = new EmailService();
    }
    return EmailService.#instance;
  }
}
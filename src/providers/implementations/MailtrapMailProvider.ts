import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvieder";
import nodemailer from "nodemailer";

export class MailtrapMailProvider implements IMailProvider {
  private transporter: Mail;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "af31d3cfefeb8e",
        pass: "6fea788778a9ca",
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body, 
    })
  }
}

import nodemailer, { SendMailOptions } from 'nodemailer'

class Mailer {
  private transporter: nodemailer.Transporter

  constructor(host: string, port: number, user: string, pass: string) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass },
    })
  }

  public async sendEmail(options: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options)
    } catch (error) {
      throw error
    }
  }
}

export default Mailer
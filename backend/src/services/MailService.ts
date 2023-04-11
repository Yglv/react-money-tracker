import nodemailer from 'nodemailer'

const SMTP_HOST = 'smtp.gmail.com'
const SMTP_PORT = 587
const SMTP_USER = 'egich27072002@Gmail.com'
const SMTP_PASSWORD = 'vhdfqrhkkgpbwwnw'
export const API_URL = 'http://localhost:5000'

class MailService {
  transporter: nodemailer.Transporter
  constructor(){
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
      }
    })
  }

  async sendActivationLink(to: string, link: string){
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + API_URL,
      text:'',
      html:
        `<div>
           <h1>Для активации перейдите по ссылке</h1>
           <a href="${link}">${link}</a>
         </div>
        `
    })
  }
}

export const mailService = new MailService() 
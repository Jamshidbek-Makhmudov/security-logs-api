/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private transporter

  constructor(private configService: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: configService.get<string>('SMTP_PORT'),
      secure: configService.get<string>('SMTP_SECURE') === 'true',
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASS'),
      },
    })
  }

  async sendSecurityAlert(eventType: string, details: any): Promise<void> {
    try {
      const alertEmail: string = this.configService.get<string>('ALERT_EMAIL')

      await this.transporter.sendMail({
        from: `"Security Alert" <${this.configService.get('SMTP_USER')}>`,
        to: alertEmail,
        subject: `Security Alert: ${eventType} Detected`,
        html: `
          <h1>Security Alert: ${eventType}</h1>
          <p>A security event of type ${eventType} has been detected.</p>
          <h2>Details:</h2>
          <pre>${JSON.stringify(details, null, 2)}</pre>
        `,
      })

      this.logger.log(`Security alert email sent for ${eventType}`)
    } catch (error) {
      this.logger.error(`Failed to send security alert email: ${error.message}`)
    }
  }
}

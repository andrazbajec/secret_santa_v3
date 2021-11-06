from os import environ
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from logger import Logger

class Mailer:
    def __init__(self):
        self.email = environ.get('email_address')
        self.password = environ.get('email_password')
        self.server = environ.get('email_server')
        self.port = environ.get('email_port')

        if not self.email:
            raise Exception('Email address missing in .env!')

        if not self.password:
            raise Exception('Email password missing in .env!')

        if not self.server:
            raise Exception('Email server missing in .env!')

        if not self.port:
            raise Exception('Email port missing in .env!')

    def send(self, subject, message, email_to):
        msg = MIMEMultipart()
        msg.set_unixfrom('author')
        msg['From'] = self.email
        msg['To'] = email_to
        msg['Subject'] = subject
        message = message
        msg.attach(MIMEText(message))

        Logger.log('Creating connection')
        mailserver = smtplib.SMTP_SSL(self.server, self.port)

        Logger.log('Ehlo')
        mailserver.ehlo()

        Logger.log('Logging in')
        mailserver.login(self.email, self.password)

        Logger.log('Sending email')
        response = mailserver.sendmail(self.email, email_to, msg.as_string())

        Logger.log(f'Message sent to {email_to}')
        mailserver.quit()

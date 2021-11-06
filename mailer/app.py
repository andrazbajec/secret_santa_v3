from dotenv import load_dotenv
from mailer import Mailer
from logger import Logger
from http.server import BaseHTTPRequestHandler, HTTPServer
from os import environ
from base_enum import BaseEnum
import cgi

load_dotenv()

class App(BaseHTTPRequestHandler):
    def do_POST(self):
        form = cgi.FieldStorage(
            fp = self.rfile,
            headers = self.headers,
            environ = { 'REQUEST_METHOD': 'POST' }
        )

        secret = form.getvalue('secret')
        server_secret = environ.get('server_secret')

        if secret != server_secret:
            Logger.log('Provided secret is not valid', True)
            return

        email = form.getvalue('email')
        if not email:
            Logger.log('Provided email is not valid', True)
            return

        subject = form.getvalue('subject')
        if not subject:
            Logger.log('Provided subject is not valid', True)
            return

        message = form.getvalue('message')
        if not message:
            Logger.log('Provided message is not valid', True)
            return

        mailer = Mailer()
        try:
            mailer.send(subject, message, email)
        except Exception as e:
            Logger.log(e, True)

def main():
    if __name__ == '__main__':
        port = environ.get('server_port')
        hostname = environ.get('server_hostname')

        if not port:
            Logger.log('Server port missing in .env', True)
            return

        if not hostname:
            Logger.log('Server hostname missing in .env', True)
            return

        if not environ.get('server_secret'):
            Logger.log('Server secret missing in .env', True)
            return

        server = HTTPServer((hostname, int(port)), App)
        Logger.log(f'Server started on http://{hostname}:{port}')

        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass

        Logger.log('Server stopped')

main()
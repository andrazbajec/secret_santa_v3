from datetime import datetime

class Logger:
    @staticmethod
    def log(message, is_error = False):
        now = datetime.now()
        log_message = f'[{now.hour}:{now.minute}:{now.second} {now.day}.{now.month}.{now.year}] {message}\n'

        log_file = open('base.log', 'a')
        log_file.write(log_message)
        log_file.close()

        if is_error:
            error_file = open('error.log', 'a')
            error_file.write(log_message)
            error_file.close()

        print(log_message)
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_mail(receiverEmail, subjectEmail, html_content):
    subject = subjectEmail
    sender_email = "Enter your email"
    receiver_email = receiverEmail
    password = "Enter Password"
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(html_content, "html", 'utf-8'))

    # Log in to server using secure context and send email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("mail.subhdeals.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.send_message(message)
        print("Mail send.")

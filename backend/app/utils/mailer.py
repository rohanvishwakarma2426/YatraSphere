import os
import smtplib
from email.mime.text import MIMEText

# Reads SMTP_* from the same .env file that already holds DATABASE_URL.
# Works with Gmail (use an "App Password", not your normal password),
# or any SMTP provider (SendGrid, Mailgun, Brevo, etc).


def send_email(to_email: str, subject: str, body: str) -> None:

    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASSWORD")
    from_email = os.getenv("SMTP_FROM", user)

    if not all([host, user, password]):
        raise RuntimeError(
            "SMTP is not configured — add SMTP_HOST, SMTP_PORT, SMTP_USER, "
            "SMTP_PASSWORD (and optionally SMTP_FROM) to backend/.env"
        )

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = from_email
    msg["To"] = to_email

    with smtplib.SMTP(host, port) as server:
        server.starttls()
        server.login(user, password)
        server.sendmail(from_email, [to_email], msg.as_string())
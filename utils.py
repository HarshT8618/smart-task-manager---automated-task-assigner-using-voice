import os
from flask import current_app
from flask_mail import Message
from app import mail


def send_task_notification_email(to, subject, body):
    """
    Send task-related email notifications to users
    
    Args:
        to (str): Recipient email address
        subject (str): Email subject
        body (str): Email body content
    """
    if not to:
        current_app.logger.error("No recipient email provided")
        return False
    
    try:
        msg = Message(
            subject=subject,
            recipients=[to],
            body=body,
            sender=current_app.config.get('MAIL_DEFAULT_SENDER')
        )
        mail.send(msg)
        return True
    except Exception as e:
        current_app.logger.error(f"Failed to send email: {str(e)}")
        return False


def format_datetime(dt):
    """
    Format datetime for display
    
    Args:
        dt: Datetime object
        
    Returns:
        str: Formatted datetime string
    """
    if not dt:
        return "N/A"
    return dt.strftime("%d %b, %Y - %H:%M")


def get_priority_badge_class(priority):
    """
    Get Bootstrap badge class based on priority
    
    Args:
        priority (str): Task priority (low, medium, high)
        
    Returns:
        str: CSS class for the badge
    """
    if priority == "high":
        return "bg-danger"
    elif priority == "medium":
        return "bg-warning"
    else:
        return "bg-info"


def get_status_badge_class(status):
    """
    Get Bootstrap badge class based on status
    
    Args:
        status (str): Task status (pending, in-progress, completed)
        
    Returns:
        str: CSS class for the badge
    """
    if status == "completed":
        return "bg-success"
    elif status == "in-progress":
        return "bg-primary"
    else:
        return "bg-secondary"

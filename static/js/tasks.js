document.addEventListener('DOMContentLoaded', function() {
    // Setup due date highlight
    highlightDueDates();
    
    // Setup confirmation dialogs
    setupConfirmationDialogs();
    
    // Setup comment handlers
    setupCommentHandlers();
});

/**
 * Highlight due dates based on their proximity
 */
function highlightDueDates() {
    const dueDateElements = document.querySelectorAll('.due-date');
    
    dueDateElements.forEach(element => {
        const dueDate = new Date(element.getAttribute('data-date'));
        const today = new Date();
        
        // Check if the due date is in the past
        if (dueDate < today) {
            element.classList.add('text-danger', 'fw-bold');
            element.setAttribute('data-bs-original-title', 'Overdue');
        } 
        // Check if the due date is within the next 2 days
        else if ((dueDate - today) / (1000 * 60 * 60 * 24) < 2) {
            element.classList.add('text-warning', 'fw-bold');
            element.setAttribute('data-bs-original-title', 'Due soon');
        }
    });
}

/**
 * Setup confirmation dialogs for delete operations
 */
function setupConfirmationDialogs() {
    const deleteButtons = document.querySelectorAll('[data-confirm]');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const confirmMessage = this.getAttribute('data-confirm');
            
            if (!confirm(confirmMessage)) {
                e.preventDefault();
                return false;
            }
        });
    });
}

/**
 * Setup comment form handlers
 */
function setupCommentHandlers() {
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    
    if (commentForm && commentInput) {
        commentForm.addEventListener('submit', function(e) {
            if (!commentInput.value.trim()) {
                e.preventDefault();
                alert('Comment cannot be empty');
                return false;
            }
        });
    }
}

/**
 * Mark notification as read
 */
function markNotificationRead(notificationId) {
    fetch(`/mark-notification-read/${notificationId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update UI to show notification as read
            const notificationElement = document.getElementById(`notification-${notificationId}`);
            if (notificationElement) {
                notificationElement.classList.remove('unread-notification');
                notificationElement.classList.add('read-notification');
            }
        }
    })
    .catch(error => console.error('Error marking notification as read:', error));
}

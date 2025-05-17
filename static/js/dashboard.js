document.addEventListener('DOMContentLoaded', function() {
    // Initialize task status chart if it exists
    const taskStatusChartCanvas = document.getElementById('taskStatusChart');
    if (taskStatusChartCanvas) {
        initTaskStatusChart(taskStatusChartCanvas);
    }
    
    // Initialize task timeline chart if it exists
    const taskTimelineChartCanvas = document.getElementById('taskTimelineChart');
    if (taskTimelineChartCanvas) {
        initTaskTimelineChart(taskTimelineChartCanvas);
    }
});

/**
 * Initialize the task status chart
 */
function initTaskStatusChart(canvas) {
    // Get task counts from data attributes
    const pendingTasks = parseInt(canvas.getAttribute('data-pending') || 0);
    const inProgressTasks = parseInt(canvas.getAttribute('data-in-progress') || 0);
    const completedTasks = parseInt(canvas.getAttribute('data-completed') || 0);
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'In Progress', 'Completed'],
            datasets: [{
                data: [pendingTasks, inProgressTasks, completedTasks],
                backgroundColor: [
                    '#6c757d',  // Secondary (Pending)
                    '#0d6efd',  // Primary (In Progress)
                    '#198754'   // Success (Completed)
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

/**
 * Initialize the task timeline chart
 * This is a simple implementation that would normally use real data
 */
function initTaskTimelineChart(canvas) {
    // In a real application, this data would come from the server
    // For this demo, we're using static data
    const ctx = canvas.getContext('2d');
    
    // Get the last 6 months
    const months = [];
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        months.push(monthDate.toLocaleString('default', { month: 'short' }));
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Created Tasks',
                    data: [5, 8, 12, 7, 10, 15],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Completed Tasks',
                    data: [3, 6, 10, 5, 8, 12],
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Tasks'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

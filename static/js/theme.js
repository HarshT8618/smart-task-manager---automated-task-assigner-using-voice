document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use the browser setting as default
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the theme
    applyTheme(savedTheme);
    
    // Add event listener for theme toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            applyTheme(newTheme);
            
            // Send to server to save in cookies too
            saveThemePreference(newTheme);
        });
    }
    
    /**
     * Apply the given theme to the document
     */
    function applyTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon in the theme toggle button
        if (themeToggleBtn) {
            // Clear previous icon
            themeToggleBtn.innerHTML = '';
            
            // Add new icon based on theme
            if (theme === 'dark') {
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggleBtn.setAttribute('title', 'Switch to light mode');
            } else {
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggleBtn.setAttribute('title', 'Switch to dark mode');
            }
        }
    }
    
    /**
     * Save theme preference to server via fetch
     */
    function saveThemePreference(theme) {
        const formData = new FormData();
        formData.append('theme', theme);
        
        fetch('/toggle-theme', {
            method: 'POST',
            body: formData
        }).catch(error => {
            console.error('Error saving theme preference:', error);
        });
    }
});

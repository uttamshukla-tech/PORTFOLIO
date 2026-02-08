/**
 * Portfolio Navigation Handler
 * Manages page transitions and navigation state
 */

// Page Navigation Function
function showPage(pageId) {
    // Remove active class from all navigation buttons
    document.querySelectorAll('.nav-btn, .home-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Remove active class from all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Add active class to target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
            targetPage.scrollTop = 0;
        }, 50);
    }

    // Highlight active navigation button
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === pageId) {
            btn.classList.add('active');
        }
    });
}

// Initialize portfolio on page load
window.addEventListener('load', () => {
    // Show home page by default
    showPage('home');

    // Add smooth scroll behavior
    document.querySelectorAll('.page').forEach(page => {
        page.style.scrollBehavior = 'smooth';
    });
});

// Optional: Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    }
});

// Optional: Add keyboard navigation
document.addEventListener('keydown', (event) => {
    const pages = ['home', 'education', 'skills', 'experience'];
    const currentPageElement = document.querySelector('.page.active');
    const currentPageId = currentPageElement ? currentPageElement.id : 'home';
    const currentIndex = pages.indexOf(currentPageId);

    // Arrow key navigation
    if (event.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }

    // Home key
    if (event.key === 'Home') {
        event.preventDefault();
        showPage('home');
    }
});

// Console welcome message
console.log('%c Welcome to Uttam Shukla\'s Portfolio! ', 'background: linear-gradient(135deg, #3b82f6, #06b6d4); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Aspiring Security Analyst | Computer Engineering Student ', 'color: #9ca3af; font-size: 12px;');
```

---

## 📁 File Structure
// ```
// portfolio /
// ├── index.html
// ├── styles.css
// └── script.js
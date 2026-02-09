/**
 * Portfolio Navigation Handler with History Support
 */

// Helper: Updates the UI (classes/display) without touching history
function updateView(pageId) {
    // 1. Highlight the correct navigation button
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn, .home-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Find and highlight the button that links to this page
    // (We match the onclick attribute to find the correct button)
    const activeBtn = document.querySelector(`button[onclick="showPage('${pageId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // 2. Show the correct page content
    // Remove active class from all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Add active class to target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        // Optional: Scroll to top of the new section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Main Function: Called when user clicks a button
function showPage(pageId) {
    // 1. Update the visual UI
    updateView(pageId);

    // 2. Add this action to the browser history
    // This makes the URL change to .../index.html#skills
    history.pushState({ page: pageId }, null, `#${pageId}`);
}

// Event: Handle Browser "Back" and "Forward" buttons
window.addEventListener('popstate', (event) => {
    // If state exists (we clicked back to a pushed state), use it
    // If state is null (we went back to start), check URL hash, or default to 'home'
    const pageId = event.state?.page || window.location.hash.slice(1) || 'home';
    updateView(pageId);
});

// Event: Handle Page Refresh / Initial Load
window.addEventListener('DOMContentLoaded', () => {
    // Check if URL has a hash (e.g. #experience)
    const pageId = window.location.hash.slice(1) || 'home';
    
    // Show that page immediately
    updateView(pageId);

    // Replace the current history state so we have a valid starting point
    history.replaceState({ page: pageId }, null, `#${pageId}`);
});

// Console signature
console.log('%c Portfolio Loaded ', 'background: #3b82f6; color: white; padding: 4px; border-radius: 4px;');

/**
 * Portfolio Navigation Handler
 * Fixes Back Button & Refresh Issues
 */

// 1. Define all valid page IDs to prevent errors
const validPages = ['home', 'education', 'skills', 'experience'];

// 2. Main function to display a specific section
function showPage(pageId) {
    // If the pageId is invalid (e.g. from a bad URL), default to home
    if (!validPages.includes(pageId)) pageId = 'home';

    // -- VISUAL UPDATES --

    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show the specific page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0); // Scroll to top
    }

    // Update Navigation Buttons (highlight the active one)
    document.querySelectorAll('.nav-btn, .home-btn').forEach(btn => {
        // We check the onclick attribute to match the button to the page
        // or check if the button text matches the pageId
        if (btn.getAttribute('onclick')?.includes(`'${pageId}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // -- BROWSER HISTORY UPDATE --
    
    // Only push a new state if we aren't already there
    // This prevents "duplicate" history entries
    if (history.state?.page !== pageId) {
        const newUrl = window.location.pathname + '#' + pageId;
        history.pushState({ page: pageId }, '', newUrl);
    }
}

// 3. Handle the "Back" and "Forward" buttons
window.addEventListener('popstate', (event) => {
    // If state exists (user pressed back), use it.
    // If not (user arrived here directly), check the URL hash.
    // If neither, default to 'home'.
    const pageId = event.state?.page || window.location.hash.substring(1) || 'home';
    
    // We strictly update the VIEW only, avoiding pushState to prevent loops
    updateViewOnly(pageId);
});

// 4. Handle Page Refresh (Initial Load)
window.addEventListener('DOMContentLoaded', () => {
    // Get the part of the URL after # (e.g., #skills)
    const hash = window.location.hash.substring(1);
    
    // If there is a hash, go there. Otherwise, home.
    const initialPage = validPages.includes(hash) ? hash : 'home';

    // Show the view immediately
    updateViewOnly(initialPage);
    
    // Replace the current history entry so the "Back" button works correctly later
    history.replaceState({ page: initialPage }, '', window.location.pathname + '#' + initialPage);
});

// -- HELPER FUNCTION --
// Updates the DOM classes without touching browser history
// (Used by popstate and initial load to avoid creating duplicate history entries)
function updateViewOnly(pageId) {
    if (!validPages.includes(pageId)) pageId = 'home';

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('.nav-btn, .home-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(`'${pageId}'`)) {
            btn.classList.add('active');
        }
    });
}

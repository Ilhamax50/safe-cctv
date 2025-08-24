// Site Statistics - Safe CCTV
// Menggunakan localStorage untuk menghindari masalah Firebase

// Update site views
function updateSiteViews() {
  const currentViews = parseInt(localStorage.getItem('site_views') || '0');
  const newViews = currentViews + 1;
  localStorage.setItem('site_views', newViews.toString());
  
  const viewsElement = document.getElementById('views-count');
  if (viewsElement) {
    viewsElement.textContent = newViews.toLocaleString();
  }
}

// Update site visitors
function updateSiteVisitors() {
  const visitorId = getVisitorId();
  const visitors = JSON.parse(localStorage.getItem('site_visitors') || '{}');
  
  if (!visitors[visitorId]) {
    visitors[visitorId] = {
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };
    localStorage.setItem('site_visitors', JSON.stringify(visitors));
    
    const totalVisitors = Object.keys(visitors).length;
    const visitorsElement = document.getElementById('visitors-count');
    if (visitorsElement) {
      visitorsElement.textContent = totalVisitors.toLocaleString();
    }
  }
}

// Get or create visitor ID
function getVisitorId() {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
}

// Display site statistics
function displaySiteStats() {
  const views = parseInt(localStorage.getItem('site_views') || '0');
  const visitors = JSON.parse(localStorage.getItem('site_visitors') || '{}');
  const totalVisitors = Object.keys(visitors).length;
  
  const viewsElement = document.getElementById('views-count');
  const visitorsElement = document.getElementById('visitors-count');
  
  if (viewsElement) {
    viewsElement.textContent = views.toLocaleString();
  }
  if (visitorsElement) {
    visitorsElement.textContent = totalVisitors.toLocaleString();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Update statistics
  updateSiteViews();
  updateSiteVisitors();
  
  // Display current statistics
  displaySiteStats();
}); 
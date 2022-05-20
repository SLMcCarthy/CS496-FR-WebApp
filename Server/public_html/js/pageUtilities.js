// Page Utilities
// Used to store simple functions used across most pages to avoid re-defining them in each pages script

// Convert Date to string format: Weekday Month Day Year (Eg: Mon Apr 11 2022)
function dateString(dateObj){ return new Date(dateObj).toDateString(); }

// Convert Date to string format: MM/DD/YYYY, Localtime (Eg: 4/11/2022, 8:30:00 PM)
function dateStringLocale(dateObj){ return new Date(dateObj).toLocaleString(); }

// Confirm with user when logging out
function confirmLogout(){ return window.confirm('Are you sure you want to log out?'); }

// Confirm with user when following external links (mainly links in expanded listings)
function confirmFollowLink(){ return window.confirm('Are you sure you want to leave this page?'); }

// Confirm with admin when deleting a user
function confirmDeleteUser(){ return window.confirm('Are you sure you want to delete this user?'); }
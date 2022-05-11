/* Page Utilities!
*  Used to store simple functions used across most pages to avoid re-defining them in the pages scripts
*/

// Convert Listing dates to more readable strings
const dateString = function(dateObj){ return new Date(dateObj).toDateString(); }

// Confirm with user when logging out
const confirmLogout = function(){ return window.confirm('Are you sure you want to log out?'); };

// Confirm with user when following expanded listing links
const confirmFollowLink = function() { return window.confirm('Are you sure you want to leave this page?'); };
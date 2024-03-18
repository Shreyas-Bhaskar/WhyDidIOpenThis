// Listen for when a tab is closed
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    // Convert the tab ID to a string because storage keys are strings
    const key = tabId.toString();

    // Use the key to remove the associated note from storage
    chrome.storage.local.remove(key, function() {
        console.log('Note removed for tabId:', tabId);
    });
});

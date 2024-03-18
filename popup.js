document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    let saveTimeout = null;

    // Save note after a short delay to reduce save frequency
    function debounceSave(noteContent) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => saveNoteForCurrentTab(noteContent), 500); // Delay set to 1 second
    }

    // Save the note for the current tab and send an update message to the content script
    function saveNoteForCurrentTab(noteContent) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentTab = tabs[0];
            if (currentTab && currentTab.url) {
                const noteKey = currentTab.url;
                chrome.storage.local.set({[noteKey]: noteContent}, function() {
                    console.log('Note saved for:', noteKey);
                    // Notify the content script to update the displayed note
                    chrome.tabs.sendMessage(currentTab.id, {action: "updateNote", note: noteContent});
                });
            }
        });
    }

    // Load and display the saved note for the current tab
    function loadNoteForCurrentTab() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const currentTab = tabs[0];
            if (currentTab && currentTab.url) {
                const noteKey = currentTab.url;
                chrome.storage.local.get(noteKey, function(result) {
                    if (result[noteKey]) {
                        noteInput.value = result[noteKey];
                        // Immediately send the current note to the content script
                        chrome.tabs.sendMessage(currentTab.id, {action: "updateNote", note: result[noteKey]});
                    }
                });
            }
        });
    }

    // Listen for input events on the textarea to trigger the save function
    noteInput.addEventListener('input', function() {
        debounceSave(noteInput.value);
    });

    loadNoteForCurrentTab();
});

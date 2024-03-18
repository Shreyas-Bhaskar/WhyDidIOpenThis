// Function to display or update the note on the webpage
function displayNote(note) {
    let noteContainer = document.getElementById('extension-note-container');
    if (!noteContainer) {
        noteContainer = document.createElement('div');
        noteContainer.id = 'extension-note-container';
        document.body.appendChild(noteContainer);
        styleNoteContainer(noteContainer);
    }
    noteContainer.textContent = note; // Update the note content
}

// Style the note container
function styleNoteContainer(container) {
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.backgroundColor = 'rgba(255, 255, 0, 0.9)';
    container.style.padding = '10px';
    container.style.borderRadius = '5px';
    container.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    container.style.zIndex = '10000';
    container.style.maxWidth = '300px';
    container.style.wordWrap = 'break-word';
    container.style.fontSize = '14px';
    container.style.color = '#000';
}

// Listen for messages from the popup script to update the note
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateNote") {
        displayNote(request.note);
    }
});
//make it so that a note window is opened upon entering any tab, be it a new note or saved note

// Optionally, load and display the note automatically when the content script runs
const currentURL = window.location.href;
chrome.storage.local.get(currentURL, function(result) {
    if (result[currentURL]) {
        displayNote(result[currentURL]);
    }
});

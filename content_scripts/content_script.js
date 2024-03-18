chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "displayNotes") {
        // Retrieve notes for the current tab and display them
        const notesKey = 'notes' + request.tabId.toString();
        chrome.storage.local.get([notesKey], function(result) {
            const notes = result[notesKey];
            if (notes && notes.length > 0) {
                displayNotesOnPage(notes);
            }
        });
    }
});

function displayNotesOnPage(notes) {
    // Ensure there's a container for the notes
    let notesContainer = document.getElementById('extension-notes-container');
    if (!notesContainer) {
        notesContainer = document.createElement('div');
        notesContainer.id = 'extension-notes-container';
        document.body.appendChild(notesContainer);
    }

    // Clear previous notes
    notesContainer.innerHTML = '';
    notesContainer.style.position = 'fixed';
    notesContainer.style.bottom = '20px';
    notesContainer.style.right = '20px';
    notesContainer.style.backgroundColor = 'lightyellow';
    notesContainer.style.padding = '10px';
    notesContainer.style.border = '1px solid black';
    notesContainer.style.zIndex = '1000';
    notesContainer.style.maxHeight = '300px';
    notesContainer.style.overflowY = 'auto';

    // Add each note to the container
    notes.forEach(function(note, index) {
        const noteElement = document.createElement('div');
        noteElement.textContent = `${index + 1}: ${note}`;
        notesContainer.appendChild(noteElement);
    });
}

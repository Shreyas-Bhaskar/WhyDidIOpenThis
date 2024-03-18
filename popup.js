document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('noteInput');
    const notesList = document.getElementById('notesList');
    let currentTabId = null;

    function saveNote() {
        const note = noteInput.value.trim();
        if (!note) return; // Don't save empty or whitespace-only notes

        const notesKey = 'notes' + currentTabId;
        chrome.storage.local.get([notesKey], function(result) {
            const existingNotes = result[notesKey] || [];
            existingNotes.push(note);
            chrome.storage.local.set({[notesKey]: existingNotes}, function() {
                noteInput.value = ''; // Clear input after saving
                displayNotes(existingNotes); // Update display
            });
        });
    }

    function displayNotes(notes) {
        notesList.innerHTML = ''; // Clear current notes display
        notes.forEach(note => {
            const noteElement = document.createElement('li');
            noteElement.textContent = note;
            notesList.appendChild(noteElement);
        });
    }

    // Listen for the Enter key in the textarea
    noteInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent newline
            saveNote();
        }
    });

    // Load and display notes for the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab) {
            currentTabId = currentTab.id;
            const notesKey = 'notes' + currentTabId;
            chrome.storage.local.get([notesKey], function(result) {
                const notes = result[notesKey] || [];
                displayNotes(notes);
            });
        }
    });

    function fetchAndDisplayNotes() {
        if (currentTabId === null) return; // Ensure we have the tab ID
        const notesKey = 'notes' + currentTabId;
        chrome.storage.local.get([notesKey], function(result) {
            const notes = result[notesKey] || [];
            displayNotes(notes);
        });
    }

    // Get the current tab ID
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const currentTab = tabs[0];
        if (currentTab) {
            currentTabId = currentTab.id;
            fetchAndDisplayNotes(); // Display notes for the current tab
        }
    });

});

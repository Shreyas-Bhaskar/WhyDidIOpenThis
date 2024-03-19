(function() {
    // Create a container for the note
    let noteContainer = document.createElement('div');
    noteContainer.id = 'extension-note-container';
    document.body.appendChild(noteContainer);
    styleNoteContainer(noteContainer);

    // Create a textarea inside the container for note taking
    let noteTextarea = document.createElement('textarea');
    noteTextarea.id = 'extension-note-textarea';
    noteTextarea.placeholder = 'Type your note here...';
    noteContainer.appendChild(noteTextarea);

    // Initially hide the textarea content until a note is loaded or started
    noteTextarea.style.display = 'none';

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
        container.style.width = '300px';
        container.style.height = '200px';
    }

    // Style the textarea
    noteTextarea.style.width = '100%';
    noteTextarea.style.height = '100%';
    noteTextarea.style.resize = 'none';

    // Function to save notes; debounce to limit frequency
    let saveTimeout;
    noteTextarea.addEventListener('input', () => {
        const noteContent = noteTextarea.value;
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveNote(noteContent);
        }, 1000); // Save note after 1 second of inactivity
    });

    // Function to save the note content
    function saveNote(noteContent) {
        chrome.storage.local.set({[window.location.href]: noteContent}, function() {
            console.log('Note saved.');
        });
    }

    // Load any existing note for the current page
    chrome.storage.local.get(window.location.href, function(result) {
        const savedNote = result[window.location.href];
        if (savedNote) {
            noteTextarea.style.display = '';
            noteTextarea.value = savedNote;
        } else {
            // Show the textarea even if there's no saved note, as per the new requirement
            noteTextarea.style.display = '';
        }
    });
})();

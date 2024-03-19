(function() {
    // Create the main container for the note and the minimize button
    let noteContainer = document.createElement('div');
    noteContainer.id = 'extension-note-container';
    document.body.appendChild(noteContainer);

    // Create a textarea for note taking
    let noteTextarea = document.createElement('textarea');
    noteTextarea.id = 'extension-note-textarea';
    noteTextarea.placeholder = 'Type your note here...';
    noteContainer.appendChild(noteTextarea);

    // Create a minimize button
    let minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';
    minimizeButton.id = 'extension-minimize-button';
    noteContainer.appendChild(minimizeButton);

    // Style the note container and its elements
    styleNoteContainer(noteContainer, noteTextarea, minimizeButton);

    // Toggle note container between minimized and expanded states
    minimizeButton.addEventListener('click', function() {
        if (noteTextarea.style.display !== 'none') {
            noteTextarea.style.display = 'none';
            noteContainer.style.width = '30px';
            noteContainer.style.height = '30px';
            noteContainer.style.backgroundColor = '#ffeb3b'; // Minimized box color
        } else {
            noteTextarea.style.display = '';
            noteContainer.style.width = '300px'; // Adjust based on your preference
            noteContainer.style.height = '200px';
            noteContainer.style.backgroundColor = 'rgba(255, 255, 0, 0.9)'; // Original color
        }
    });

    // Style the note container, textarea, and minimize button
    function styleNoteContainer(container, textarea, button) {
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

        textarea.style.width = '100%';
        textarea.style.height = 'calc(100% - 20px)'; // Account for button height
        textarea.style.resize = 'none';
        
        button.style.width = '20px';
        button.style.height = '20px';
        button.style.position = 'absolute';
        button.style.top = '5px';
        button.style.right = '5px';
        button.style.zIndex = '10001';
    }

    // Load and display the saved note for the current page
    chrome.storage.local.get(window.location.href, function(result) {
        const savedNote = result[window.location.href];
        if (savedNote) {
            noteTextarea.value = savedNote;
        }
    });
})();

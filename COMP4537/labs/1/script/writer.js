window.addEventListener('load', () => {
    const lastSavedSpan = document.getElementById('last-saved');
    loadNotes(true, lastSavedSpan);
});


const addButton = document.getElementById('add-button');
addButton.addEventListener('click', () => {
    const note = new Note(true);
    const notesContainer = document.getElementById('notes-container');
    note.addNoteTo(notesContainer);
    notes.push(note); 
});

setInterval(() => {
    saveNotesToLocalStorage(notes);
}, 2000);

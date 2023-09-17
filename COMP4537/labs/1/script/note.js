const notes = [];

class Note {
    constructor(isWriterMode = true) {
        this.noteDiv = document.createElement('div');
        this.textarea = document.createElement('textarea');
        this.isWriterMode = isWriterMode;
        this.noteId = Note.generateUniqueId();

        this.setupElements();
    }

    static generateUniqueId() {
        return Date.now() + Math.random().toString(36).substr(2, 9); // Generate a unique ID
    }

    setupElements() {
        this.noteDiv.className = "note-div";
        this.textarea.className = "note";

        this.noteDiv.appendChild(this.textarea);

        if (this.isWriterMode) {
            this.removeButton = document.createElement('button');
            this.removeButton.textContent = 'Remove';
            this.removeButton.id = 'remove-button';
            this.noteDiv.appendChild(this.removeButton);
            this.removeButton.addEventListener('click', () => {
                this.removeNote();
            });
        } else {
            this.textarea.setAttribute('disabled', 'true');
        }
    }

    addNoteTo(container) {
        container.appendChild(this.noteDiv);
    }

    removeNote() {
        if (this.noteDiv.parentElement) {
            this.noteDiv.parentElement.removeChild(this.noteDiv);
        }

        removeFromLocalStorage(this);

        const index = notes.indexOf(this);
        if (index !== -1) {
            notes.splice(index, 1);
        }
    }

    getText() {
        return this.textarea.value;
    }

    setText(text) {
        this.textarea.value = text;
    }
}

function removeFromLocalStorage(note) {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];
    const index = notesData.findIndex(savedNote => savedNote.text === note.getText());
    if (index !== -1) {
        notesData.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesData));
    }
}

function saveNotesToLocalStorage(notes) {
    const notesData = notes.map(note => {
        return {
            text: note.getText(),
            id: note.noteId 
        };
    });

    localStorage.setItem('notes', JSON.stringify(notesData));

    const lastSavedTime = document.getElementById('last-saved');
    const currentTime = new Date().toLocaleTimeString();
    lastSavedTime.textContent = currentTime;
}

function loadNotes(mode, element) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear existing content

    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    savedNotes.forEach(savedNote => {
        const note = new Note(mode); 
        note.setText(savedNote.text); 
        note.noteId = savedNote.id;

        note.addNoteTo(notesContainer);
        notes.push(note);
    });

    const now = new Date().toLocaleTimeString();
    element.textContent = now;
}

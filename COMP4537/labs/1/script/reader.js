const lastRetrievedTime = document.getElementById('last-retrieved');
loadNotes(false, lastRetrievedTime);

setInterval(() => {
    loadNotes(false, lastRetrievedTime);
}, 2000);

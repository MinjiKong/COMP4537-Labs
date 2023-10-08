function post() {
    const xhttp = new XMLHttpRequest();
    const word = document.getElementById("word").value;
    const definition = document.getElementById("definition").value;

    if (!word.match(/^[A-Za-z]+$/)) {
        alert("Please enter a valid word (only letters and spaces).");
    }

    const url = `https://apiworddefinition.onrender.com/api/definitions/?word=${word}&definition=${definition}`;
    
    const existingElements = ["msg", "newEntry", "linebreak"];
    existingElements.forEach((elementId) => {
        const existingElement = document.getElementById(elementId);
        if (existingElement) {
            existingElement.remove();
        }
    });

    xhttp.open("POST", url, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const responseJSON = JSON.parse(this.responseText);
                const message = document.createElement("text");
                message.id = "msg";
                message.textContent = `${responseJSON.requestNum} ${responseJSON.totalWords}`;
                message.style.color = "blue";
                const newEntry = document.createElement("text");
                newEntry.id = "newEntry";
                newEntry.textContent = `${responseJSON.newEntry}`;
                newEntry.style.color = "blue";
                const br = document.createElement("br");
                br.id = "linebreak";
                const form = document.getElementById("form");
                form.appendChild(message);
                form.appendChild(br);
                form.appendChild(newEntry);
            } else if (this.status == 401 || this.status == 404) {
                const responseJSON = JSON.parse(this.responseText);
                const error = document.createElement("text");
                error.id = "msg";
                error.textContent = responseJSON.error;
                error.style.color = "red";
                const form = document.getElementById("form");
                form.appendChild(error);
            };
        }
    }
}

function get() {
    const xhttp = new XMLHttpRequest();
    const wordInput = document.getElementById("word").value;

    if (!word.match(/^[A-Za-z]+$/)) {
        alert("Please enter a valid word (only letters and spaces).");
    }

    const url = `https://apiworddefinition.onrender.com/api/definitions/?word=${word}`;

    const existingMessage = document.getElementById("msg");
    if (existingMessage) {
        existingMessage.remove();
    }

    xhttp.open("GET", url, true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const responseJSON = JSON.parse(this.responseText);
                const message = document.createElement("text");
                message.id = "msg";
                message.textContent = `${responseJSON.requestNum}\n${responseJSON.word}: ${responseJSON.definition}`;
                message.style.color = "blue";
                const form = document.getElementById("form");
                form.appendChild(message);
            } else if (this.status == 404) {
                const responseJSON = JSON.parse(this.responseText);
                const error = document.createElement("text");
                error.id = "msg";
                error.textContent = responseJSON.error;
                error.style.color = "red";
                const form = document.getElementById("form");
                form.appendChild(error);
            } 
        }
    };
}

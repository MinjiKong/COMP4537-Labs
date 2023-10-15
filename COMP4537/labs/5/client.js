const xhttp = new XMLHttpRequest();

function insert() {
        const url = 'https://comp4537lab5.onrender.com/insertAll'

        const existingMessage = document.getElementById("msg");
        if (existingMessage) {
            existingMessage.remove();
        }

        xhttp.open("POST", url, true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4){
                const responseJSON = JSON.parse(this.responseText);
                const msg = document.createElement("text");
                msg.id = "msg";
                msg.textContent = `${responseJSON.message}`;
                msg.style.color = "blue";
                const post = document.getElementById("post");
                post.appendChild(msg);
        }
    }
}

function submit() {
    const query = document.getElementById("query").value;
    const url = `https://comp4537lab5.onrender.com/execute?query=${query}`;

    const existingMessage = document.getElementById("msg");
    if (existingMessage) {
        existingMessage.remove();
    }

    if (query.startsWith("INSERT")){
        xhttp.open("POST", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4){
                if (this.status == 200){
                    const responseJSON = JSON.parse(this.responseText);
                    const msg = document.createElement("text");
                    msg.id = "msg";
                    msg.textContent = `${responseJSON.message}`;
                    msg.style.color = "blue";
                    const execute = document.getElementById("execute");
                    execute.appendChild(msg);
                } else if (this.status == 401 || this.status == 404){
                    const responseJSON = JSON.parse(this.responseText);
                    const msg = document.createElement("text");
                    msg.id = "msg";
                    msg.textContent = `${responseJSON.sqlMessage}`;
                    msg.style.color = "red";
                    const execute = document.getElementById("execute");
                    execute.appendChild(msg);
                }
            }
        }
    } else if (query.startsWith("SELECT")){
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4){
                if (this.status == 200){
                    const msg = document.createElement("text");
                    msg.id = "msg";
                    msg.textContent = `${this.responseText}`;
                    const execute = document.getElementById("execute");
                    execute.appendChild(msg);
                } else if (this.status == 401 || this.status == 404){
                    const responseJSON = JSON.parse(this.responseText);
                    const msg = document.createElement("text");
                    msg.id = "msg";
                    msg.textContent = `${responseJSON.sqlMessage}`;
                    msg.style.color = "red";
                    const execute = document.getElementById("execute");
                    execute.appendChild(msg);
                }   
            }
        }
    } else {
        xhttp.open("GET", url, true);
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4){
                if (this.status == 401 || this.status == 404){
                    const responseJSON = JSON.parse(this.responseText);
                    const msg = document.createElement("text");
                    msg.id = "msg";
                    msg.textContent = `${responseJSON.sqlMessage}`;
                    msg.style.color = "red";
                    console.log(this.responseText);
                    const execute = document.getElementById("execute");
                    execute.appendChild(msg);
                }   
            }
        }
    }
}
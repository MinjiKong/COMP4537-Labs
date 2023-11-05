function addOptionsToDropdown(dropdown, languages) {
  languages.forEach((language) => {
    const option = new Option(language.name, language.code);
    dropdown.add(option);
  });
}

// Check if this is the 'write.html' page
if (document.location.href.includes("write.html")) {
    fetch(langUrl)
      .then((response) => response.json())
      .then((data) => {
        const wLanguage = document.getElementById('word-language');
        const dLanguage = document.getElementById('def-language');
        addOptionsToDropdown(wLanguage, data.languages);
        addOptionsToDropdown(dLanguage, data.languages);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Add an event listener to the "Submit" button
    const saveButton = document.getElementById("submit");
    if (saveButton) {
      saveButton.addEventListener("click", save);
    }

    const existingMessage = document.getElementById("msg");
    if (existingMessage) {
        existingMessage.remove();
    }

    function save() {
        const existingMessage = document.getElementById("msg");
        if (existingMessage) {
            existingMessage.remove();
        }

        const word = document.getElementById('word').value;
        const wordLanguage = document.getElementById('word-language').value;
        const definition = document.getElementById('definition').value;
        const defLanguage = document.getElementById('def-language').value;
        
        fetch(`${url}definition/${word}`)
          .then((response) => {
            if (response.status === 200) {
              const confirmUpdate = window.confirm(prompt);
              if (confirmUpdate) {
                return fetch(`${url}definition/${word}`, {
                  method: PATCH,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    word,
                    definition,
                    wordLanguage,
                    defLanguage,
                  }),
                })
                .then((response) => {
                    if (response.status === 400 || response.status === 404) {
                        return response.json().then((errorData) => {
                        const msg = document.createElement("p");
                        msg.id = "msg";
                        msg.style.color = "red";
                        msg.textContent = `${errorData.message} ${entries} ${errorData.total}` || `${errorData.error} ${entries} ${errorData.total}`;
                        const definition = document.getElementById("form");
                        definition.appendChild(msg);
                        });
                    } else {
                        return response.json().then((data) => {
                            const msg = document.createElement("text");
                            msg.id = "msg";
                            msg.style.color = "blue";
                            msg.textContent = `${JSON.stringify(data.message)} ${entries} ${JSON.stringify(data.total)}`;
                            const definition = document.getElementById("form");
                            definition.appendChild(msg);
                            });
                    }
                    })
              } 
            } else if (response.status === 404) {
              return fetch(postUrl, {
                method: POST,
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  word,
                  wordLanguage,
                  definition,
                  defLanguage,
                }),
              })
              .then((response) => {
                if (response.status === 400 || response.status === 404 || response.status === 409) {
                    return response.json().then((errorData) => {
                    const msg = document.createElement("p");
                    msg.id = "msg";
                    msg.style.color = "red";
                    msg.textContent = `${errorData.message} ${entries} ${errorData.total}`;
                    const definition = document.getElementById("form");
                    definition.appendChild(msg);
                    });
                } else {
                    return response.json().then((data) => {
                        const msg = document.createElement("p");
                        msg.id = "msg";
                        msg.style.color = "blue";
                        msg.textContent = `${JSON.stringify(data.message)} ${entries} ${JSON.stringify(data.total)}`;
                        const definition = document.getElementById("form");
                        definition.appendChild(msg);
                        });
                }
                })
            } else {
                return response.json().then((errorData) => {
                    const msg = document.createElement("p");
                    msg.id = "msg";
                    msg.style.color = "red";
                    msg.textContent = `${errorData.message} ${entries} ${errorData.total}`;
                    const definition = document.getElementById("form");
                    definition.appendChild(msg);
                    });
            }
          })
      }
    }      
      
// Check if this is the 'search.html' page
if (document.location.href.includes("search.html")) {
    
// Add an event listener to the "Search" button
const searchButton = document.getElementById("search");
if (searchButton) {
    searchButton.addEventListener("click", find);
}

const deleteButton = document.getElementById("delete");
if (deleteButton) {
    deleteButton.addEventListener("click", remove);
}

function find() {
    const existingMessage = document.getElementById("msg");
    if (existingMessage) {
        existingMessage.remove();
    }

    const word = document.getElementById('word').value;
    fetch(`${url}definition/${word}`)
        .then((response) => {
        if (response.status === 400) {
            return response.json().then((errorData) => {
            const msg = document.createElement("p");
            msg.id = "msg";
            msg.style.color = "red";
            msg.textContent = errorData.message;
            const definition = document.getElementById("form");
            definition.appendChild(msg);
            });
        } else if (response.status === 404) {
            return response.json().then((errorData) => {
                const msg = document.createElement("p");
                msg.id = "msg";
                msg.style.color = "red";
                msg.textContent = errorData.error;
                const definition = document.getElementById("form");
                definition.appendChild(msg);
                });
        } else {
            return response.json().then((data) => {
                const msg = document.createElement("p");
                msg.id = "msg";
                msg.style.color = "blue";
                msg.textContent = JSON.stringify(data.definition);
                const definition = document.getElementById("form");
                definition.appendChild(msg);
                });
        }
        })
    }

    function remove() {
        const existingMessage = document.getElementById("msg");
        if (existingMessage) {
            existingMessage.remove();
        }
        const word = document.getElementById('word').value;
        fetch(`${url}definition/${word}`, {
            method: DELETE,
        })
            .then((response) => {
            if (response.status === 400) {
                return response.json().then((errorData) => {
                const msg = document.createElement("p");
                msg.id = "msg";
                msg.style.color = "red";
                msg.textContent = `${errorData.message} ${entries} ${errorData.total}`;
                const definition = document.getElementById("form");
                definition.appendChild(msg);
                });
            } else if(response.status === 404) {
                return response.json().then((errorData) => {
                    const msg = document.createElement("p");
                    msg.id = "msg";
                    msg.style.color = "red";
                    msg.textContent = `${errorData.error} ${entries} ${errorData.total}`;
                    const definition = document.getElementById("form");
                    definition.appendChild(msg);
                    });
            } else {
                return response.json().then((data) => {
                    const msg = document.createElement("p");
                    msg.id = "msg";
                    msg.style.color = "blue";
                    msg.textContent = `${JSON.stringify(data.message)} ${entries} ${JSON.stringify(data.total)}`;
                    const definition = document.getElementById("form");
                    definition.appendChild(msg);
                    });
            }
        })
    }
}

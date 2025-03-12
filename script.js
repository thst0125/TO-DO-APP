// Hent referanser til HTML-elementene
const addButton = document.getElementById("addButton");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Hent lagrede oppgaver fra localStorage
function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach((todo) => addTodo(todo.text, todo.completed));
}

// Lagre oppgaver i localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll("li").forEach((li) => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Funksjon for å legge til en ny oppgave
function addTodo(text = todoInput.value, completed = false) {
  if (text.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = text;

    // Klikk for å markere som fullført
    li.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTodos();
    });

    // Opprett slett-knapp
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "remove";
    deleteButton.style.marginLeft = "10px";
    deleteButton.style.cursor = "pointer";

    // Legg til funksjonalitet for å slette oppgaven
    deleteButton.addEventListener("click", function () {
      li.remove();
      saveTodos();
    });

    // Legg slett-knappen til i listeelementet
    li.appendChild(deleteButton);

    // Sjekk om oppgaven er fullført
    if (completed) {
      li.classList.add("completed");
    }

    // Legg listeelementet til i listen
    todoList.appendChild(li);

    // Tøm input-feltet og lagre oppgavene
    todoInput.value = "";
    saveTodos();
  } else {
    alert("Please enter a task.");
  }
}

// Last oppgaver når siden lastes
loadTodos();

// Legg til klikk-hendelse på "Legg til"-knappen
addButton.addEventListener("click", function () {
  addTodo();
});

// Lytt etter Enter-tasten i input-feltet
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Hindrer at skjemaet sender inn
    addTodo();
  }
});

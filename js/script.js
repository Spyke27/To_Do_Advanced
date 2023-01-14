// Elements Selections

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Functions

// Function to save note

const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");
  
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
  
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);
  
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);
  
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);
  
    todoList.appendChild(todo);
  
    todoInput.value = "";

    todoInput.focus();
  };

  // Function Hide 

  const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
  };

  // Function Update Notes

  const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText == oldInputValue){
            todoTitle.innerText = text;
        }
    })
  };

  // Function Search for Notes
  const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        const searchLowerCase = search.toLowerCase();

        todo.style.display = "flex";

        if(!todoTitle.includes(searchLowerCase)){
          todo.style.display = "none";
        }
    })
  }

// Eventos ----------------------------------------------------------------------

//Event Add new Note

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const inputValue = todoInput.value;
  
    if (inputValue) {
      saveTodo(inputValue);
    }
  });

  //Event Update Notes

  document.addEventListener("click", (e)=> {
    const targetElement = e.target;
    const parentElement = targetElement.closest("div");
    let todoTitle;
        // Verification New Note Title 
    if(parentElement && parentElement.querySelector("h3")){
        todoTitle = parentElement.querySelector("h3").innerText;
    }
        // Add Notes
    if(targetElement.classList.contains("finish-todo")){
        parentElement.classList.toggle("done")
    }
        // Edit Notes
    if(targetElement.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
        // Delete Notes
    if(targetElement.classList.contains("remove-todo")){
        parentElement.remove();
    }
  });

  // Event Cancel Editions

  cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
  })

  // Event to Edit Notes
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
  });

  searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchTodos(search);
  })
  //Erase Search Input
  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
  });
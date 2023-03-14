let form = document.querySelector("#todo-form");
let todoinput = document.querySelector("#todo");
let todolist = document.querySelector(".list-group");
let firstCardBody = document.querySelectorAll(".card-body")[0];
let secondCardBody = document.querySelectorAll(".card-body")[1];
let filter = document.querySelector("#filter");
let clearbutton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearbutton.addEventListener("click",clearAll);
}
function clearAll(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz?")){
        //todolist.innerHTML=""; //yavaş çözüm
        while(todolist.firstElementChild != null){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}
function filterTodos(e) {
    let filterValue = e.target.value.toLowerCase();
    let listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function (listItem) {
        let text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none !important");
        } else {
            listItem.setAttribute("style", "display:block");
        }
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "To Do başarıyla silindi.");
    }
}

function addTodo(e) {
    let newTodo = todoinput.value.trim();

    if (newTodo == "") {
        showAlert("danger", "Bir To Do yazınız.")

    } else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success", "To Do başarıyla oluşturuldu.")
    }

    e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); //arrayden değer silme
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
//alert oluşturma
function showAlert(type, message) {
    let alert = document.createElement("div")
    alert.className = `alert alert-${type} `;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function () {
        alert.remove();
    }, 1500);
}

function getTodosFromStorage() { //storageden todoları alma
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}

function addTodoToUI(newTodo) {
    // < li class = "list-group-item d-flex justify-content-between" >
    //     Todo 1 < ------------------------------------------------------------>>TEXT NODE
    //     a href = "#"
    // class = "delete-item" >
    //     <
    //     i class = "fa fa-remove" > < /i> <
    //     /a>

    //     <
    //     /li>
    let listItem = document.createElement("li");
    let link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";
    //Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    //todo liste lis itemı ekleme
    todolist.appendChild(listItem);
}
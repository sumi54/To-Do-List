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
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
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
//alert oluşturma
function showAlert(type, message) {
    let alert = document.createElement("div")
    alert.className = `alert alert-${type} `;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function () {
            alert.remove();      
    },1500);
}
function getTodosFromStorage(){//storageden todoları alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStorage(newTodo){
    let todos =getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos=getTodosFromStorage();
    todos.forEach(function(todo){
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
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
}

function addTodo(e) {
    let newTodo = todoinput.value.trim();
    addTodoToUI(newTodo);
    e.preventDefault();
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
    let listItem=document.createElement("li");
    let link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class='fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";
    //Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    //todo liste lis itemı ekleme
    todolist.appendChild(listItem);
}
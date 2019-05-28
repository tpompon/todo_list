function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArr = decodedCookie.split(';');
  for (let i = 0; i < cArr.length; i++) {
    let c = cArr[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function initTodoList() {
  const todoList = document.getElementById('ft_list');
  let todoInput = document.getElementById('todo-input');
  let c = getCookie('todoListHTML');
  todoList.innerHTML = c;
  todoInput.value = '';
}

function updateTodoListCookie(innerHTML) {
  let d = new Date();
  d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = 'todoListHTML=' + innerHTML + ";" + expires + ";path=/";
}

function deleteTodo(todo) {
  const todoList = document.getElementById('ft_list');
  if (confirm("Are you sure you want to delete this 'To-Do' ?")) {
    todo.remove();
    updateTodoListCookie(todoList.innerHTML);
  }
}

function addTodo() {
  const todoList = document.getElementById('ft_list');

  let spanTodo = document.createElement("span");
  let spanDelete = document.createElement("span");

  let todoInput = document.getElementById('todo-input');
  let todoTextNode = document.createTextNode(todoInput.value);

  let deleteTextNode = document.createTextNode('DELETE');

  if (todoInput.value) {
    spanTodo.className += 'todo-text';
    spanTodo.appendChild(todoTextNode);

    spanDelete.className += 'delete-it';
    spanDelete.appendChild(deleteTextNode);

    let div = document.createElement("div");

    div.className += 'todo';
    div.setAttribute("onclick", "deleteTodo(this)");
    div.appendChild(spanTodo);
    div.appendChild(spanDelete);
    todoList.insertBefore(div, todoList.getElementsByClassName('todo')[0]);

    todoInput.value = '';

    updateTodoListCookie(todoList.innerHTML);
  }
}

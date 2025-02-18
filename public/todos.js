const TODOS_KEY = 'todos';

export function getTodos() {
  return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
}

export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function addTodo(title, date) {
  const todos = getTodos();
  todos.push({ id: Date.now(), title, date });
  saveTodos(todos);
}

export function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  saveTodos(todos);
}

export function renderTodos() {
  const todos = getTodos();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = `${todo.title} - ${todo.date}`;
    li.dataset.cy = 'todo-item';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.action = 'delete';
    deleteButton.dataset.id = todo.id;

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

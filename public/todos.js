const TODOS_KEY = 'todos';

export function getTodos() {
  return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
}

export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function addTodo(title, date) {
  const todos = getTodos();
  todos.push({ id: Date.now(), title, date, completed: false });
  saveTodos(todos.sort((a, b) => new Date(a.date) - new Date(b.date)));
}

export function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  saveTodos(todos);
}

export function toggleTodoCompletion(id) {
  let todos = getTodos();
  todos = todos.map(todo => 
    todo.id === parseInt(id) ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos(todos);
}

export function editTodo(id, newTitle) {
  let todos = getTodos();
  todos = todos.map(todo => 
    todo.id === parseInt(id) ? { ...todo, title: newTitle } : todo
  );
  saveTodos(todos);
}

export function renderTodos() {
  const todos = getTodos();
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  
  todos.forEach((todo) => {
    const card = document.createElement('div');
    card.classList.add('todo-card');
    
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = todo.title;
    titleInput.disabled = true;
    titleInput.classList.add('todo-title');
    
    const dateSpan = document.createElement('span');
    dateSpan.textContent = todo.date;
    dateSpan.classList.add('todo-date');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.dataset.action = 'edit';
    editButton.dataset.id = todo.id;
    editButton.addEventListener('click', () => {
      if (titleInput.disabled) {
        titleInput.disabled = false;
        titleInput.focus();
        editButton.textContent = 'Save';
      } else {
        editTodo(todo.id, titleInput.value);
        titleInput.disabled = true;
        editButton.textContent = 'Edit';
        renderTodos();
      }
    });

    const toggleButton = document.createElement('button');
    toggleButton.textContent = todo.completed ? 'Undo' : 'Complete';
    toggleButton.dataset.action = 'toggle';
    toggleButton.dataset.id = todo.id;
    toggleButton.addEventListener('click', () => {
      toggleTodoCompletion(todo.id);
      renderTodos();
    });
    
    if (todo.completed) {
      card.classList.add('completed');
    }
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.dataset.action = 'delete';
    deleteButton.dataset.id = todo.id;
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo.id);
      renderTodos();
    });
    
    card.appendChild(titleInput);
    card.appendChild(dateSpan);
    card.appendChild(editButton);
    card.appendChild(toggleButton);
    card.appendChild(deleteButton);
    todoList.appendChild(card);
  });
}

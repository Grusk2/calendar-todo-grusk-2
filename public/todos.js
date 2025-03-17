const TODOS_KEY = 'todos';

export function getTodos() {
  return JSON.parse(localStorage.getItem(TODOS_KEY)) || [];
}

export function saveTodos(todos) {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

export function addTodo(title, date) {
  const todos = getTodos();

  const newTodo = {
    id: Date.now(),
    title,
    date,
    completed: false
  };

  todos.push(newTodo);
  saveTodos(todos);

  renderTodos();
  updateCalendarTodos();
}


export function deleteTodo(todoId) {
  let todos = getTodos();
  todos = todos.filter(todo => todo.id !== todoId);
  saveTodos(todos);

  renderTodos();
  updateCalendarTodos();
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

    // Kebab Menu Button (⋮)
    const menuButton = document.createElement('button');
    menuButton.textContent = '⋮';
    menuButton.classList.add('kebab-menu-button');

    // Dropdown Menu
    const menuDropdown = document.createElement('div');
    menuDropdown.classList.add('kebab-menu-dropdown');
    menuDropdown.style.display = 'none';

    // Edit Option
    const editOption = document.createElement('button');
    editOption.textContent = 'Edit';
    editOption.classList.add('dropdown-option');
    editOption.addEventListener('click', () => {
      if (titleInput.disabled) {
        titleInput.disabled = false;
        titleInput.focus();
        editOption.textContent = 'Save';
      } else {
        editTodo(todo.id, titleInput.value);
        titleInput.disabled = true;
        editOption.textContent = 'Edit';
        renderTodos();
      }
      menuDropdown.style.display = 'none';
      updateCalendarTodos();
    });

    // Delete Option
    const deleteOption = document.createElement('button');
    deleteOption.textContent = 'Delete';
    deleteOption.classList.add('dropdown-option');
    deleteOption.addEventListener('click', () => {
      deleteTodo(todo.id);
      renderTodos();
      updateCalendarTodos();
    });

    // Toggle Dropdown Visibility
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (event) => {
      if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = 'none';
      }
    });

    menuDropdown.appendChild(editOption);
    menuDropdown.appendChild(deleteOption);

    const menuContainer = document.createElement('div');
    menuContainer.classList.add('kebab-menu-container');
    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(menuDropdown);

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = todo.title;
    titleInput.disabled = true;
    titleInput.classList.add('todo-title');

    const dateSpan = document.createElement('span');
    dateSpan.textContent = todo.date;
    dateSpan.classList.add('todo-date');

    const toggleButton = document.createElement('button');
    toggleButton.textContent = todo.completed ? 'Undo' : 'Complete';
    toggleButton.dataset.id = todo.id;
    toggleButton.addEventListener('click', () => {
      toggleTodoCompletion(todo.id);
      renderTodos();
      updateCalendarTodos();
    });

    if (todo.completed) {
      card.classList.add('completed');
    }

    card.appendChild(menuContainer);
    card.appendChild(titleInput);
    card.appendChild(dateSpan);
    card.appendChild(toggleButton);
    
    todoList.appendChild(card);
  });

  updateCalendarTodos();
}


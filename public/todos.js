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
      menuDropdown.style.display = 'none'; // Hide dropdown after action
    });

    // Delete Option
    const deleteOption = document.createElement('button');
    deleteOption.textContent = 'Delete';
    deleteOption.classList.add('dropdown-option');
    deleteOption.addEventListener('click', () => {
      deleteTodo(todo.id);
      renderTodos();
    });

    // Toggle Dropdown Visibility
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent closing immediately
      menuDropdown.style.display = menuDropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = 'none';
      }
    });

    // Append Dropdown Menu Options
    menuDropdown.appendChild(editOption);
    menuDropdown.appendChild(deleteOption);

    // Container for Menu
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('kebab-menu-container');
    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(menuDropdown);

    // Todo Title
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = todo.title;
    titleInput.disabled = true;
    titleInput.classList.add('todo-title');

    // Todo Date
    const dateSpan = document.createElement('span');
    dateSpan.textContent = todo.date;
    dateSpan.classList.add('todo-date');

    // Mark as completed
    const toggleButton = document.createElement('button');
    toggleButton.textContent = todo.completed ? 'Undo' : 'Complete';
    toggleButton.dataset.id = todo.id;
    toggleButton.addEventListener('click', () => {
      toggleTodoCompletion(todo.id);
      renderTodos();
    });

    if (todo.completed) {
      card.classList.add('completed');
    }

    // Append Elements
    card.appendChild(menuContainer); // Add menu in top-right
    card.appendChild(titleInput);
    card.appendChild(dateSpan);
    card.appendChild(toggleButton);
    
    todoList.appendChild(card);
  });
}

import { renderCalendar, updateCalendarTodos } from './calender.js';

import { renderTodos, addTodo, deleteTodo, toggleTodoCompletion, editTodo } from './todos.js';

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const selectedDayDisplay = document.getElementById('selected-day-display');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function initializeApp() {
  renderCalendar(currentMonth, currentYear);
  renderTodos();
  updateCalendarTodos();
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('todo-title').value.trim();
  const selectedDate = selectedDayDisplay.dataset.selectedDate;

  if (!selectedDate) {
    alert('Välj en dag i kalendern först!');
    return;
  }

  if (title) {
    addTodo(title, selectedDate);
    renderTodos();
    updateCalendarTodos();
    localStorage.setItem('selectedDate', selectedDate);
    todoForm.reset();
  }
});

document.getElementById('todo-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-todo')) {
      const todoId = parseInt(e.target.dataset.todoId, 10);
      deleteTodo(todoId);
      updateCalendarTodos();
  }
});



initializeApp();

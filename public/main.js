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
  const title = document.getElementById('todo-title').value;
  const selectedDate = selectedDayDisplay.dataset.selectedDate;

  if (!selectedDate) {
    alert('Välj en dag i kalendern först!');
    return;
  }

  if (title) {
    addTodo(title, selectedDate);
    renderTodos();
    updateCalendarTodos();
    todoForm.reset();
  }
});

initializeApp();

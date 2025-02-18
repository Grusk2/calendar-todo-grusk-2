import { renderCalendar, updateCalendarTodos } from './calender.js';
import { renderTodos, addTodo, deleteTodo, toggleTodoCompletion, editTodo } from './todos.js';

// Hämta HTML-element
const currentDateElement = document.getElementById('current-date');
const currentDayElement = document.getElementById('current-day');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

currentDateElement.textContent = today.toISOString().split('T')[0]; // YYYY-MM-DD format
currentDayElement.textContent = today.toLocaleDateString(undefined, { weekday: 'long' });

// Initial rendering
function initializeApp() {
  renderCalendar(currentMonth, currentYear);
  renderTodos();
  updateCalendarTodos();
}

// Hantera todo-formulär
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('todo-title').value;
  const date = document.getElementById('todo-date').value;

  if (title && date) {
    addTodo(title, date);
    renderTodos();
    updateCalendarTodos();
    todoForm.reset();
  }
});

// Hantera klick på todos (edit, complete, delete)
todoList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;

  if (!id) return;

  if (e.target.dataset.action === 'delete') {
    deleteTodo(id);
  } else if (e.target.dataset.action === 'toggle') {
    toggleTodoCompletion(id);
  } else if (e.target.dataset.action === 'edit') {
    const newTitle = prompt('Enter new title:');
    if (newTitle) {
      editTodo(id, newTitle);
    }
  }
  
  renderTodos();
  updateCalendarTodos();
});

// Hantera månadsknappar
prevMonthButton.addEventListener('click', () => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
  updateCalendarTodos();
});

nextMonthButton.addEventListener('click', () => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
  updateCalendarTodos();
});

initializeApp();

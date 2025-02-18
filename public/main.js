import { renderCalendar, updateCalendarTodos } from './calender.js'; 
import { renderTodos, addTodo, deleteTodo } from './todos.js';

const currentDateElement = document.getElementById('current-date');
const currentDayElement = document.getElementById('current-day');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

currentDateElement.textContent = today.toLocaleDateString();
currentDayElement.textContent = today.toLocaleDateString(undefined, { weekday: 'long' });

function initializeApp() {
  renderCalendar(currentMonth, currentYear);
  renderTodos();
  updateCalendarTodos();
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('todo-title').value;
  const date = document.getElementById('todo-date').value;

  addTodo(title, date);
  renderTodos();
  updateCalendarTodos();
  todoForm.reset();
});

todoList.addEventListener('click', (e) => {
  if (e.target.dataset.action === 'delete') {
    deleteTodo(e.target.dataset.id);
    renderTodos();
    updateCalendarTodos();
  }
});

prevMonthButton.addEventListener('click', () => {
  ({ currentMonth, currentYear } = changeMonth(currentMonth, currentYear, -1));
  renderCalendar(currentMonth, currentYear);
  updateCalendarTodos();
});

nextMonthButton.addEventListener('click', () => {
  ({ currentMonth, currentYear } = changeMonth(currentMonth, currentYear, 1));
  renderCalendar(currentMonth, currentYear);
  updateCalendarTodos();
});

initializeApp();

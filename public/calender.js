import { getTodos } from './todos.js';

const calendarBody = document.getElementById('calendar-body');
const currentMonthElement = document.getElementById('current-month');

const daysOfWeek = ['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'];

export function renderCalendar(month, year) {
  calendarBody.innerHTML = '';
  currentMonthElement.textContent = new Date(year, month).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

  // Skapa en container för veckodagar
  const headerRow = document.createElement('div');
  headerRow.classList.add('calendar-header-row');
  calendarBody.appendChild(headerRow);

  daysOfWeek.forEach(day => {
    const dayHeader = document.createElement('div');
    dayHeader.classList.add('calendar-header');
    dayHeader.textContent = day;
    headerRow.appendChild(dayHeader);
  });

  const daysContainer = document.createElement('div');
  daysContainer.classList.add('calendar-days');
  calendarBody.appendChild(daysContainer);

  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-cell', 'empty');
    daysContainer.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    cell.dataset.cy = 'calendar-cell';

    const dateSpan = document.createElement('span');
    dateSpan.textContent = day;
    dateSpan.dataset.cy = 'calendar-cell-date';

    const todoCount = document.createElement('span');
    todoCount.dataset.cy = 'calendar-cell-todos';

    if (isCurrentMonth && day === today.getDate()) {
      cell.classList.add('current-day');
    }

    cell.appendChild(dateSpan);
    cell.appendChild(todoCount);
    daysContainer.appendChild(cell);
  }
}

export function updateCalendarTodos() {
  const todos = getTodos();
  const cells = document.querySelectorAll('[data-cy="calendar-cell"]');

  cells.forEach((cell) => {
    const date = cell.querySelector('[data-cy="calendar-cell-date"]').textContent;
    const monthYear = currentMonthElement.textContent;
    const fullDate = new Date(`${monthYear} ${date}`).toISOString().split('T')[0];

    const todosForDate = todos.filter((todo) => todo.date === fullDate);
    const todoCount = cell.querySelector('[data-cy="calendar-cell-todos"]');
    todoCount.textContent = todosForDate.length ? `(${todosForDate.length})` : '';
  });
}

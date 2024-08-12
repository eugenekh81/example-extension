import { loadFilterValue, saveFilterValue } from './src/storage.js';
import { setupCalendarLink } from './src/calendar.js';
import { createLinks } from './src/links.js';
import { execScript } from './src/filter.js';

document.addEventListener('DOMContentLoaded', () => {
  loadFilterValue();
  setupCalendarLink();
  createLinks();
});

const input = document.getElementById('filter');
const filterBtn = document.getElementById('filterBtn');

filterBtn.addEventListener('click', () => {
  const query = input.value;
  saveFilterValue(query);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    if (tab) {
      execScript(tab, query);
    } else {
      alert('There are no active tabs');
    }
  });
});

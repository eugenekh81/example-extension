import { loadFilterValue, saveFilterValue } from './src/storage.js';
import { setupCalendarLink } from './src/calendar.js';
import { createLists } from './src/links.js';
import { execScript, handleEnterKey } from './src/filter.js';

document.addEventListener('DOMContentLoaded', () => {
  loadFilterValue();
  setupCalendarLink();
  createLists();
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

input.addEventListener('keydown', (event) => {
  handleEnterKey(event, () => {
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
});


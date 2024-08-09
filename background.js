document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('filter');
  const storedValue = localStorage.getItem('filterValue');

  if (storedValue) {
    input.value = storedValue; // Corrected variable name
  }
});

const input = document.getElementById('filter');
const filterBtn = document.getElementById('filterBtn');

filterBtn.addEventListener('click', () => {
  const query = input.value;
  localStorage.setItem('filterValue', query);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let tab = tabs[0];
    if (tab) {
      execScript(tab, query);
    } else {
      alert('There are no active tabs');
    }
  });
});

function execScript(tab, query) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: filter,
      args: [query],
    }
  );
}

function filter(query) {
  const cssInvisibleModifier = "bs-item--invisible";
  let filterMatcher = new RegExp(`.*${query}.*`, "i");

  document.querySelectorAll("." + cssInvisibleModifier).forEach((i) => {
    i.classList.remove(cssInvisibleModifier);
  });

  if (query) {
    document.querySelectorAll(".fc-event-title").forEach((i) => {
      if (!filterMatcher.test(i.innerText)) {
        i.parentElement.parentElement.classList.add(cssInvisibleModifier);
      }
    });
  }
}

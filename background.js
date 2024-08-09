document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('filter');
  const storedValue = localStorage.getItem('filterValue');

  if (storedValue) {
    input.value = storedValue;
  }
});

const calendarLink = document.getElementById('calendarLink');
const hammerProdLink = document.getElementById('hammerProdLink');
const hammerStageLink = document.getElementById('hammerStageLink');
const hammerDevLink = document.getElementById('hammerDevLink');
const schlauProdLink = document.getElementById('schlauProdLink');

calendarLink.addEventListener('click', (e) => {
  e.preventDefault();
  const url = "https://confluence.brueder-schlau.de/display/IT/calendars";
  chrome.tabs.create({ url });
});

hammerProdLink.addEventListener('click', (e) => {
  e.preventDefault();
  const url = "https://www.hammer-zuhause.de/";
  chrome.tabs.create({ url });
});

hammerStageLink.addEventListener('click', (e) => {
  e.preventDefault();
  const url = "https://www.stage.hammer-zuhause.de/";
  chrome.tabs.create({ url });
});

hammerDevLink.addEventListener('click', (e) => {
  e.preventDefault();
  const url = "https://local.hammer-zuhause.de:9002/schlaub2cstorefront/";
  chrome.tabs.create({ url });
});

schlauProdLink.addEventListener('click', (e) => {
  e.preventDefault();
  const url = "https://www.schlau-grosshandel.de/";
  chrome.tabs.create({ url });
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

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('filter');
  const storedValue = localStorage.getItem('filterValue');

  if (storedValue) {
    input.value = storedValue;
  }
});

const calendarLink = document.getElementById('calendarLink');
calendarLink.addEventListener('click', (e) => {
  e.preventDefault();
  const url = "https://confluence.brueder-schlau.de/display/IT/calendars";
  chrome.tabs.create({ url });
});

const linksData = [
  { id: 'hammerProdLink', text: 'Hammer Prod', url: 'https://www.hammer-zuhause.de/' },
  { id: 'hammerStageLink', text: 'Hammer Stage', url: 'https://www.stage.hammer-zuhause.de/' },
  { id: 'hammerDevLink', text: 'Hammer Dev', url: 'https://local.hammer-zuhause.de:9002/schlaub2cstorefront/' },
  { id: 'schlauProdLink', text: 'Schlau Prod', url: 'https://www.schlau-grosshandel.de/' },
  { id: 'schlauStageLink', text: 'Schlau Stage', url: 'https://www.stage.schlau-grosshandel.de/' },
  { id: 'schlauDevLink', text: 'Schlau Dev', url: 'https://local.hammer-zuhause.de:9002/schlaustorefront/' },
  { id: 'schlauProdLink', text: 'Schlau Prod', url: 'https://www.schlau-grosshandel.de/' },
  { id: 'backofficeStage', text: 'Backoffice Stage', url: 'https://hybris-cockpits.stage.brueder-schlau.de/backoffice/login.zul' },
  { id: 'backofficeDev', text: 'Backoffice Dev', url: 'https://local.hammer-zuhause.de:9002/backoffice' },
  { id: 'cheatSheet', text: 'eCommerce CheatSheet', url: 'https://confluence.brueder-schlau.de/display/EC/eCommerce+CheatSheet' }
];

function createLinks() {
  linksData.forEach(linkData => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = linkData.text;
    link.id = linkData.id;
    link.className = 'link';

    link.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: linkData.url });
    });

    listItem.appendChild(link);

    linksList.appendChild(listItem);
  });
}

createLinks();

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

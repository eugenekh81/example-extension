export function setupCalendarLink() {
    const calendarLink = document.getElementById('calendarLink');
    calendarLink.addEventListener('click', (e) => {
      e.preventDefault();
      const url = "https://confluence.brueder-schlau.de/display/IT/calendars";
      chrome.tabs.create({ url });
    });
  }
  
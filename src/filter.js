export function execScript(tab, query) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: filter,
      args: [query],
    });
  }
  
  export function filter(query) {
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
  
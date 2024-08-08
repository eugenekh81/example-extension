const input = document.getElementById('filter');
const filterBtn = document.getElementById('filterBtn');
filterBtn.addEventListener('click', () => {
  const query = input.value;
  console.log(query, ' this is query');
  // Получить активную вкладку браузера
  chrome.tabs.query({ active: true }, function (tabs) {
    var tab = tabs[0];
    // и если она есть, то выполнить на ней скрипт
    if (tab) {
      execScript(tab, query);
    } else {
      alert('There are no active tabs');
    }
  });
});

/**
 * Выполняет функцию grabImages() на веб-странице указанной
 * вкладки и во всех ее фреймах,
 * @param tab {Tab} Объект вкладки браузера
 */
function execScript(tab, query) {
  // Выполнить функцию на странице указанной вкладки
  // и передать результат ее выполнения в функцию onResult
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: filter,
    },
    onResult
  );
}

/* function getFilterValue() {
  const input = document.querySelector('#filter');
  console.log(input, '<<<');
  return input.value
} */

function filter(query) {
  document.body.style.color = 'red';
  const cssInvisibleModifier = "bs-item--invisible";
  // const filterValue = 'Katarina';
  //let bar = confirm("Confirm or deny");
  console.log(query, ' !!!!!!!!!!');
  let filterMatcher = new RegExp(`.*${query}.*`, "i");

  return filterMatcher;

  /* console.log("Clearing Filter");
  document.querySelectorAll("." + cssInvisibleModifier).forEach((i) => {
    i.classList.remove(cssInvisibleModifier);
  });

  if (query) {
    console.log("Running Filter");
    document.querySelectorAll(".fc-event-title").forEach((i) => {
      if (filterMatcher.test(i.innerText)) {
      } else {
        i.parentElement.parentElement.classList.add(cssInvisibleModifier);
      }
    });
  } */
}

function onResult() {
  console.log("Clearing Filter");
  document.querySelectorAll("." + cssInvisibleModifier).forEach((i) => {
    i.classList.remove(cssInvisibleModifier);
  });

  if (query) {
    console.log("Running Filter");
    document.querySelectorAll(".fc-event-title").forEach((i) => {
      if (filterMatcher.test(i.innerText)) {
      } else {
        i.parentElement.parentElement.classList.add(cssInvisibleModifier);
      }
    });
  }
}
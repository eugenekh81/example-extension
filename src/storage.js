export function loadFilterValue() {
    const input = document.getElementById('filter');
    const storedValue = localStorage.getItem('filterValue');
    if (storedValue) {
      input.value = storedValue;
    }
  }
  
  export function saveFilterValue(value) {
    localStorage.setItem('filterValue', value);
  }
  
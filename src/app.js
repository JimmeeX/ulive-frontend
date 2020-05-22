function onSearch(e) {
  /**
   * Navigate to search/index.html
   * Retrieve Results from API
   */
  console.log(e.detail);
}

const domSearch = document.getElementById('home-search');

domSearch.addEventListener('search', onSearch);

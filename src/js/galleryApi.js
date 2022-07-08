// https://pixabay.com/api/docs/

// 13965574-3ae6669f35304ffc6cddc1b72

// https://pixabay.com/api/

export class GalleryApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '13965574-3ae6669f35304ffc6cddc1b72';
  constructor() {
    this.page = 1;
    this.searchQry = null;
    this.totalPages = null;
  }
  fetchImages() {
    return (
      fetch(
        `${this.#BASE_URL}?q=${this.searchQry}&page=${
          this.page
        }&per_page=3&key=${this.#API_KEY}`
      )
        .then(response => {
          if (!response.ok) {
            throw 'err';
          }
          //   console.log(response);
          return response.json();
        })
        //   .then(() => {})
        //   .then()
        .catch(err => {
          console.log(err);
        })
    );
  }
  setTotalPages(total) {
    this.totalPages = Math.ceil(total / 3);
  }
}

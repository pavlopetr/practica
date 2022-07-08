`use strict`;
import { GalleryApi } from './galleryApi';
import createGalleryList from '../templates/gallery_card.hbs';

const galleryApi = new GalleryApi();

const formEl = document.querySelector(`.js-search-form`);
const listEl = document.querySelector('.gallery');
// const moreBtnEl = document.querySelector('.js-load-more');
const paginatorEl = document.querySelector(".js-paginator");

const onFormSubmit = e => {
  e.preventDefault();
  const searchQry = e.target.elements.search.value;
  paginatorEl.querySelector('[data-action="prev"]').disabled = true;
  galleryApi.searchQry = searchQry;
  galleryApi.page = 1;
  galleryApi.fetchImages().then(data => {
    listEl.innerHTML = createGalleryList(data.hits);
    // moreBtnEl.classList.remove(`is-hidden`);
  });
};

// const onMoreBtnClick = e => {
//   galleryApi.page += 1;
//   galleryApi.fetchImages().then(data => {
//     listEl.insertAdjacentHTML('beforeend', createGalleryList(data.hits));
//   });
// };

const onPaginatorClick = (event)=>{
console.dir(event.target.dataset.action)
if (event.target.nodeName !== "BUTTON"){
  return
}
switch (event.target.dataset.action) {
  case "next":
    galleryApi.page +=1;
    if( galleryApi.page ===2){
      event.currentTarget.querySelector('[data-action="prev"]').disabled = false;
    }
    break;
    case "prev":
    galleryApi.page -=1;
    if (galleryApi.page ===1){
      event.target.disabled = true;
    } 
    break;
    default: break;
};
galleryApi.fetchImages().then(data =>{
  listEl.innerHTML = createGalleryList(data.hits);
})
console.log(galleryApi)
};


paginatorEl.addEventListener("click",onPaginatorClick)

// moreBtnEl.addEventListener(`click`, onMoreBtnClick);

formEl.addEventListener('submit', onFormSubmit);

console.log(galleryApi);



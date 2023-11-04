import { serviceImages } from "./service-images";
import { createMarkup } from "./createmarkup";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    width: '300px',
    position: 'right-top',
    fontSize: '16px',    
});

const Refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-input'),
    imgsGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

Refs.searchForm.addEventListener('submit', onSearchForm);
Refs.loadMoreBtn.addEventListener('click', onLoadMore);
Refs.loadMoreBtn.style.display = 'none';

let searchQuery;
let currentQuery;
let page;
let currentPage;
const perPage = 40;

async function onSearchForm(e) {
    e.preventDefault();    
    searchQuery = e.currentTarget.elements.searchQuery.value;
    try {
        page = 1;
        let data = await serviceImages(searchQuery, page);
        if (data.hits && data.hits.length > 0) {
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
            Refs.searchInput.value = '';
            Refs.imgsGallery.innerHTML = '';
            Refs.imgsGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
            page +=1;
            currentPage = page;
            Refs.loadMoreBtn.style.display = 'block';
            currentQuery = searchQuery;
        } else {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again");
            Refs.searchInput.value = '';
            searchQuery = currentQuery;
            page = currentPage;
        }
    } catch (error) {
        console.log(error);   
        } 
};

async function onLoadMore(e) {    
    try {
        let data = await serviceImages(searchQuery, page);
        if (data.hits && data.hits.length > 0) {
            Refs.searchInput.value = '';            
            Refs.imgsGallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

            if (perPage * page >= data.totalHits) {
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                Refs.loadMoreBtn.style.display = 'none';
                return;
            }
            page +=1;
            currentPage = page;
            Refs.loadMoreBtn.style.display = 'block';
            currentQuery = searchQuery;
        } else {
            Notiflix.Notify.failure("No more results.");
            Refs.loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error(error.message);   
        } 
}

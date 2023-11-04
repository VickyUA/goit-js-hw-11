export function createMarkup(arr) {
    return arr.map(({webformatURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <span>${likes}</span>
            <b>Likes</b>
        </p>
        <p class="info-item">
            <span>${views}</span>
            <b>Views</b>
        </p>
        <p class="info-item">
            <span>${comments}</span>
            <b>Comments</b>
        </p>
        <p class="info-item">
            <span>${downloads}</span>
            <b>Downloads</b>
        </p>
    </div>
</div>
    `).join('')
}
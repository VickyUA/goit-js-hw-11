import axios from "axios";

export async function serviceImages(searchQuery, page) {
    const BASE_API_URL = 'https://pixabay.com/api/';
    const API_KEY = '40478511-bba881f950ff1b1a4a75d1d8c';        
         
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page,
    });
      
    return await axios.get(`${BASE_API_URL}`, {
        params,
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(resp => {
            if (!resp.status) {
                throw new Error(resp.status || resp.statusText);
            }
            return resp.data;                                             
        });
}; 
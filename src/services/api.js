import axios from 'axios';

//URL FILMES EM CARTAZ:
//https://api.themoviedb.org/3/movie/now_playing?api_key=ca731291a943b3619de6ce314f4a1bf0&language=pt-BR&page=1

export const key = 'ca731291a943b3619de6ce314f4a1bf0'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;
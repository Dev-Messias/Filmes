//GERAR LISTA DE FOMES DO TAMANHO QUE EU DESEJAR.

export function getListMovies(size, movies){
    let popularMovies = [];

    for(let i = 0, l = size; i< l; i++){
        popularMovies.push(movies[i])
    }

    return popularMovies;
}

//Gerar um numero aleatorio com base no tamanho da lista de filmes.

export function randomBanner(movies){
    return Math.floor(Math.random() * movies.length)
}
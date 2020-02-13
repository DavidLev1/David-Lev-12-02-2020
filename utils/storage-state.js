const getAllFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

const isCityInFavorites = cityKey =>{
    const favorites = getAllFavorites();
    const isInFavorites = favorites.findIndex( city => city.cityKey === cityKey);
    return isInFavorites === -1 ? false: true;
}


const onFavorite = cityItem => {
    const favorites = getAllFavorites();
    const cityIdx = favorites.findIndex(city => city.cityKey === cityItem.cityKey);

    if(cityIdx === -1) favorites.push(cityItem); 
    else favorites.splice(cityIdx, 1);
        
    return localStorage.setItem('favorites', JSON.stringify(favorites));
}


export {getAllFavorites, isCityInFavorites, onFavorite};
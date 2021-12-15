import * as api from './api.js'

api.settings.host = 'http://localhost:3030'
export const login = api.login;
export const register= api.register;
export const logout= api.logout;

export async function getAllAlbums(){
    return api.get(api.settings.host+'/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(album){
    return api.post(api.settings.host+'/data/albums', album)
}

export async function getAlbumById(id){
    return api.get(api.settings.host +'/data/albums/'+id)
}

export async function editAlbum(albumId, album){
    return api.put(api.settings.host +'/data/albums/' + albumId, album)
}

export async function delAlbum(id){
    return api.del(api.settings.host+'/data/albums/'+id)
}
export async function getAlbumsBySearch(query){
    return api.get(api.settings.host +`/data/albums?where=name%20LIKE%20%22${query}%22
    `)
}
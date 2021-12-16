import * as api from './api.js'

api.settings.host = 'http://localhost:3030'
export const login = api.login;
export const register= api.register;
export const logout= api.logout;

export async function getAllMemes(){
    return api.get(api.settings.host+'/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(meme){
    return api.post(api.settings.host+'/data/memes', meme)
}

export async function getMemeById(id){
    return api.get(api.settings.host +'/data/memes/'+id)
}

export async function editMeme(memeId, meme){
    return api.put(api.settings.host +'/data/memes/' +memeId, meme)
}

export async function delMeme(id){
    return api.del(api.settings.host+'/data/memes/'+id)
}
export async function getMyMemes(userId){
    return api.get(api.settings.host +`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
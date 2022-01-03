import * as api from './api.js';


api.settings.host = 'http://localhost:3030';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllBooks(){
    return api.get(api.settings.host+'/data/books?sortBy=_createdOn%20desc')
}

export async function createBook(book){
    return api.post(api.settings.host+'/data/books', book)
}

export async function getBookById(id){
    return api.get(api.settings.host+'/data/books/'+id)
}
export async function updateBook(id, book){
    return api.put(api.settings.host+'/data/books/'+id, book)
}

export async function delBook(id){
    return api.del(api.settings.host+'/data/books/'+id)
}

export async function getMyBooks(userId){
    return api.get(api.settings.host+`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

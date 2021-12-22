import * as api from './api.js'

api.settings.host = 'http://localhost:3030'
export const login = api.login;
export const register= api.register;
export const logout= api.logout;

export async function getAllCars(){
    return api.get(api.settings.host+'/data/cars?sortBy=_createdOn%20desc');
}

export async function createCar(car){
    return api.post(api.settings.host+'/data/cars', car)
}

export async function getCarById(id){
    return api.get(api.settings.host +'/data/cars/'+id)
}

export async function editCar(carId, car){
    return api.put(api.settings.host +'/data/cars/' +carId, car)
}

export async function delCar(id){
    return api.del(api.settings.host+'/data/cars/'+id)
}
export async function getMyCars(userId){
    return api.get(api.settings.host +`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function searchByYear(query){
    return api.get(api.settings.host +`/data/cars?where=year%20LIKE%20%22${query}%22`)
}
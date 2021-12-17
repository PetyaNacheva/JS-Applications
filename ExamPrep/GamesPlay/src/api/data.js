
import * as api from './api.js'

api.settings.host = 'http://localhost:3030'

export const login = api.login;
export const register = api.register;

export async function getAllGames(){
    return api.get(api.settings.host + '/data/games?sortBy=_createdOn%20desc')
}

export async function getMostRecent(){
    return api.get(api.settings.host + '/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function createGame(game){
    return api.post(api.settings.host +'/data/games', game)
}

export async function getGameById(id){
    return api.get(api.settings.host + '/data/games/' +id)
}

export async function deleteGame(id){
    return api.del(api.settings.host + '/data/games/'+id)
}

export async function updateGame(gameId, game){
    return api.put(api.settings.host +'/data/games/'+gameId, game)
}
import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { logout as apiLogout } from './api/api.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';


page('/', decorateTemplate, homePage);
page('/login', decorateTemplate, loginPage);
page('/register', decorateTemplate, registerPage);
page('/catalog', decorateTemplate, catalogPage);
page('/create', decorateTemplate, createPage);
page('/details/:id',decorateTemplate, detailsPage);
page('/edit/:id',decorateTemplate, editPage);

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();
page.start();

async function decorateTemplate(ctx, next){

    ctx.render = (content) =>render(content,main);
    ctx.setUserNav=setUserNav;

    next();
}

function setUserNav(){
    const token = sessionStorage.getItem('authToken');

    if(token){
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none'
       
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = ''
    }
}

async function logout(){
    await apiLogout();
    setUserNav();
    page.redirect('/');
}

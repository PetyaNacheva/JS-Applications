import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'

import { logout as apiLogout } from './api/api.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';


page('/', decorateTemplate, homePage);
page('/login',decorateTemplate, loginPage);
page('/register', decorateTemplate, registerPage);
page ('/catalog', decorateTemplate, catalogPage);
page( '/create', decorateTemplate, createPage);
page('/details/:id', decorateTemplate, detailsPage);
page('/edit/:id', decorateTemplate, editPage);
page('/profile', decorateTemplate, profilePage)

const main = document.querySelector('.main');
document.getElementById('logoutBtn').addEventListener('click', logOut)
setUserNav();
page.start();

async function decorateTemplate(ctx, next){

    ctx.render=(content)=>render(content,main)
    ctx.setUserNav=setUserNav;
next();
}

function setUserNav(){
    const email= sessionStorage.getItem('email');
    if(email!=null){
        document.querySelector('.user').style.display = '';
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('div.profile>span').textContent =`Welcome, ${email}`;
    }else{
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = '';
    }
}

async function logOut(){
    await apiLogout();
    setUserNav();
    page.redirect('/')
}
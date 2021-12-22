import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'

import { logout as apiLogout } from './api/api.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { myListingPage } from './views/myListings.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';




page('/', decorateTemplate, homePage);
page('/login',decorateTemplate, loginPage);
page('/register',decorateTemplate,registerPage);
page('/catalog', decorateTemplate,catalogPage);
page('/create', decorateTemplate, createPage);
page('/details/:id',decorateTemplate, detailsPage);
page('/myListings', decorateTemplate, myListingPage);
page('/edit/:id', decorateTemplate, editPage);
page('/search',decorateTemplate, searchPage)

const main = document.getElementById('site-content')
document.getElementById('logoutBtn').addEventListener('click', logOut)

setUserNav();
page.start();

async function decorateTemplate(ctx, next){

    ctx.render=(content)=>render(content,main)
    ctx.setUserNav=setUserNav;
next();
}

function setUserNav(){
    const user= sessionStorage.getItem('username');
    if(user!=null){
        document.getElementById('profile').style.display = '';
        document.getElementById('guest').style.display = 'none';
        document.getElementById('welcome-field').textContent =`Welcome, ${user}`;
    }else{
        document.getElementById('profile').style.display = 'none';
        document.getElementById('guest').style.display = '';
    }
}

async function logOut(){
    await apiLogout();
    setUserNav();
    page.redirect('/')
}
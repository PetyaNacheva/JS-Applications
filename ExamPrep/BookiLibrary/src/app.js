import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import {logout as apiLogout} from './api/data.js'
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/myBooks.js';


//page('/', decorateTemplate, )
page('/login', decorateTemplate, loginPage);
page('/catalog', decorateTemplate, catalogPage);
page('/register', decorateTemplate, registerPage);
page('/create', decorateTemplate, createPage)
page('/details/:id',decorateTemplate, detailsPage);
page('/edit/:id', decorateTemplate, editPage);
page('/myBooks', decorateTemplate, myBooksPage)


const main = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();
page.start();

async function decorateTemplate(ctx, next){

    ctx.render = (content) =>render(content,main);
    ctx.setUserNav=setUserNav;

    next();
}

function setUserNav(){
    const email = sessionStorage.getItem('email');

    if(email){
        document.getElementById('user').style.display = '';
        document.getElementById('guest').style.display = 'none'
        document.querySelector('#user > span').textContent = `Welcome, ${email}`

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



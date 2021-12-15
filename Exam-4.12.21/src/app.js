import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout as apiLogout } from './api/api.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/createPage.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { searchPage } from './views/search.js';


page('/', decorateTemplate, homePage);
page('/login', decorateTemplate, loginPage);
page('/register', decorateTemplate, registerPage);
page('/catalog', decorateTemplate,catalogPage);
page('/create', decorateTemplate, createPage);
page('/details/:id', decorateTemplate, detailsPage);
page('/edit/:id', decorateTemplate, editPage);
page('/search', decorateTemplate, searchPage)


const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logOut)
setUserNav();
page.start();
document.getElementById('logoutBtn').addEventListener('click', logOut)
async function decorateTemplate(ctx, next){

    ctx.render=(content)=>render(content,main)
    ctx.setUserNav=setUserNav;
next();
}



function setUserNav(){
    const userId= sessionStorage.getItem('userId');
    if(userId!=null){

        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('createBtn').style.display ='inline';
        document.getElementById('logoutTag').style.display ='inline';

       
       // document.querySelector('.user').style.display = '';
      //  document.querySelector('.guest').style.display = 'none';
    }else{
        document.getElementById('loginBtn').style.display = 'inline';
        document.getElementById('registerBtn').style.display = 'inline';
        document.getElementById('createBtn').style.display ='none';
        document.getElementById('logoutTag').style.display ='none';
       
    }
}


async function logOut(){
    await apiLogout();
    setUserNav();
    page.redirect('/')
}
import {html} from '../../node_modules/lit-html/lit-html.js'
import { getMyBooks } from '../api/data.js';

const myBooksTemplate = (books) => html `<section id="my-books-page" class="my-books">
<h1>My Books</h1>
<!-- Display ul: with list-items for every user's books (if any) -->
${books.length ==0 ? html`<p class="no-books">No books in database!</p>` : html`<ul class="my-books-list">${books.map(bookTemplate)} </ul>`}


<!-- Display paragraph: If the user doesn't have his own books  -->

</section>`

const bookTemplate = (book) => html`  <li class="otherBooks">
<h3>${book.title}</h3>
<p>${book.type}</p>
<p class="img"><img src="${book.imageUrl}"></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>`

export async function myBooksPage(ctx){
    const userId = sessionStorage.getItem('userId');
    
    const books = await getMyBooks(userId);

    ctx.render(myBooksTemplate(books));

}
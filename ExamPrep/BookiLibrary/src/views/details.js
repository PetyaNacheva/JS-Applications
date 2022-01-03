import {html} from '../../node_modules/lit-html/lit-html.js'
import { delBook, getBookById } from '../api/data.js';

const detailsTemplate = (book, onDelete, isOwner, userId) => html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <div class="actions">
        ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
        <a class="button" href="javascript:void(0)" @click=${onDelete}>Delete</a>` : ''}
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        ${userId ? html`<a class="button" href="#">Like</a>` : ''}
        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
       

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>`

export async function detailsPage(ctx){
    const bookId = ctx.params.id;
    const userId = sessionStorage.getItem('userId');
    const book = await getBookById(bookId);
    const isOwner = (userId===book._ownerId);
    
    ctx.render(detailsTemplate(book , onDelete, isOwner, userId))

    async function onDelete(){
        const bookId = ctx.params.id;
        await delBook(bookId);
        ctx.page.redirect('/catalog');
    }
    
}
import{html} from '../../node_modules/lit-html/lit-html.js'
import { getBookById, updateBook } from '../api/data.js';

const editTemplate =(onSubmit, book) => html`<section id="edit-page" class="edit">
<form @submit = ${onSubmit}id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" .value=${book.title}>
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    id="description" .value= ${book.description}></textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" .value=${book.type}>
                    <option value="Fiction" selected>Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`

export async function editPage(ctx){
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    ctx.render(editTemplate(onSubmit, book));
    const user = sessionStorage.getItem('userId');
    const isOwner = (user===book._ownerId)

    async function onSubmit(event){
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const type = formData.get('type');
        if(!title || !description || !imageUrl ||!type){
            return alert ('all fields are required!')
        }
        if(isOwner){
        await updateBook(bookId, {title,description,imageUrl,type});
 
        ctx.page.redirect('/details/'+ bookId);
        }
    }

}
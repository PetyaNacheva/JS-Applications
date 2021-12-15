import {html} from '../../node_modules/lit-html/lit-html.js'
import { createAlbum } from '../api/data.js';
 
const createTemplate = (onSubmit) => html`<section class="createPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Add Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" class="name" type="text" placeholder="Album name">

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" placeholder="Image Url">

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" class="price" type="text" placeholder="Price">

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" placeholder="Release date">

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" class="artist" type="text" placeholder="Artist">

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" class="genre" type="text" placeholder="Genre">

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" placeholder="Description"></textarea>

            <button class="add-album" type="submit">Add New Album</button>
        </div>
    </fieldset>
</form>
</section>`

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();

        const form = new FormData(event.target);

        const name = form.get('name');
        const imgUrl = form.get('imgUrl');
        const price = form.get('price');
        const releaseDate = form.get('releaseDate');
        const artist = form.get('artist');
        const genre = form.get('genre');
        const description = form.get('description');

        if( !name || !imgUrl || !price || !releaseDate || ! artist || !genre || !description){
            return alert ('all fields are required');
        }

        await createAlbum({name, imgUrl, price, releaseDate, artist, genre, description});
        ctx.page.redirect('/catalog')
    }
}
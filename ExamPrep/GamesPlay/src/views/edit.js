import {html} from '../../node_modules/lit-html/lit-html.js';
import { getGameById, updateGame } from '../api/data.js';

const editTemplate = (onSubmit, game) => html`<section id="edit-page" class="auth">
<form @submit= ${onSubmit}id="edit">
    <div class="container">

        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" name="title" .value=${game.title}>

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" .value=${game.category}>

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${game.maxLevel}>

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" .value=${game.imageUrl}>

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value = ${game.summary}></textarea>
        <input class="btn submit" type="submit" value="Edit Game">

    </div>
</form>
</section>`

export async function editPage(ctx){
    const gameId = ctx.params.id;
    
    const game = await getGameById(gameId);
    console.log(game);
    ctx.render(editTemplate(onSubmit, game));

    async function onSubmit(event){
        event.preventDefault();

        const form = new FormData(event.target);
        const title = form.get('title').trim();
        const category = form.get('category').trim();
        const maxLevel = form.get('maxLevel').trim();
        const imageUrl = form.get('imageUrl').trim();
        const summary =form.get('summary').trim();
        console.log(imageUrl)
        if(!title || !category || !maxLevel|| !imageUrl || !summary){
            return alert('All fields are required!');
        }
        

      await updateGame(gameId, {title, category, maxLevel, imageUrl, summary})
      ctx.page.redirect('/details/'+gameId)
    }
}
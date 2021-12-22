import {html} from "../../node_modules/lit-html/lit-html.js";
import { createCar } from "../api/data.js";

const createtemplate = (onSubmit) => html` <section id="create-listing">
<div class="container">
    <form @submit = ${onSubmit} id="create-form">
        <h1>Create Car Listing</h1>
        <p>Please fill in this form to create an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand">

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model">

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description">

        <p>Car Year</p>
        <input type="text" placeholder="Enter Car Year" name="year">

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl">

        <p>Car Price</p>
        <input type="text" placeholder="Enter Car Price" name="price">

        <hr>
        <input type="submit" class="registerbtn" value="Create Listing">
    </form>
</div>
</section>`

export async function createPage(ctx){
    const userId = sessionStorage.getItem('userId');
    ctx.render(createtemplate(onSubmit));
    async function onSubmit(event){
        event.preventDefault();

        const form = new FormData(event.target);
        const brand = form.get('brand').trim();
        const model = form.get('model').trim();
        const description = form.get('description').trim();
        const year = Number(form.get('year').trim());
        const imageUrl = form.get('imageUrl').trim();
        const price = Number(form.get('price').trim());

        if(!brand || !model || !description || !year || !imageUrl || !price){
           throw new Error('All fields are required')
        }
        if(!userId){
            throw new Error ('user must be logedIn');
        }
        
        await createCar({brand, model, description, year, imageUrl, price});
        ctx.page.redirect('/catalog');
        
    }

}
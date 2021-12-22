import { html } from "../../node_modules/lit-html/lit-html.js";
import { editCar, getCarById } from "../api/data.js";

const editTemplate = (onSubmit, car) => html`<section id="edit-listing">
<div class="container">

    <form @submit = ${onSubmit} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value=${car.brand}>

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value=${car.model}>

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value=${car.description}>

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value=${car.year}>

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${car.imageUrl}>

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value=${car.price}>

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>`

export async function editPage(ctx){
    const userId = sessionStorage.getItem('userId');
    const carId = ctx.params.id;
    const car = await getCarById(carId);
    ctx.render(editTemplate(onSubmit, car));

    async function onSubmit(event){
        event.preventDefault();

        const form = new FormData (event.target);
        const brand = form.get('brand').trim();
        const model = form.get('model').trim();
        const description = form.get('description').trim();
        const year = Number(form.get('year').trim());
        const imageUrl = form.get('imageUrl').trim();
        const price = Number(form.get('price').trim());

        if(!brand || !model || ! description || ! year || !imageUrl || !price){
            throw new Error ('all fields must be filled');
        }
        if(!userId){
            throw new Error ('user must be logedIn');
        }
        await editCar(carId, {brand, model, description, year, imageUrl, price});
        ctx.page.redirect('/details/'+carId)
    }

}
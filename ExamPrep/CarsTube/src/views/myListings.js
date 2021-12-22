import {html} from "../../node_modules/lit-html/lit-html.js";
import { getMyCars } from "../api/data.js";
import { carTemplate } from "./catalog.js";

const myListingTemplate = (myCars) => html` <section id="my-listings">
<h1>My car listings</h1>
<div class="listings">

${myCars.length==0 ? html`<p class="no-cars"> You haven't listed any cars yet.</p>` : myCars.map(carTemplate)}
    <!-- Display all records -->
    <!-- Display if there are no records -->
   
</div>
</section>`


export async function myListingPage(ctx){
    const user = sessionStorage.getItem('userId');
    const myCars = await getMyCars(user);
    ctx.render(myListingTemplate(myCars));
}
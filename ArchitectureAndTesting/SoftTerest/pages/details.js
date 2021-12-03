import auth from "../auth.js";
import routing from "../routing.js";
import { ce, emptyOutLoc } from "../utils.js";

const details = { init, getView };
const url = "http://localhost:3030/data/ideas/";

let location;

function init(loc) {
    location = loc;
}

async function getView(id) {
    let data = await auth.askServer(`${url}${id}`, "get", undefined, true, true);
    emptyOutLoc(location);
    console.log(data);
    location.appendChild(makeCard(data, id));
    return location;
}

function makeCard(dataObj, thisId) {
    let img = ce("img", {
        class: "det-img",
        src: dataObj.img,
    });

    let desc = ce(
        "div",
        { class: "desc" },
        ce("h2", { class: "display-5" }, dataObj.title),
        ce("p", { class: "infoType" }, "Description:"),
        ce("p", { class: "idea-description" }, dataObj.description)
    );

    let card = ce("div", { class: "container home some", id: "details" }, img, desc);

    if (auth.getUserId() === dataObj._ownerId) {
        let delBtn = ce(
            "a",
            { class: "btn detb", href: "#", onClick: delHandler, "data-this-id": thisId },
            "Delete"
        );
        card.appendChild(ce("div", { class: "text-center" }, delBtn));
    }
    return card;
}

async function delHandler(e) {
    try {
        await auth.askServer(
            `http://localhost:3030/data/ideas/${e.target.dataset.thisId}`,
            "delete",
            undefined,
            true,
            true
        );
        routing.redirectToPage("dashboard");
    } catch (err) {
        alert(err);
        console.log(err);
    }
}

export default details;

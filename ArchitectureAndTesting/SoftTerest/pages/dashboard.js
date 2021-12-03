import auth from "../auth.js";
import routing from "../routing.js";
import { ce, emptyOutLoc } from "../utils.js";

const url = "http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc";
const dashboard = { init, getView };

let location;

function init(loc) {
  location = loc;
}

async function getView() {
  let data;
  try {
    data = await auth.askServer(url, "get", undefined, true, true);
  } catch (err) {
    console.log(err);
    alert(err);
  }
  console.log(data);
  if (data.length > 0) {
    let cards = data.map((idea) => makeIdeaCard(idea));
    emptyOutLoc(location);
    location.append(...cards);
  } else {
    emptyOutLoc(location);
    location.appendChild(ce("h1", {}, "No ideas yet! Be the first one :)"));
  }

  return location;
}

function makeIdeaCard(dataObj) {
  let card = ce(
    "div",
    {
      class: "card overflow-hidden current-card details route",
      style: "width: 20rem; height: 18rem",
      "data-route": `details/${dataObj._id}`,
    },
    ce("div", { class: "card-body" }, ce("p", { class: "card-text" }, dataObj.title)),
    ce("img", { class: "card-image", src: dataObj.img }),
    ce("a", { class: "btn", href: "#", onClick: routing.routingHandler }, "Details")
  );

  return card;
}

export default dashboard;

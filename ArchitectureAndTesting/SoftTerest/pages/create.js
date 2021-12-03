import auth from "../auth.js";
import routing from "../routing.js";

const create = { init, getView };

const url = `http://localhost:3030/data/ideas`;

let location;
let form;

function init(loc) {
  location = loc;
  form = location.querySelector("form");
  form.addEventListener("submit", createFormHandler);
}

function getView() {
  return location;
}

async function createFormHandler(e) {
  e.preventDefault();
  let data = new FormData(e.target);

  data = {
    img: data.get("imageURL"),
    title: data.get("title"),
    description: data.get("description"),
  };

  try {
    if (data.title.trim().length < 6) {
      throw new Error("too short title");
    }

    if (data.description.trim().length < 10) {
      throw new Error("too short description");
    }

    if (data.img.trim().length < 5) {
      throw new Error("too short image url");
    }

    await auth.askServer(url, "post", data, true, true);
    e.target.reset();
    routing.redirectToPage("dashboard");
  } catch (err) {
    alert(err);
    console.log(err);
  }
}

export default create;

import auth from "../auth.js";

const login = { init, getView };

let location;
let form;

function init(loc) {
    location = loc;
    form = location.querySelector("form");
    form.addEventListener("submit", loginUser);
}

function getView() {
    return location;
}
async function loginUser(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    data = {
        email: data.get("email"),
        password: data.get("password"),
    };

    try {
        await auth.login(data);
        e.target.reset();
    } catch (err) {
        err = JSON.parse(err.message);
        alert(err.message);
    }
}

export default login;

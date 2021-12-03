import auth from "../auth.js";

const register = { init, getView };

let form;
let location;
let emailTest = /^[\w\-.0-9]+[@][\w\-.0-9]+[.][\w\-.0-9]+$/g;

function init(loc) {
    location = loc;
    form = location.querySelector("form");
    form.addEventListener("submit", regUser);
}

function getView() {
    return location;
}

function regUser(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    data = {
        email: data.get("email"),
        password: data.get("password"),
        rePassword: data.get("repeatPassword"),
    };

    try {
        if (data.password.length <= 3) {
            throw new Error("pass is too short");
        }
        if (data.password !== data.rePassword) {
            throw new Error("pass does not match pass");
        }
        if (!emailTest.test(data.email)) {
            throw new Error("email is not valid");
        }

        auth.register(data);
        e.target.reset();
    } catch (err) {
        alert(err);
    }
}

export default register;

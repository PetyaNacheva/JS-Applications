import routing from "../routing.js";

const nav = { init, getView, logIn, logOut };

let location;

function init(loc) {
    location = loc;
}

function getView() {
    return location;
}

function logIn() {
    [...location.querySelectorAll(".user")].map((e) => e.classList.remove("hidden"));
    [...location.querySelectorAll(".guest")].map((e) => e.classList.add("hidden"));
    routing.redirectToPage("home");
}
function logOut() {
    [...location.querySelectorAll(".user")].map((e) => e.classList.add("hidden"));
    [...location.querySelectorAll(".guest")].map((e) => e.classList.remove("hidden"));
    return routing.returnViewPromise("home");
}

export default nav;

const home = { init, getView };

let location;

function init(loc) {
    location = loc;
}

function getView() {
    return location;
}

export default home;

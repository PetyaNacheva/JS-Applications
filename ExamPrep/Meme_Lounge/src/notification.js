const box = document.getElementById('errorBox')

export function notify(message){
    box.innerHTML =  `<span>${message}</span>`
    box.style.display = 'block';
    setTimeout(()=>{box.style.display = 'block'}, 3000);
}
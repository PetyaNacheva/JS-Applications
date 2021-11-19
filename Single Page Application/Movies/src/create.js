 lines (10 sloc)  231 Bytes
   
let main;
let section;


export function setupCreate(mainTarget, sectionTarget){
    main = mainTarget;
    section = sectionTarget;
}


export async function showCreate(){
    main.innerHTML = '';
    main.appendChild(section);
}

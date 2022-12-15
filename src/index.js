import { loadHome } from "./home";

// PAGE LOAD FUNCTION CREATES PAGE STRUCTURE FOR DOM MANIPULATION BY OTHER MODULES
function pageLoad() {
    const content = document.getElementById('content');
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    nav.setAttribute("id", "navhead")
    const container = document.createElement('div')
    container.setAttribute("id", "container")
    container.classList.add("container")

    content.appendChild(header)
    header.appendChild(nav)
    content.appendChild(container)

    return content;
}

// INITIALIZE APP BY LOADING THE DOM ELEMENTS AND THEN CALLING THE LOADHOME MODULE
pageLoad()
loadHome()



// FUNCTIONS BELOW ARE SHARED BETWEEN AND CALLED BY OTHER MODULES:

// RETURNS NAV BAR STYLED FOR PAGE 2 WITH SELECTED WORD IN HEADER
export function loadListNav(headerText){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.add('subsection')
    let searchArea = document.createElement('img');
    searchArea.src = './icons/search.svg'
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = headerText
    let homeButton = document.createElement('img')
    homeButton.src = "./icons/house.svg"
    homeButton.addEventListener('click', loadHome)
    navHead.appendChild(searchArea);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}


// RETURNS A LIST OF DIVS IN THE CONTAINER FOR PAGE 2
export function loadListContainer(list, listClass, listFunction){
    // CLEAR CONTAINER
    const container = document.getElementById('container')
    container.innerHTML = ''
    
    const itemPressed = (e) => {
        listFunction(e.target.innerText)
    }

    for (let i = 0; i < list.length; i++) {
        let listDiv = document.createElement('div');
        listDiv.classList.add('rectangle', listClass);
        listDiv.innerText = list[i];
        listDiv.addEventListener('click', itemPressed)
        container.appendChild(listDiv)
    }

    return container
}


// RETURNS NAV BAR STYLED FOR PAGE 3 WITH SELECTED WORD IN HEADER
// BACK FUNCTION POINTS TO PREVIOUS PAGE MODULE
export function loadEmpathyNav(word, backFunction){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.add('subsection')
    let backButton = document.createElement('img');
    backButton.src = "./icons/arrow-left-short.svg"
    backButton.addEventListener('click', backFunction);
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = word
    let homeButton = document.createElement('img')
    homeButton.src = "./icons/house.svg"
    homeButton.addEventListener('click', loadHome)
    navHead.appendChild(backButton);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}


// RETURNS A HEADER TEXT DIV USED ON PAGE 3
export function empathySectionHeader(text){
    const initialFeelingsHeader = document.createElement('div')
    initialFeelingsHeader.classList.add('empathySectionHeader')
    initialFeelingsHeader.innerText = text
    
    return initialFeelingsHeader
}


// !!! DEPRECATED !!! // RETURNS CAROUSEL OF DIVS USED ON PAGE 3 
export function empathySectionDivCarousel(array, divClass){
    const gridCarousel = document.createElement('div');
    gridCarousel.classList.add('empathySectionDivCarousel');
    buildCarousel()

    function buildCarousel() {
        gridCarousel.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const empathyGuessDivCarousel = document.createElement('div');
            empathyGuessDivCarousel.classList.add('empathyGuessDivCarousel')
            empathyGuessDivCarousel.classList.add(`${divClass}`)
            empathyGuessDivCarousel.innerText = array[i];
            gridCarousel.appendChild(empathyGuessDivCarousel)
        }
        const addGuess = document.createElement('div');
        addGuess.classList.add('empathyGuessDivCarousel')
        addGuess.classList.add(`${divClass}`)
        addGuess.innerText = "+";
        addGuess.addEventListener('click', e => {
            let input = prompt("Use another term: ")
            array.push(input)
            buildCarousel()
        })
        gridCarousel.appendChild(addGuess)
    }
    return gridCarousel
}
import { loadFeelings } from "./feelings";
import { loadComplaints } from "./complaints";
import { sectionHeader } from ".";

export function loadHome() {
    loadNav();
    loadContainer();
}

// LOAD NAV BAR STYLED ONLY FOR HOME MODULE
function loadNav(){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.remove('subsection')

    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = "self-empathy"
    navHead.appendChild(sectionTitle);
    const infoButton = document.createElement('img');
    infoButton.src = "./icons/info-circle.svg"
    infoButton.addEventListener('click', toggleInfoBox)
    navHead.appendChild(infoButton)
    
    return navHead;
}

// LOAD CONTAINER STYLED ONLY FOR HOME MODULE
function loadContainer(){
    const container = document.getElementById('container');
    // clear container
    container.innerHTML = ''
    container.classList.add('fullHeight')

    // add complaint section button
    container.appendChild(sectionHeader("START WITH A COMPLAINT"))
    const complaintSectionButton = document.createElement('div');
    complaintSectionButton.classList.add('sectionButton')
    complaintSectionButton.classList.add('complaint')
    // const startTextComplaint = document.createElement('div')
    // startTextComplaint.classList.add('startWith')
    // startTextComplaint.innerText = "start with a complaint"
    const complaintQuote = document.createElement('div')
    complaintQuote.classList.add('exampleQuote')
    complaintQuote.innerText = '"They\'re being..."'
    // complaintSectionButton.appendChild(startTextComplaint)
    complaintSectionButton.appendChild(complaintQuote)
    complaintSectionButton.addEventListener('click', loadComplaints)
    container.appendChild(complaintSectionButton)

    // add feeling section button
    container.appendChild(sectionHeader("START WITH A FEELING"))
    const feelingSectionButton = document.createElement('div');
    feelingSectionButton.classList.add('sectionButton')
    feelingSectionButton.classList.add('feeling')
    // const startTextFeeling = document.createElement('div')
    // startTextFeeling.classList.add('startWith')
    // startTextFeeling.innerText = "start with a feeling"
    const feelingQuote = document.createElement('div')
    feelingQuote.classList.add('exampleQuote')
    feelingQuote.innerText = '"I\'m feeling..."'
    // feelingSectionButton.appendChild(startTextFeeling)
    feelingSectionButton.appendChild(feelingQuote)
    feelingSectionButton.addEventListener('click', loadFeelings)
    container.appendChild(feelingSectionButton)

    // create hidden infoBox
    const infoBox = document.createElement('div')
    infoBox.classList.add('infoBox')
    infoBox.textContent = "An online guide to support the self-empathy process. Start with a complaint or feeling to connect with your underlying feelings and needs. No user information is recorded."
    container.appendChild(infoBox)


    return container;
}


function toggleInfoBox() {
    const infoBox = document.querySelector('.infoBox')
    infoBox.classList.toggle('show')
    // add close button to infoBox. add click event listener to toggle show class
}
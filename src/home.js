import { loadFeelings } from "./feelings";
import { loadComplaints } from "./complaints";

export function loadHome() {
    loadNav();
    loadContainer();
}

function loadNav(){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.remove('subsection')
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = "self-empathy"
    navHead.appendChild(sectionTitle);

    return navHead;
}

function loadContainer(){
    const container = document.getElementById('container');
    // clear container
    container.innerHTML = ''
    
    // add intro text
    const introText = document.createElement('div')
    introText.classList.add('introText')
    introText.innerText = "Observe what you\nare experiencing.\n\nGet in touch with your\nunderlying needs."
    container.appendChild(introText)

    // add complaint section button
    const complaintSectionButton = document.createElement('div');
    complaintSectionButton.classList.add('sectionButton')
    const startTextComplaint = document.createElement('div')
    startTextComplaint.classList.add('startWith')
    startTextComplaint.innerText = "start with a complaint"
    const complaintQuote = document.createElement('div')
    complaintQuote.classList.add('exampleQuote')
    complaintQuote.innerText = '\"They\'re being...\"'
    complaintSectionButton.appendChild(startTextComplaint)
    complaintSectionButton.appendChild(complaintQuote)
    complaintSectionButton.addEventListener('click', loadComplaints)
    container.appendChild(complaintSectionButton)

    // add feeling section button
    const feelingSectionButton = document.createElement('div');
    feelingSectionButton.classList.add('sectionButton')
    const startTextFeeling = document.createElement('div')
    startTextFeeling.classList.add('startWith')
    startTextFeeling.innerText = "start with a feeling"
    const feelingQuote = document.createElement('div')
    feelingQuote.classList.add('exampleQuote')
    feelingQuote.innerText = '\"I\'m feeling...\"'
    feelingSectionButton.appendChild(startTextFeeling)
    feelingSectionButton.appendChild(feelingQuote)
    feelingSectionButton.addEventListener('click', loadFeelings)
    container.appendChild(feelingSectionButton)

    return container;
}
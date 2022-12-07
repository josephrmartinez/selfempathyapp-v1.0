import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
// import { empathySectionDivGrid } from ".";
import { loadComplaints } from "./complaints";
import { empathySectionDivCarousel } from ".";
import complaints from './complaints.json'


export function loadComplaintEmpathy(word){
    loadEmpathyNav(word, loadComplaints)
    loadContainer(word);
    
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    // CREATE INITIAL FEELINGS SECTION
    container.appendChild(empathySectionHeader("INITIAL FEELINGS"))
    container.appendChild(empathySectionDivCarousel(complaints[word]["initialFeelings"], 'initialFeeling'))
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(empathySectionDivCarousel(complaints[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(empathySectionDivCarousel(complaints[word]["needs"], 'need'));
    const completeButton = document.createElement('button')
    completeButton.innerText = "I'm complete"
    container.appendChild(completeButton)
}
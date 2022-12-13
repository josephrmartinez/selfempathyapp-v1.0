import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
import { loadComplaints } from "./complaints";
import complaints from './complaints.json'
import { buildSlider } from "./buildSlider";


export function loadComplaintEmpathy(word){
    loadEmpathyNav(word, loadComplaints)
    loadContainer(word);
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.setAttribute('draggable', false);
    // CREATE INITIAL FEELINGS SECTION
    container.appendChild(empathySectionHeader("INITIAL FEELINGS"))
    const initialFeelingSlider = buildSlider(complaints[word]["initialFeelings"], 'initialFeeling')
    console.log(initialFeelingSlider)
    container.appendChild(initialFeelingSlider)
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(buildSlider(complaints[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(buildSlider(complaints[word]["needs"], 'need'));
    const completeButton = document.createElement('button')
    completeButton.innerText = "I'm complete"
    container.appendChild(completeButton)
}
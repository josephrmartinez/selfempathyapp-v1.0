import { loadEmpathyNav } from ".";
import { sectionHeader } from ".";
import { loadComplaints } from "./complaints";
import complaints from './complaints.json'
import { buildSlider } from "./buildSlider";
import { createCompleteButton } from "./completeButton";


export function loadComplaintEmpathy(word){
    loadEmpathyNav(word, loadComplaints)
    loadContainer(word);
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.classList.remove('scroll');
    container.setAttribute('draggable', false);
    // CREATE INITIAL FEELINGS SECTION
    container.appendChild(sectionHeader("INITIAL FEELINGS"))
    container.appendChild(buildSlider(complaints[word]["initialFeelings"], 'initialFeeling'))
    container.appendChild(sectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(buildSlider(complaints[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild(sectionHeader("NEEDS"))
    container.appendChild(buildSlider(complaints[word]["needs"], 'need'));
    container.appendChild(createCompleteButton())
}
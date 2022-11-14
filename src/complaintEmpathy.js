import { loadHome } from "./home";
import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
import { empathySectionDivGrid } from ".";
import { loadComplaints } from "./complaints";



export function loadComplaintEmpathy(word){
    loadEmpathyNav(word, loadComplaints)
    loadContainer();
    
}



function loadContainer(){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(empathySectionDivGrid(['sad', 'resentful', 'hurt', 'triggered', 'frustrated', 'defensive'], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(empathySectionDivGrid(['to be seen', 'resonance', 'engagement', 'to matter', 'inclusion', 'mutuality'], 'need'))
}
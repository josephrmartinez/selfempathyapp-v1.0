// import { loadHome } from "./home";
import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
// import { empathySectionDivGrid } from ".";
import { loadComplaints } from "./complaints";
import { empathySectionDivCarousel } from ".";



export function loadComplaintEmpathy(word){
    loadEmpathyNav(word, loadComplaints)
    loadContainer();
    
}



function loadContainer(){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.appendChild(empathySectionHeader("INITIAL FEELINGS"))
    container.appendChild(empathySectionDivCarousel(['belittled', 'unseen', 'discounted', 'disliked', 'diminished', 'trampled'], 'initialFeeling'))
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(empathySectionDivCarousel(['sad', 'resentful', 'hurt', 'triggered', 'frustrated', 'defensive'], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(empathySectionDivCarousel(['to be seen', 'resonance', 'engagement', 'to matter', 'inclusion', 'mutuality'], 'need'));
    const completeButton = document.createElement('button')
    completeButton.innerText = "I'm complete"
    container.appendChild(completeButton)
}
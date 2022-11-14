import { loadHome } from "./home";
import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
import { empathySectionDivGrid } from ".";
import { loadFeelings } from "./feelings";


export function loadFeelingEmpathy(word){
    loadEmpathyNav(word, loadFeelings)
    loadContainer();
    
}



function loadContainer(){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.appendChild(empathySectionHeader("INITIAL FEELINGS"))
    container.appendChild(empathySectionDivGrid(['belittled', 'unseen', 'discounted', 'disliked', 'diminished', 'trampled'], 'initialFeeling'))
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(empathySectionDivGrid(['sad', 'resentful', 'hurt', 'triggered', 'frustrated', 'defensive'], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(empathySectionDivGrid(['to be seen', 'resonance', 'engagement', 'to matter', 'inclusion', 'mutuality'], 'need'))
}
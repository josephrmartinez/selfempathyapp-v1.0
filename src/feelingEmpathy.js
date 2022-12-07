// import { loadHome } from "./home";
import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
import { empathySectionDivCarousel } from ".";
import { loadFeelings } from "./feelings";
import feelings from './feelings.json'


export function loadFeelingEmpathy(word){
    loadEmpathyNav(word, loadFeelings)
    loadContainer(word);
    
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    // LOAD UNDERLYING FEELINGS SECTION
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(empathySectionDivCarousel(feelings[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(empathySectionDivCarousel(feelings[word]["needs"], 'need'))
}


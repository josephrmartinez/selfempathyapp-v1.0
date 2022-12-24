// import { loadHome } from "./home";
import { loadEmpathyNav } from ".";
import { sectionHeader } from ".";
import { buildSlider } from "./buildSlider";
import { loadFeelings } from "./feelings";
import feelings from './feelings.json'
import { createCompleteButton } from "./completeButton";


export function loadFeelingEmpathy(word){
    loadEmpathyNav(word, loadFeelings)
    loadContainer(word);
    
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.classList.remove('scroll');
    // LOAD UNDERLYING FEELINGS SECTION
    container.appendChild(sectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(buildSlider(feelings[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild(sectionHeader("NEEDS"))
    container.appendChild(buildSlider(feelings[word]["needs"], 'need'))
    container.appendChild(createCompleteButton())
}


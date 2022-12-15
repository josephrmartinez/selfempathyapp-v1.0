// import { loadHome } from "./home";
import { loadEmpathyNav } from ".";
import { empathySectionHeader } from ".";
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
    // LOAD UNDERLYING FEELINGS SECTION
    container.appendChild(empathySectionHeader("UNDERLYING FEELINGS"))
    container.appendChild(buildSlider(feelings[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild(empathySectionHeader("NEEDS"))
    container.appendChild(buildSlider(feelings[word]["needs"], 'need'))
    container.appendChild(createCompleteButton())
}


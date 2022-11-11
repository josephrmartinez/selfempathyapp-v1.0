import { loadHome } from "./home";

export function loadFeelings() {
    loadNav();
    loadContainer();
}

function loadNav(){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.add('subsection')
    let searchArea = document.createElement('div');
    searchArea.classList.add('searchArea');
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = "I'm feeling..."
    let homeButton = document.createElement('button');
    homeButton.innerText = "home"
    homeButton.addEventListener('click', loadHome)
    navHead.appendChild(searchArea);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}


function loadContainer(){
    const feelings = [
        "abandoned", "abused", "attacked", "belittled", "betrayed", "blamed", "bullied",
        "cheated", "coerced", "criticized", "discounted", "diminished", "disliked",
        "harrassed", "ignored", "insulted", "interrupted", "invalidated", "invisible",
        "isolated", "left out", "let down", "manipulated", "neglected", "overworked",
        "patronized", "pressured", "provoked", "put down", "rejected", "ripped off",
        "smothered", "threatened", "trampled", "tricked", "unappreciated", "unheard",
        "unloved", "unseen", "unsupported", "unwanted", "used", "victimized", "violated",
        "wronged",
    ]


    const container = document.getElementById('container')
    container.innerHTML = ''
    
    for (let i = 0; i < feelings.length; i++) {
        let feeling = document.createElement('div');
        feeling.classList.add('rectangle', 'feeling');
        feeling.innerText = feelings[i];
        container.appendChild(feeling)
    }

    return container
}

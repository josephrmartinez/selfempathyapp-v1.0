import { loadHome } from "./home"

export function loadComplaints(){
    loadNav()
    loadContainer()
}


function loadNav(){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.add('subsection')
    let searchArea = document.createElement('div');
    searchArea.classList.add('searchArea');
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = "They're being..."
    let homeButton = document.createElement('button');
    homeButton.innerText = "home"
    homeButton.addEventListener('click', loadHome)
    navHead.appendChild(searchArea);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}

function loadContainer(){
    const complaints = [
        "aggressive", "arrogant", "cheap", "clueless", "condescending",
        "confrontational", "controlling", "defensive", "flaky", "hypersensitive",
        "incompetent", "inconsiderate", "long-winded", "overreacting", "self-absorbed",
    ]
    
    const container = document.getElementById('container')
    container.innerHTML = ''
    
    for (let i = 0; i < complaints.length; i++) {
        let complaint = document.createElement('div');
        complaint.classList.add('rectangle', 'complaint');
        complaint.innerText = complaints[i];
        container.appendChild(complaint)
    }

    return container
}

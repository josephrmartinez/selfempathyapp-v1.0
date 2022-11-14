import { loadHome } from "./home"
import { loadListContainer } from "."
import { loadComplaintEmpathy } from "./complaintEmpathy"
import { loadListNav } from "."

export function loadComplaints(){
    const complaints = [
        "aggressive", "arrogant", "cheap", "clueless", "condescending",
        "confrontational", "controlling", "defensive", "flaky", "hypersensitive",
        "incompetent", "inconsiderate", "long-winded", "overreacting", "self-absorbed",
    ]


    loadListNav('\"They\'re being...\"')
    loadListContainer(complaints, 'complaint', loadComplaintEmpathy)
}













// function loadContainer(){
//     const complaints = [
//         "aggressive", "arrogant", "cheap", "clueless", "condescending",
//         "confrontational", "controlling", "defensive", "flaky", "hypersensitive",
//         "incompetent", "inconsiderate", "long-winded", "overreacting", "self-absorbed",
//     ]
    
//     // CLEAR CONTAINER
//     const container = document.getElementById('container')
//     container.innerHTML = ''
    
//     const complaintPressed = (e) => {
//         loadComplaintEmpathy(e.target.innerText)
//     }

//     for (let i = 0; i < complaints.length; i++) {
//         let complaint = document.createElement('div');
//         complaint.classList.add('rectangle', 'complaint');
//         complaint.innerText = complaints[i];
//         complaint.addEventListener('click', complaintPressed)
//         container.appendChild(complaint)
//     }

//     return container
// }

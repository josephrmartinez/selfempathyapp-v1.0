import { loadHome } from "./home";
import { loadListContainer } from ".";
import { loadFeelingEmpathy } from "./feelingEmpathy";
import { loadListNav } from ".";

export function loadFeelings() {
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

    loadListNav('\"I\'m feeling...\"');
    loadListContainer(feelings, 'feeling', loadFeelingEmpathy)
}










// function loadContainer(){
//     const feelings = [
//         "abandoned", "abused", "attacked", "belittled", "betrayed", "blamed", "bullied",
//         "cheated", "coerced", "criticized", "discounted", "diminished", "disliked",
//         "harrassed", "ignored", "insulted", "interrupted", "invalidated", "invisible",
//         "isolated", "left out", "let down", "manipulated", "neglected", "overworked",
//         "patronized", "pressured", "provoked", "put down", "rejected", "ripped off",
//         "smothered", "threatened", "trampled", "tricked", "unappreciated", "unheard",
//         "unloved", "unseen", "unsupported", "unwanted", "used", "victimized", "violated",
//         "wronged",
//     ]

//     // CLEAR CONTAINER  
//     const container = document.getElementById('container')
//     container.innerHTML = ''

//     const feelingPressed = (e) => {
//         loadFeelingEmpathy(e.target.innerText)
//     }
    
//     for (let i = 0; i < feelings.length; i++) {
//         let feeling = document.createElement('div');
//         feeling.classList.add('rectangle', 'feeling')
//         feeling.innerText = feelings[i];
//         feeling.addEventListener('click', feelingPressed);
//         container.appendChild(feeling)
//     }

//     return container
// }

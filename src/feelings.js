import { loadListContainer } from ".";
import { loadFeelingEmpathy } from "./feelingEmpathy";
import { loadListNav } from ".";
import feelings from './feelings.json'

export function loadFeelings() {
    const feelingList = []
    for (var key of Object.keys(feelings)) {
        feelingList.push(key)
    }

    loadListNav('I\'m feeling...');
    loadListContainer(feelingList, 'feeling', loadFeelingEmpathy)
}

import { loadListContainer } from "."
import { loadComplaintEmpathy } from "./complaintEmpathy"
import { loadListNav } from "."
import complaints from './complaints.json'

export function loadComplaints(){
    const complaintList = []
        for (var key of Object.keys(complaints)) {
            complaintList.push(key)
        }

    loadListNav('"They\'re being..."')
    loadListContainer(complaintList, 'complaint', loadComplaintEmpathy)
}
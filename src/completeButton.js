export function createCompleteButton() {
    const completeButton = document.createElement('button')
    completeButton.innerText = "I'm complete"
    completeButton.addEventListener("click", () => {
        let outOfRangeSlides = document.querySelectorAll('.outofrange');
        outOfRangeSlides.forEach(s => s.classList.add('dim'))
    });
    return completeButton
}
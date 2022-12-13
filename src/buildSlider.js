export function buildSlider(slidesArray, divClass) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    
    const slider = document.createElement('div')
    slider.classList.add('slider-container')

    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0,
        currentIndex = 0

    slidesArray.forEach((slide, index) => {
        let slideDiv = document.createElement('div')
        slideDiv.classList.add('slide')
        slideDiv.classList.add(`${divClass}`)
        slideDiv.classList.add('outofrange')
        slideDiv.innerText = slide


        // touch events (mobile)
        slideDiv.addEventListener('touchstart', touchStart(index))
        slideDiv.addEventListener('touchend', touchEnd)
        slideDiv.addEventListener('touchmove', touchMove)

        // mouse events (desktop)
        slideDiv.addEventListener('mousedown', touchStart(index))
        slideDiv.addEventListener('mouseup', touchEnd)
        slideDiv.addEventListener('mouseleave', touchEnd)
        slideDiv.addEventListener('mousemove', touchMove)

        slider.appendChild(slideDiv)
    }
    )

    // disable default behavior
    window.oncontextmenu = function (event) {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    function touchStart(index) {
        return function (event) {
            currentIndex = index
            // get start position based on whether user is on mobile or desktop
            startPos = getPositionX(event)
            isDragging = true
            animationID = requestAnimationFrame(animation)
            slider.classList.add('grabbing')
        }
    }


    function touchEnd() {
        isDragging = false
        cancelAnimationFrame(animationID)

        const movedBy = currentTranslate - prevTranslate

        let slideDivs = event.target.closest(".slider-container").querySelectorAll('.slide')

        if (movedBy < -60 && currentIndex < slidesArray.length - 1) {
            slideDivs[currentIndex].classList.add('outofrange')
            currentIndex += 1;
            slideDivs[currentIndex].classList.remove('outofrange')
        }  
        
        if (movedBy > 60 && currentIndex > 0) {
            slideDivs[currentIndex].classList.add('outofrange')
            currentIndex -= 1
            slideDivs[currentIndex].classList.remove('outofrange')
        }
        
        setPositionByIndex()

        slider.classList.remove('grabbing')
    }
        

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event)
            currentTranslate = prevTranslate + currentPosition - startPos
        }
    }
        
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
    }

    function animation() {
        setSliderPosition()
        if (isDragging) {
            requestAnimationFrame(animation)
        }
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`
    }


    function setPositionByIndex() {
        // const wrapper = document.querySelector('.wrapper')
        currentTranslate = currentIndex * -170
        prevTranslate = currentTranslate
        setSliderPosition() 
    }

    wrapper.appendChild(slider)
    return wrapper
}
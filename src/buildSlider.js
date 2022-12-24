export function buildSlider(slidesArray, divClass) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    
    const slider = document.createElement('div')
    slider.classList.add('slider-container')

    // touch events (mobile)
    slider.addEventListener('touchstart', touchStart)
    slider.addEventListener('touchend', touchEnd)
    slider.addEventListener('touchmove', touchMove)

    // mouse events (desktop)
    slider.addEventListener('mousedown', touchStart)
    slider.addEventListener('mouseup', touchEnd)
    slider.addEventListener('mouseleave', touchEnd)
    slider.addEventListener('mousemove', touchMove)


    let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0,
        currentIndex = 0
    
    if (slidesArray.length == 6) {
        slidesArray.push('+')
    }
    
    slidesArray.forEach((slide, index) => {
        let slideDiv = document.createElement('div')
        slideDiv.classList.add('slide')
        slideDiv.classList.add(`${divClass}`)
        slideDiv.classList.add('outofrange')
        slideDiv.innerText = slide
        slider.appendChild(slideDiv)
    }
    )

    // disable default behavior
    window.oncontextmenu = function(event) {
        event.preventDefault()
        event.stopPropagation()
        return false
    }

    function touchStart() {
        // currentIndex = index
        // get start position based on whether user is on mobile or desktop
        startPos = getPositionX(event)
    
        isDragging = true
        animationID = requestAnimationFrame(animation)
        slider.classList.add('grabbing')
    }


    function touchEnd() {
        isDragging = false
        cancelAnimationFrame(animationID)
        const movedBy = currentTranslate - prevTranslate
        let slideDivs = event.target.closest(".wrapper").querySelectorAll('.slide')

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
        currentTranslate = currentIndex * -200
        prevTranslate = currentTranslate
        setSliderPosition() 
    }

    
    slider.lastChild.addEventListener("dblclick", () => {
        let newWord = prompt("use another word:")
        slidesArray.splice(-1, 0, newWord)
        
        let newSlideDiv = document.createElement('div')
        newSlideDiv.classList.add('slide')
        newSlideDiv.classList.add(`${divClass}`)
        newSlideDiv.innerText = newWord
        
        slider.insertBefore(newSlideDiv, slider.lastChild)
        slider.lastChild.classList.add('outofrange')
        // console.log(slidesArray)
        // buildSlider(slidesArray, divClass)    
    })

    slider.firstChild.classList.remove('outofrange')

    wrapper.appendChild(slider)
    return wrapper

}


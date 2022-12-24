/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/buildSlider.js":
/*!****************************!*\
  !*** ./src/buildSlider.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildSlider": () => (/* binding */ buildSlider)
/* harmony export */ });
function buildSlider(slidesArray, divClass) {
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



/***/ }),

/***/ "./src/complaintEmpathy.js":
/*!*********************************!*\
  !*** ./src/complaintEmpathy.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadComplaintEmpathy": () => (/* binding */ loadComplaintEmpathy)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _complaints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./complaints */ "./src/complaints.js");
/* harmony import */ var _complaints_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./complaints.json */ "./src/complaints.json");
/* harmony import */ var _buildSlider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./buildSlider */ "./src/buildSlider.js");
/* harmony import */ var _completeButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./completeButton */ "./src/completeButton.js");








function loadComplaintEmpathy(word){
    (0,___WEBPACK_IMPORTED_MODULE_0__.loadEmpathyNav)(word, _complaints__WEBPACK_IMPORTED_MODULE_1__.loadComplaints)
    loadContainer(word);
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.classList.remove('scroll');
    container.setAttribute('draggable', false);
    // CREATE INITIAL FEELINGS SECTION
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.sectionHeader)("INITIAL FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["initialFeelings"], 'initialFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.sectionHeader)("UNDERLYING FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.sectionHeader)("NEEDS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["needs"], 'need'));
    container.appendChild((0,_completeButton__WEBPACK_IMPORTED_MODULE_4__.createCompleteButton)())
}

/***/ }),

/***/ "./src/complaints.js":
/*!***************************!*\
  !*** ./src/complaints.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadComplaints": () => (/* binding */ loadComplaints)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _complaintEmpathy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./complaintEmpathy */ "./src/complaintEmpathy.js");
/* harmony import */ var _complaints_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./complaints.json */ "./src/complaints.json");





function loadComplaints(){
    const complaintList = []
        for (var key of Object.keys(_complaints_json__WEBPACK_IMPORTED_MODULE_2__)) {
            complaintList.push(key)
        }

    (0,___WEBPACK_IMPORTED_MODULE_0__.loadListNav)('They\'re being...')
    ;(0,___WEBPACK_IMPORTED_MODULE_0__.loadListContainer)(complaintList, 'complaint', _complaintEmpathy__WEBPACK_IMPORTED_MODULE_1__.loadComplaintEmpathy)
}

/***/ }),

/***/ "./src/completeButton.js":
/*!*******************************!*\
  !*** ./src/completeButton.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCompleteButton": () => (/* binding */ createCompleteButton)
/* harmony export */ });
function createCompleteButton() {
    const completeButton = document.createElement('button')
    completeButton.innerText = "I'm complete"
    completeButton.addEventListener("click", () => {
        let outOfRangeSlides = document.querySelectorAll('.outofrange');
        outOfRangeSlides.forEach(s => s.classList.add('dim'))
    });
    return completeButton
}

/***/ }),

/***/ "./src/feelingEmpathy.js":
/*!*******************************!*\
  !*** ./src/feelingEmpathy.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadFeelingEmpathy": () => (/* binding */ loadFeelingEmpathy)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _buildSlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buildSlider */ "./src/buildSlider.js");
/* harmony import */ var _feelings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feelings */ "./src/feelings.js");
/* harmony import */ var _feelings_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feelings.json */ "./src/feelings.json");
/* harmony import */ var _completeButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./completeButton */ "./src/completeButton.js");
// import { loadHome } from "./home";








function loadFeelingEmpathy(word){
    (0,___WEBPACK_IMPORTED_MODULE_0__.loadEmpathyNav)(word, _feelings__WEBPACK_IMPORTED_MODULE_2__.loadFeelings)
    loadContainer(word);
    
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.classList.remove('scroll');
    // LOAD UNDERLYING FEELINGS SECTION
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.sectionHeader)("UNDERLYING FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_1__.buildSlider)(_feelings_json__WEBPACK_IMPORTED_MODULE_3__[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.sectionHeader)("NEEDS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_1__.buildSlider)(_feelings_json__WEBPACK_IMPORTED_MODULE_3__[word]["needs"], 'need'))
    container.appendChild((0,_completeButton__WEBPACK_IMPORTED_MODULE_4__.createCompleteButton)())
}



/***/ }),

/***/ "./src/feelings.js":
/*!*************************!*\
  !*** ./src/feelings.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadFeelings": () => (/* binding */ loadFeelings)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");
/* harmony import */ var _feelingEmpathy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feelingEmpathy */ "./src/feelingEmpathy.js");
/* harmony import */ var _feelings_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feelings.json */ "./src/feelings.json");





function loadFeelings() {
    const feelingList = []
    for (var key of Object.keys(_feelings_json__WEBPACK_IMPORTED_MODULE_2__)) {
        feelingList.push(key)
    }

    (0,___WEBPACK_IMPORTED_MODULE_0__.loadListNav)('I\'m feeling...');
    (0,___WEBPACK_IMPORTED_MODULE_0__.loadListContainer)(feelingList, 'feeling', _feelingEmpathy__WEBPACK_IMPORTED_MODULE_1__.loadFeelingEmpathy)
}


/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadHome": () => (/* binding */ loadHome)
/* harmony export */ });
/* harmony import */ var _feelings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feelings */ "./src/feelings.js");
/* harmony import */ var _complaints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./complaints */ "./src/complaints.js");



function loadHome() {
    loadNav();
    loadContainer();
}

// LOAD NAV BAR STYLED ONLY FOR HOME MODULE
function loadNav(){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.remove('subsection')

    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = " "
    navHead.appendChild(sectionTitle);
    const infoButton = document.createElement('img');
    infoButton.src = "./icons/info-circle.svg"
    infoButton.addEventListener('click', toggleInfoBox)
    navHead.appendChild(infoButton)
    
    return navHead;
}

// LOAD CONTAINER STYLED ONLY FOR HOME MODULE
function loadContainer(){
    const container = document.getElementById('container');
    // clear container
    container.innerHTML = ''
    container.classList.remove('scroll')

    // add complaint section button
    // container.appendChild(sectionHeader("START WITH A COMPLAINT"))
    const complaintSectionButton = document.createElement('div');
    complaintSectionButton.classList.add('sectionButton')
    complaintSectionButton.classList.add('complaint')
    const complaintQuote = document.createElement('div')
    complaintQuote.classList.add('exampleQuote')
    complaintQuote.innerText = 'They\'re being...'
    complaintSectionButton.appendChild(complaintQuote)
    complaintSectionButton.addEventListener('click', _complaints__WEBPACK_IMPORTED_MODULE_1__.loadComplaints)
    container.appendChild(complaintSectionButton)

    // add feeling section button
    // container.appendChild(sectionHeader("START WITH A FEELING"))
    const feelingSectionButton = document.createElement('div');
    feelingSectionButton.classList.add('sectionButton')
    feelingSectionButton.classList.add('feeling')
    const feelingQuote = document.createElement('div')
    feelingQuote.classList.add('exampleQuote')
    feelingQuote.innerText = 'I\'m feeling...'
    feelingSectionButton.appendChild(feelingQuote)
    feelingSectionButton.addEventListener('click', _feelings__WEBPACK_IMPORTED_MODULE_0__.loadFeelings)
    container.appendChild(feelingSectionButton)

    // create hidden infoBox
    const infoBox = document.createElement('div')
    infoBox.classList.add('infoBox')
    infoBox.textContent = "An online guide to support the self-empathy process. Start with a complaint or feeling to connect with your underlying feelings and needs. No user information is recorded."
    container.appendChild(infoBox)


    return container;
}


function toggleInfoBox() {
    const infoBox = document.querySelector('.infoBox')
    infoBox.classList.toggle('show')
    // add close button to infoBox. add click event listener to toggle show class
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadEmpathyNav": () => (/* binding */ loadEmpathyNav),
/* harmony export */   "loadListContainer": () => (/* binding */ loadListContainer),
/* harmony export */   "loadListNav": () => (/* binding */ loadListNav),
/* harmony export */   "sectionHeader": () => (/* binding */ sectionHeader)
/* harmony export */ });
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home */ "./src/home.js");


// PAGE LOAD FUNCTION CREATES PAGE STRUCTURE FOR DOM MANIPULATION BY OTHER MODULES
function pageLoad() {
    const content = document.getElementById('content');
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    nav.setAttribute("id", "navhead")
    const container = document.createElement('div')
    container.setAttribute("id", "container")
    container.classList.add("container")

    content.appendChild(header)
    header.appendChild(nav)
    content.appendChild(container)

    return content;
}

// INITIALIZE APP BY LOADING THE DOM ELEMENTS AND THEN CALLING THE LOADHOME MODULE
pageLoad()
;(0,_home__WEBPACK_IMPORTED_MODULE_0__.loadHome)()



// FUNCTIONS BELOW ARE SHARED BETWEEN AND CALLED BY OTHER MODULES:

// RETURNS NAV BAR STYLED FOR PAGE 2 WITH SELECTED WORD IN HEADER
function loadListNav(headerText){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.add('subsection')
    // let searchArea = document.createElement('img');
    // searchArea.src = './icons/search.svg'
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = headerText
    let homeButton = document.createElement('img')
    homeButton.src = "./icons/house.svg"
    homeButton.addEventListener('click', _home__WEBPACK_IMPORTED_MODULE_0__.loadHome)
    // navHead.appendChild(searchArea);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}


// RETURNS A LIST OF DIVS IN THE CONTAINER FOR PAGE 2
function loadListContainer(list, listClass, listFunction){
    // CLEAR CONTAINER
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.classList.add('scroll')

    
    const itemPressed = (e) => {
        listFunction(e.target.innerText)
    }

    for (let i = 0; i < list.length; i++) {
        let listDiv = document.createElement('div');
        listDiv.classList.add('rectangle', listClass);
        listDiv.innerText = list[i];
        listDiv.addEventListener('click', itemPressed)
        container.appendChild(listDiv)
    }
    // ADD + DIV WITH CLICK EVENT
    let plusDiv = document.createElement('div');
    plusDiv.classList.add('rectangle', listClass);
    plusDiv.innerText = '+';
    plusDiv.addEventListener('click', () => {
        prompt("Suggest another word:")
    })
    container.appendChild(plusDiv)

    return container
}


// RETURNS NAV BAR STYLED FOR PAGE 3 WITH SELECTED WORD IN HEADER
// BACK FUNCTION POINTS TO PREVIOUS PAGE MODULE
function loadEmpathyNav(word, backFunction){
    const navHead = document.getElementById('navhead')
    navHead.innerHTML = ''
    navHead.classList.add('subsection')
    let backButton = document.createElement('img');
    backButton.src = "./icons/arrow-left-short.svg"
    backButton.addEventListener('click', backFunction);
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = word
    let homeButton = document.createElement('img')
    homeButton.src = "./icons/house.svg"
    homeButton.addEventListener('click', _home__WEBPACK_IMPORTED_MODULE_0__.loadHome)
    navHead.appendChild(backButton);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}


// RETURNS A HEADER TEXT DIV USED ON PAGE 3
function sectionHeader(text){
    const header = document.createElement('div')
    header.classList.add('sectionHeader')
    header.innerText = text
    
    return header
}



/***/ }),

/***/ "./src/complaints.json":
/*!*****************************!*\
  !*** ./src/complaints.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"aggressive":{"complaint":"aggressive","initialFeelings":["attacked","belittled","intimidated","victimized","violated","threatened"],"underlyingFeelings":["angry","sad","resentment","frustrated","concerned","afraid"],"needs":["safety","autonomy","choice","consideration","respect","ease"]},"arrogant":{"complaint":"arrogant","initialFeelings":["belittled","diminished","ignored","unseen","disliked","trampled"],"underlyingFeelings":["sad","hurt","frustrated","resentful","triggered","defensive"],"needs":["to be seen","inclusion","to matter","engagement","resonance","mutuality"]},"cheap":{"complaint":"cheap","initialFeelings":["cheated","ignored","insulted","let down","rejected","unappreciated"],"underlyingFeelings":["angry","sad","resentment","frustrated","concerned","worried"],"needs":["mutuality","appreciation","equality","shared reality","respect","connection"]},"clueless":{"complaint":"clueless","initialFeelings":["let down","invalidated","disappointed","disrespected","annoyed","ripped off"],"underlyingFeelings":["antagonistic","frustrated","discouraged","disengaged","indifferent","pessimistic"],"needs":["consistency","trust","dependability","growth","congruence","resonance"]},"condescending":{"complaint":"condescending","initialFeelings":["belittled","invalidated","criticized","discounted","unappreciated","diminished"],"underlyingFeelings":["angry","frustrated","antagonistic","resentment","confused","worried"],"needs":["respect","resonance","understanding","aliveness","mutuality","to be seen"]},"confrontational":{"complaint":"confrontational","initialFeelings":["belittled","harassed","criticized","discounted","unappreciated","threatened"],"underlyingFeelings":["angry","frustrated","antagonistic","resentment","frightened","anxious"],"needs":["respect","self-control","self-expression","aliveness","mutuality","safety"]},"controlling":{"complaint":"controlling","initialFeelings":["manipulated","boxed in","cornered","criticized","distrusted","overpowered"],"underlyingFeelings":["anxious","fearful","resentful","overwhelmed","antagonistic","worried"],"needs":["autonomy","independence","enjoyment","space","adaptability","self-care"]},"defensive":{"complaint":"defensive","initialFeelings":["belittled","blamed","criticized","discounted","invalidated","pressured"],"underlyingFeelings":["angry","frustrated","antagonistic","resentment","confused","worried"],"needs":["participation","self-connection","understanding","consideration","mutuality","to be heard"]},"flaky":{"complaint":"flaky","initialFeelings":["abandoned","disliked","unwanted","rejected","unloved","ignored"],"underlyingFeelings":["angry","discouraged","joyless","frustrated","antagonistic","embarrassed"],"needs":["predictability","dependability","consistency","resonance","shared reality","presence"]},"high-maintenance":{"complaint":"high-maintenance","initialFeelings":["overwhelmed","manipulated","overpowered","pressured","used","invisible"],"underlyingFeelings":["angry","resentment","joyless","reluctant","drained","disengaged"],"needs":["autonomy","space","mutuality","enjoyment","ease","predictability"]},"hypersensitive":{"complaint":"hypersensitive","initialFeelings":["blamed","distrusted","dumped on","demonized","misheard","criticized"],"underlyingFeelings":["angry","frustrated","defensive","scared","embarrassed","anxious"],"needs":["understanding","self-connection","connection","trust","autonomy","shared reality"]},"incompetent":{"complaint":"incompetent","initialFeelings":["cheated","ripped off","annoyed","let down","patronized","screwed"],"underlyingFeelings":["triggered","upset","antagonistic","worried","disappointed","concerned"],"needs":["trust","dependability","consistency","resonance","teamwork","growth"]},"inconsiderate":{"complaint":"inconsiderate","initialFeelings":["let down","left out","betrayed","unsupported","discounted","invalidated"],"underlyingFeelings":["sad","hurt","frustrated","resentful","drained","upset"],"needs":["trust","aliveness","appreciation","to be heard","to be seen","inclusion"]},"rambling":{"complaint":"rambling","initialFeelings":["ignored","invisible","left out","smothered","unappreciated","cornered"],"underlyingFeelings":["angry","frustrated","antagonistic","resentful","desperation","anxious"],"needs":["ease","clarity","understanding","inclusion","mutuality","self-expression"]},"overreacting":{"complaint":"overreacting","initialFeelings":["attacked","blamed","boxed in","criticized","distrusted","insulted"],"underlyingFeelings":["angry","defensive","irritated","afraid","antagonistic","worried"],"needs":["to be heard","self-connection","consideration","shared reality","clarity","mutuality"]},"self-absorbed":{"complaint":"self-absorbed","initialFeelings":["overwhelmed","ignored","dumped on","invisible","neglected","unseen"],"underlyingFeelings":["sad","anxious","disengaged","withdrawn","indifferent","frustrated"],"needs":["to be seen","belonging","inclusion","to contribute","resonance","shared reality"]}}');

/***/ }),

/***/ "./src/feelings.json":
/*!***************************!*\
  !*** ./src/feelings.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"abandoned":{"initialFeeling":"abandoned","underlyingFeelings":["terrified","hurt","bewildered","sad","frightened","lonely"],"needs":["nurturing","connection","belonging","support","caring","strength"]},"abused":{"initialFeeling":"abused","underlyingFeelings":["angry","frustrated","frightened","numb","contempt","nervous"],"needs":["caring","nurturing","support","space","safety","consideration"]},"attacked":{"initialFeeling":"attacked","underlyingFeelings":["scared","angry","defensive","resentful","contempt","discouraged"],"needs":["safety","inclusion","to be seen","trust","space","participation"]},"belittled":{"initialFeeling":"belittled","underlyingFeelings":["angry","frustrated","tense","distressed","mistrustful","lonely"],"needs":["respect","autonomy","to be seen","acceptance","appreciation","peace"]},"betrayed":{"initialFeeling":"betrayed","underlyingFeelings":["angry","hurt","disappointed","enraged","indifferent","numb"],"needs":["trust","dependability","honesty","to be seen","commitment","self-connection"]},"blamed":{"initialFeeling":"blamed","underlyingFeelings":["angry","scared","confused","antagonistic","hurt","guarded"],"needs":["self-expression","inclusion","to be heard","to be seen","space","hope"]},"boxed in":{"initialFeeling":"boxed in","underlyingFeelings":["angry","thwarted","scared","anxious","burnt out","weary"],"needs":["autonomy","choice","freedom","aliveness","sense of self","spontaneity"]},"bullied":{"initialFeeling":"bullied","underlyingFeelings":["angry","scared","pressured","triggered","frustrated","mistrustful"],"needs":["autonomy","choice","safety","consideration","to be seen","sharing"]},"cheated":{"initialFeeling":"cheated","underlyingFeelings":["angry","resentful","hurt","perplexed","hesitant","low"],"needs":["honesty","fairness","justice","trust","reliability","creativity"]},"coerced":{"initialFeeling":"coerced","underlyingFeelings":["angry","frustrated","frightened","thwarted","scared","sad"],"needs":["autonomy","choice","freedom","participation","to matter","transparency"]},"cornered":{"initialFeeling":"cornered","underlyingFeelings":["angry","scared","anxious","thwarted","contempt","nervous"],"needs":["autonomy","freedom","aliveness","choice","to matter","acceptance"]},"criticized":{"initialFeeling":"criticized","underlyingFeelings":["in pain","scared","anxious","frustrated","humiliated","embarrassed"],"needs":["understanding","appreciation","recognition","accountability","connection","acceptance"]},"discounted":{"initialFeeling":"discounted","underlyingFeelings":["angry","hurt","embarrassed","frustrated","contempt","nervous"],"needs":["acceptance","inclusion","recognition","respect","to matter","support"]},"diminished":{"initialFeeling":"diminished","underlyingFeelings":["angry","hurt","embarrassed","frustrated","contempt","discouraged"],"needs":["acceptance","inclusion","recognition","respect","to matter","meaning"]},"disliked":{"initialFeeling":"disliked","underlyingFeelings":["sad","lonely","hurt","longing","mistrustful","lonely"],"needs":["appreciation","connection","understanding","to be seen","friendship","to be seen"]},"dumped on":{"initialFeeling":"dumped on","underlyingFeelings":["angry","overwhelmed","anxious","antagonistic","hurt","guarded"],"needs":["respect","consideration","understanding","to be seen","friendship","peace"]},"harassed":{"initialFeeling":"harassed","underlyingFeelings":["angry","frustrated","pressured","frightened","burnt out","weary"],"needs":["respect","space","consideration","peace","aliveness","self-connection"]},"ignored":{"initialFeeling":"ignored","underlyingFeelings":["lonely","sad","scared","hurt","frustrated","mistrustful"],"needs":["belonging","connection","inclusion","community","participation","hope"]},"insulted":{"initialFeeling":"insulted","underlyingFeelings":["angry","embarrassed","hurt","numb","hesitant","low"],"needs":["respect","consideration","to be seen","recognition","self-connection","spontaneity"]},"interrupted":{"initialFeeling":"interrupted","underlyingFeelings":["angry","frustrated","resentful","hurt","anxious","agitated"],"needs":["respect","to be heard","consideration","contribution","space","participation"]},"intimidated":{"initialFeeling":"intimidated","underlyingFeelings":["scared","anxious","depleted","regretful","contempt","nervous"],"needs":["safety","equality","empowerment","sense of self","meaning","peace"]},"invalidated":{"initialFeeling":"invalidated","underlyingFeelings":["angry","hurt","resentful","alienated","contempt","discouraged"],"needs":["appreciation","respect","to be seen","recognition","contribution","self-connection"]},"invisible":{"initialFeeling":"invisible","underlyingFeelings":["angry","sad","lonely","scared","mistrustful","lonely"],"needs":["to be seen","to be heard","to matter","belonging","community","hope"]},"isolated":{"initialFeeling":"isolated","underlyingFeelings":["lonely","afraid","scared","disconnected","indifferent","numb"],"needs":["community","inclusion","belonging","contribution","aliveness","spontaneity"]},"left out":{"initialFeeling":"left out","underlyingFeelings":["sad","lonely","anxious","perplexed","hurt","guarded"],"needs":["inclusion","to matter","purpose","contribution","partnership","sharing"]},"let down":{"initialFeeling":"let down","underlyingFeelings":["sad","disappointed","frightened","distracted","burnt out","weary"],"needs":["structure","aliveness","self-connection","purpose","self-care","creativity"]},"manipulated":{"initialFeeling":"manipulated","underlyingFeelings":["angry","scared","powerless","thwarted","frustrated","mistrustful"],"needs":["autonomy","empowerment","trust","equality","freedom","transparency"]},"misunderstood":{"initialFeeling":"misunderstood","underlyingFeelings":["embarrassed","flustered","melancholy","distressed","hesitant","low"],"needs":["to be heard","self-connection","clarity","confidence","sense of self","aliveness"]},"neglected":{"initialFeeling":"neglected","underlyingFeelings":["lonely","scared","embarrassed","disconnected","removed","apprehensive"],"needs":["nurturing","closeness","self-connection","confidence","aliveness","acceptance"]},"overpowered":{"initialFeeling":"overpowered","underlyingFeelings":["impotent","helpless","confused","weary","burnt out","exhausted"],"needs":["self-care","aliveness","rest","sense of self","to be seen","support"]},"overworked":{"initialFeeling":"overworked","underlyingFeelings":["angry","tired","frustrated","irritated","triggered","low"],"needs":["aliveness","purpose","hope","self-connection","peace","meaning"]},"patronized":{"initialFeeling":"patronized","underlyingFeelings":["resentful","frustrated","flustered","triggered","mistrustful","annoyed"],"needs":["mutuality","trust","harmony","knowing","partnership","to be seen"]},"pressured":{"initialFeeling":"pressured","underlyingFeelings":["anxious","resentful","overwhelmed","irritated","burnt out","mistrustful"],"needs":["autonomy","clarity","space","self-connection","knowing","peace of mind"]},"provoked":{"initialFeeling":"provoked","underlyingFeelings":["angry","frustrated","hostile","antagonistic","resentful","triggered"],"needs":["respect","to be seen","connection","support","consideration","self-connection"]},"put down":{"initialFeeling":"put down","underlyingFeelings":["angry","resentful","distressed","distracted","hurt","guarded"],"needs":["respect","to be seen","to matter","mutuality","compassion","acceptance"]},"rejected":{"initialFeeling":"rejected","underlyingFeelings":["hurt","scared","angry","defiant","burnt out","worried"],"needs":["rest","self-care","self-connection","meaning","hope","aliveness"]},"ripped off":{"initialFeeling":"ripped off","underlyingFeelings":["angry","resentful","disappointed","defiant","frustrated","annoyed"],"needs":["consideration","justice","peace","structure","understanding","acceptance"]},"smothered":{"initialFeeling":"smothered","underlyingFeelings":["frustrated","anxious","annoyed","perplexed","removed","weary"],"needs":["space","freedom","connection","mutuality","aliveness","to be seen"]},"taken for granted":{"initialFeeling":"taken for granted","underlyingFeelings":["angry","sad","hurt","disappointed","burnt out","weary"],"needs":["appreciation","connection","recognition","rest","aliveness","purpose"]},"threatened":{"initialFeeling":"threatened","underlyingFeelings":["scared","frightened","alarmed","agitated","defiant","terrified"],"needs":["autonomy","safety","respect","compassion","mutuality","to be seen"]},"trampled":{"initialFeeling":"trampled","underlyingFeelings":["angry","frustrated","overwhelmed","burnt out","hurt","powerless"],"needs":["respect","connection","support","to be seen","equality","to matter"]},"tricked":{"initialFeeling":"tricked","underlyingFeelings":["angry","embarrassed","resentful","weary","hurt","mistrustful"],"needs":["integrity","trust","honesty","acceptance","peace","dignity"]},"unappreciated":{"initialFeeling":"unappreciated","underlyingFeelings":["embarrassed","flustered","melancholy","distressed","hesitant","low"],"needs":["to be heard","self-connection","clarity","confidence","sense of self","aliveness"]},"unheard":{"initialFeeling":"unheard","underlyingFeelings":["lonely","scared","embarrassed","disconnected","removed","apprehensive"],"needs":["nurturing","closeness","self-connection","confidence","aliveness","acceptance"]},"unloved":{"initialFeeling":"unloved","underlyingFeelings":["impotent","helpless","confused","weary","burnt out","exhausted"],"needs":["self-care","aliveness","rest","sense of self","to be seen","support"]},"unseen":{"initialFeeling":"unseen","underlyingFeelings":["angry","tired","frustrated","irritated","triggered","low"],"needs":["aliveness","purpose","hope","self-connection","peace","meaning"]},"unsupported":{"initialFeeling":"unsupported","underlyingFeelings":["resentful","frustrated","flustered","triggered","mistrustful","annoyed"],"needs":["mutuality","trust","harmony","knowing","partnership","to be seen"]},"unwanted":{"initialFeeling":"unwanted","underlyingFeelings":["anxious","resentful","overwhelmed","irritated","burnt out","mistrustful"],"needs":["autonomy","clarity","space","self-connection","knowing","peace of mind"]},"used":{"initialFeeling":"used","underlyingFeelings":["angry","frustrated","hostile","antagonistic","resentful","triggered"],"needs":["respect","to be seen","connection","support","consideration","self-connection"]},"victimized":{"initialFeeling":"victimized","underlyingFeelings":["angry","resentful","distressed","distracted","hurt","guarded"],"needs":["respect","to be seen","to matter","mutuality","compassion","acceptance"]},"violated":{"initialFeeling":"violated","underlyingFeelings":["hurt","scared","angry","defiant","burnt out","worried"],"needs":["rest","self-care","self-connection","meaning","hope","aliveness"]},"wronged":{"initialFeeling":"wronged","underlyingFeelings":["angry","resentful","disappointed","defiant","frustrated","annoyed"],"needs":["consideration","justice","peace","structure","understanding","acceptance"]}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFNBQVM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxpQkFBaUI7QUFDaEU7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxTQUFTO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEltQztBQUNEO0FBQ1k7QUFDSjtBQUNFO0FBQ1k7OztBQUdqRDtBQUNQLElBQUksaURBQWMsT0FBTyx1REFBYztBQUN2QztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnREFBYTtBQUN2QywwQkFBMEIseURBQVcsQ0FBQyw2Q0FBVTtBQUNoRCwwQkFBMEIsZ0RBQWE7QUFDdkMsMEJBQTBCLHlEQUFXLENBQUMsNkNBQVU7QUFDaEQsMEJBQTBCLGdEQUFhO0FBQ3ZDLDBCQUEwQix5REFBVyxDQUFDLDZDQUFVO0FBQ2hELDBCQUEwQixxRUFBb0I7QUFDOUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJxQztBQUNvQjtBQUMxQjtBQUNXOztBQUVuQztBQUNQO0FBQ0Esb0NBQW9DLDZDQUFVO0FBQzlDO0FBQ0E7O0FBRUEsSUFBSSw4Q0FBVztBQUNmLElBQUkscURBQWlCLDZCQUE2QixtRUFBb0I7QUFDdEU7Ozs7Ozs7Ozs7Ozs7O0FDYk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQSxZQUFZLFdBQVc7QUFDWTtBQUNEO0FBQ1U7QUFDRjtBQUNKO0FBQ2tCOzs7QUFHakQ7QUFDUCxJQUFJLGlEQUFjLE9BQU8sbURBQVk7QUFDckM7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQWE7QUFDdkMsMEJBQTBCLHlEQUFXLENBQUMsMkNBQVE7QUFDOUMsMEJBQTBCLGdEQUFhO0FBQ3ZDLDBCQUEwQix5REFBVyxDQUFDLDJDQUFRO0FBQzlDLDBCQUEwQixxRUFBb0I7QUFDOUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQnNDO0FBQ2dCO0FBQ3RCO0FBQ007O0FBRS9CO0FBQ1A7QUFDQSxnQ0FBZ0MsMkNBQVE7QUFDeEM7QUFDQTs7QUFFQSxJQUFJLDhDQUFXO0FBQ2YsSUFBSSxvREFBaUIseUJBQXlCLCtEQUFrQjtBQUNoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiMEM7QUFDSTs7QUFFdkM7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsdURBQWM7QUFDbkU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELG1EQUFZO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQVE7Ozs7QUFJUjs7QUFFQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsMkNBQVE7QUFDakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLDJDQUFRO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDOUdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvYnVpbGRTbGlkZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvY29tcGxhaW50RW1wYXRoeS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9jb21wbGFpbnRzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2NvbXBsZXRlQnV0dG9uLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2ZlZWxpbmdFbXBhdGh5LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2ZlZWxpbmdzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2hvbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2xpZGVyKHNsaWRlc0FycmF5LCBkaXZDbGFzcykge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnd3JhcHBlcicpXG4gICAgXG4gICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWNvbnRhaW5lcicpXG5cbiAgICAvLyB0b3VjaCBldmVudHMgKG1vYmlsZSlcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZSlcblxuICAgIC8vIG1vdXNlIGV2ZW50cyAoZGVza3RvcClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdG91Y2hTdGFydClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRvdWNoRW5kKVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdG91Y2hFbmQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRvdWNoTW92ZSlcblxuXG4gICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgICAgc3RhcnRQb3MgPSAwLFxuICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gMCxcbiAgICAgICAgcHJldlRyYW5zbGF0ZSA9IDAsXG4gICAgICAgIGFuaW1hdGlvbklEID0gMCxcbiAgICAgICAgY3VycmVudEluZGV4ID0gMFxuICAgIFxuICAgIGlmIChzbGlkZXNBcnJheS5sZW5ndGggPT0gNikge1xuICAgICAgICBzbGlkZXNBcnJheS5wdXNoKCcrJylcbiAgICB9XG4gICAgXG4gICAgc2xpZGVzQXJyYXkuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzbGlkZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHNsaWRlRGl2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlJylcbiAgICAgICAgc2xpZGVEaXYuY2xhc3NMaXN0LmFkZChgJHtkaXZDbGFzc31gKVxuICAgICAgICBzbGlkZURpdi5jbGFzc0xpc3QuYWRkKCdvdXRvZnJhbmdlJylcbiAgICAgICAgc2xpZGVEaXYuaW5uZXJUZXh0ID0gc2xpZGVcbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlRGl2KVxuICAgIH1cbiAgICApXG5cbiAgICAvLyBkaXNhYmxlIGRlZmF1bHQgYmVoYXZpb3JcbiAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hTdGFydCgpIHtcbiAgICAgICAgLy8gY3VycmVudEluZGV4ID0gaW5kZXhcbiAgICAgICAgLy8gZ2V0IHN0YXJ0IHBvc2l0aW9uIGJhc2VkIG9uIHdoZXRoZXIgdXNlciBpcyBvbiBtb2JpbGUgb3IgZGVza3RvcFxuICAgICAgICBzdGFydFBvcyA9IGdldFBvc2l0aW9uWChldmVudClcbiAgICBcbiAgICAgICAgaXNEcmFnZ2luZyA9IHRydWVcbiAgICAgICAgYW5pbWF0aW9uSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKVxuICAgICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnZ3JhYmJpbmcnKVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZVxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25JRClcbiAgICAgICAgY29uc3QgbW92ZWRCeSA9IGN1cnJlbnRUcmFuc2xhdGUgLSBwcmV2VHJhbnNsYXRlXG4gICAgICAgIGxldCBzbGlkZURpdnMgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi53cmFwcGVyXCIpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpXG5cbiAgICAgICAgaWYgKG1vdmVkQnkgPCAtNjAgJiYgY3VycmVudEluZGV4IDwgc2xpZGVzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIHNsaWRlRGl2c1tjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ291dG9mcmFuZ2UnKVxuICAgICAgICB9ICBcbiAgICAgICAgXG4gICAgICAgIGlmIChtb3ZlZEJ5ID4gNjAgJiYgY3VycmVudEluZGV4ID4gMCkge1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMVxuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnb3V0b2ZyYW5nZScpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldFBvc2l0aW9uQnlJbmRleCgpXG4gICAgICAgIHNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdncmFiYmluZycpXG4gICAgfVxuICAgICAgICBcblxuICAgIGZ1bmN0aW9uIHRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gZ2V0UG9zaXRpb25YKGV2ZW50KVxuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHByZXZUcmFuc2xhdGUgKyBjdXJyZW50UG9zaXRpb24gLSBzdGFydFBvc1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBmdW5jdGlvbiBnZXRQb3NpdGlvblgoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnR5cGUuaW5jbHVkZXMoJ21vdXNlJykgPyBldmVudC5wYWdlWCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGlvbigpIHtcbiAgICAgICAgc2V0U2xpZGVyUG9zaXRpb24oKVxuICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNsaWRlclBvc2l0aW9uKCkge1xuICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtjdXJyZW50VHJhbnNsYXRlfXB4KWBcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFBvc2l0aW9uQnlJbmRleCgpIHtcbiAgICAgICAgLy8gY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJylcbiAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IGN1cnJlbnRJbmRleCAqIC0yMDBcbiAgICAgICAgcHJldlRyYW5zbGF0ZSA9IGN1cnJlbnRUcmFuc2xhdGVcbiAgICAgICAgc2V0U2xpZGVyUG9zaXRpb24oKSBcbiAgICB9XG5cbiAgICBcbiAgICBzbGlkZXIubGFzdENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxldCBuZXdXb3JkID0gcHJvbXB0KFwidXNlIGFub3RoZXIgd29yZDpcIilcbiAgICAgICAgc2xpZGVzQXJyYXkuc3BsaWNlKC0xLCAwLCBuZXdXb3JkKVxuICAgICAgICBcbiAgICAgICAgbGV0IG5ld1NsaWRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbmV3U2xpZGVEaXYuY2xhc3NMaXN0LmFkZCgnc2xpZGUnKVxuICAgICAgICBuZXdTbGlkZURpdi5jbGFzc0xpc3QuYWRkKGAke2RpdkNsYXNzfWApXG4gICAgICAgIG5ld1NsaWRlRGl2LmlubmVyVGV4dCA9IG5ld1dvcmRcbiAgICAgICAgXG4gICAgICAgIHNsaWRlci5pbnNlcnRCZWZvcmUobmV3U2xpZGVEaXYsIHNsaWRlci5sYXN0Q2hpbGQpXG4gICAgICAgIHNsaWRlci5sYXN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNsaWRlc0FycmF5KVxuICAgICAgICAvLyBidWlsZFNsaWRlcihzbGlkZXNBcnJheSwgZGl2Q2xhc3MpICAgIFxuICAgIH0pXG5cbiAgICBzbGlkZXIuZmlyc3RDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdvdXRvZnJhbmdlJylcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2xpZGVyKVxuICAgIHJldHVybiB3cmFwcGVyXG5cbn1cblxuIiwiaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgc2VjdGlvbkhlYWRlciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBsb2FkQ29tcGxhaW50cyB9IGZyb20gXCIuL2NvbXBsYWludHNcIjtcbmltcG9ydCBjb21wbGFpbnRzIGZyb20gJy4vY29tcGxhaW50cy5qc29uJ1xuaW1wb3J0IHsgYnVpbGRTbGlkZXIgfSBmcm9tIFwiLi9idWlsZFNsaWRlclwiO1xuaW1wb3J0IHsgY3JlYXRlQ29tcGxldGVCdXR0b24gfSBmcm9tIFwiLi9jb21wbGV0ZUJ1dHRvblwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29tcGxhaW50RW1wYXRoeSh3b3JkKXtcbiAgICBsb2FkRW1wYXRoeU5hdih3b3JkLCBsb2FkQ29tcGxhaW50cylcbiAgICBsb2FkQ29udGFpbmVyKHdvcmQpO1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRDb250YWluZXIod29yZCl7XG4gICAgLy8gQ0xFQVIgQ09OVEFJTkVSICBcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgZmFsc2UpO1xuICAgIC8vIENSRUFURSBJTklUSUFMIEZFRUxJTkdTIFNFQ1RJT05cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIklOSVRJQUwgRkVFTElOR1NcIikpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkU2xpZGVyKGNvbXBsYWludHNbd29yZF1bXCJpbml0aWFsRmVlbGluZ3NcIl0sICdpbml0aWFsRmVlbGluZycpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiVU5ERVJMWUlORyBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcInVuZGVybHlpbmdGZWVsaW5nc1wiXSwgJ3VuZGVybHlpbmdGZWVsaW5nJykpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25IZWFkZXIoXCJORUVEU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcIm5lZWRzXCJdLCAnbmVlZCcpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29tcGxldGVCdXR0b24oKSlcbn0iLCJpbXBvcnQgeyBsb2FkTGlzdENvbnRhaW5lciB9IGZyb20gXCIuXCJcbmltcG9ydCB7IGxvYWRDb21wbGFpbnRFbXBhdGh5IH0gZnJvbSBcIi4vY29tcGxhaW50RW1wYXRoeVwiXG5pbXBvcnQgeyBsb2FkTGlzdE5hdiB9IGZyb20gXCIuXCJcbmltcG9ydCBjb21wbGFpbnRzIGZyb20gJy4vY29tcGxhaW50cy5qc29uJ1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbXBsYWludHMoKXtcbiAgICBjb25zdCBjb21wbGFpbnRMaXN0ID0gW11cbiAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBsYWludHMpKSB7XG4gICAgICAgICAgICBjb21wbGFpbnRMaXN0LnB1c2goa2V5KVxuICAgICAgICB9XG5cbiAgICBsb2FkTGlzdE5hdignVGhleVxcJ3JlIGJlaW5nLi4uJylcbiAgICBsb2FkTGlzdENvbnRhaW5lcihjb21wbGFpbnRMaXN0LCAnY29tcGxhaW50JywgbG9hZENvbXBsYWludEVtcGF0aHkpXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlQnV0dG9uKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjb21wbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIkknbSBjb21wbGV0ZVwiXG4gICAgY29tcGxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbGV0IG91dE9mUmFuZ2VTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3V0b2ZyYW5nZScpO1xuICAgICAgICBvdXRPZlJhbmdlU2xpZGVzLmZvckVhY2gocyA9PiBzLmNsYXNzTGlzdC5hZGQoJ2RpbScpKVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wbGV0ZUJ1dHRvblxufSIsIi8vIGltcG9ydCB7IGxvYWRIb21lIH0gZnJvbSBcIi4vaG9tZVwiO1xuaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgc2VjdGlvbkhlYWRlciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBidWlsZFNsaWRlciB9IGZyb20gXCIuL2J1aWxkU2xpZGVyXCI7XG5pbXBvcnQgeyBsb2FkRmVlbGluZ3MgfSBmcm9tIFwiLi9mZWVsaW5nc1wiO1xuaW1wb3J0IGZlZWxpbmdzIGZyb20gJy4vZmVlbGluZ3MuanNvbidcbmltcG9ydCB7IGNyZWF0ZUNvbXBsZXRlQnV0dG9uIH0gZnJvbSBcIi4vY29tcGxldGVCdXR0b25cIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZlZWxpbmdFbXBhdGh5KHdvcmQpe1xuICAgIGxvYWRFbXBhdGh5TmF2KHdvcmQsIGxvYWRGZWVsaW5ncylcbiAgICBsb2FkQ29udGFpbmVyKHdvcmQpO1xuICAgIFxufVxuXG5cbmZ1bmN0aW9uIGxvYWRDb250YWluZXIod29yZCl7XG4gICAgLy8gQ0xFQVIgQ09OVEFJTkVSICBcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsJyk7XG4gICAgLy8gTE9BRCBVTkRFUkxZSU5HIEZFRUxJTkdTIFNFQ1RJT05cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIlVOREVSTFlJTkcgRkVFTElOR1NcIikpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkU2xpZGVyKGZlZWxpbmdzW3dvcmRdW1widW5kZXJseWluZ0ZlZWxpbmdzXCJdLCAndW5kZXJseWluZ0ZlZWxpbmcnKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIk5FRURTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZFNsaWRlcihmZWVsaW5nc1t3b3JkXVtcIm5lZWRzXCJdLCAnbmVlZCcpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVDb21wbGV0ZUJ1dHRvbigpKVxufVxuXG4iLCJpbXBvcnQgeyBsb2FkTGlzdENvbnRhaW5lciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBsb2FkRmVlbGluZ0VtcGF0aHkgfSBmcm9tIFwiLi9mZWVsaW5nRW1wYXRoeVwiO1xuaW1wb3J0IHsgbG9hZExpc3ROYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IGZlZWxpbmdzIGZyb20gJy4vZmVlbGluZ3MuanNvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGZWVsaW5ncygpIHtcbiAgICBjb25zdCBmZWVsaW5nTGlzdCA9IFtdXG4gICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGZlZWxpbmdzKSkge1xuICAgICAgICBmZWVsaW5nTGlzdC5wdXNoKGtleSlcbiAgICB9XG5cbiAgICBsb2FkTGlzdE5hdignSVxcJ20gZmVlbGluZy4uLicpO1xuICAgIGxvYWRMaXN0Q29udGFpbmVyKGZlZWxpbmdMaXN0LCAnZmVlbGluZycsIGxvYWRGZWVsaW5nRW1wYXRoeSlcbn1cbiIsImltcG9ydCB7IGxvYWRGZWVsaW5ncyB9IGZyb20gXCIuL2ZlZWxpbmdzXCI7XG5pbXBvcnQgeyBsb2FkQ29tcGxhaW50cyB9IGZyb20gXCIuL2NvbXBsYWludHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRIb21lKCkge1xuICAgIGxvYWROYXYoKTtcbiAgICBsb2FkQ29udGFpbmVyKCk7XG59XG5cbi8vIExPQUQgTkFWIEJBUiBTVFlMRUQgT05MWSBGT1IgSE9NRSBNT0RVTEVcbmZ1bmN0aW9uIGxvYWROYXYoKXtcbiAgICBjb25zdCBuYXZIZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmhlYWQnKVxuICAgIG5hdkhlYWQuaW5uZXJIVE1MID0gJydcbiAgICBuYXZIZWFkLmNsYXNzTGlzdC5yZW1vdmUoJ3N1YnNlY3Rpb24nKVxuXG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IFwiIFwiXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuICAgIGNvbnN0IGluZm9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbmZvQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9pbmZvLWNpcmNsZS5zdmdcIlxuICAgIGluZm9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVJbmZvQm94KVxuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoaW5mb0J1dHRvbilcbiAgICBcbiAgICByZXR1cm4gbmF2SGVhZDtcbn1cblxuLy8gTE9BRCBDT05UQUlORVIgU1RZTEVEIE9OTFkgRk9SIEhPTUUgTU9EVUxFXG5mdW5jdGlvbiBsb2FkQ29udGFpbmVyKCl7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuICAgIC8vIGNsZWFyIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwnKVxuXG4gICAgLy8gYWRkIGNvbXBsYWludCBzZWN0aW9uIGJ1dHRvblxuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiU1RBUlQgV0lUSCBBIENPTVBMQUlOVFwiKSlcbiAgICBjb25zdCBjb21wbGFpbnRTZWN0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uQnV0dG9uJylcbiAgICBjb21wbGFpbnRTZWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2NvbXBsYWludCcpXG4gICAgY29uc3QgY29tcGxhaW50UXVvdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbXBsYWludFF1b3RlLmNsYXNzTGlzdC5hZGQoJ2V4YW1wbGVRdW90ZScpXG4gICAgY29tcGxhaW50UXVvdGUuaW5uZXJUZXh0ID0gJ1RoZXlcXCdyZSBiZWluZy4uLidcbiAgICBjb21wbGFpbnRTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKGNvbXBsYWludFF1b3RlKVxuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkQ29tcGxhaW50cylcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcGxhaW50U2VjdGlvbkJ1dHRvbilcblxuICAgIC8vIGFkZCBmZWVsaW5nIHNlY3Rpb24gYnV0dG9uXG4gICAgLy8gY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25IZWFkZXIoXCJTVEFSVCBXSVRIIEEgRkVFTElOR1wiKSlcbiAgICBjb25zdCBmZWVsaW5nU2VjdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25CdXR0b24nKVxuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZlZWxpbmcnKVxuICAgIGNvbnN0IGZlZWxpbmdRdW90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZmVlbGluZ1F1b3RlLmNsYXNzTGlzdC5hZGQoJ2V4YW1wbGVRdW90ZScpXG4gICAgZmVlbGluZ1F1b3RlLmlubmVyVGV4dCA9ICdJXFwnbSBmZWVsaW5nLi4uJ1xuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKGZlZWxpbmdRdW90ZSlcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRGZWVsaW5ncylcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZmVlbGluZ1NlY3Rpb25CdXR0b24pXG5cbiAgICAvLyBjcmVhdGUgaGlkZGVuIGluZm9Cb3hcbiAgICBjb25zdCBpbmZvQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBpbmZvQm94LmNsYXNzTGlzdC5hZGQoJ2luZm9Cb3gnKVxuICAgIGluZm9Cb3gudGV4dENvbnRlbnQgPSBcIkFuIG9ubGluZSBndWlkZSB0byBzdXBwb3J0IHRoZSBzZWxmLWVtcGF0aHkgcHJvY2Vzcy4gU3RhcnQgd2l0aCBhIGNvbXBsYWludCBvciBmZWVsaW5nIHRvIGNvbm5lY3Qgd2l0aCB5b3VyIHVuZGVybHlpbmcgZmVlbGluZ3MgYW5kIG5lZWRzLiBObyB1c2VyIGluZm9ybWF0aW9uIGlzIHJlY29yZGVkLlwiXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9Cb3gpXG5cblxuICAgIHJldHVybiBjb250YWluZXI7XG59XG5cblxuZnVuY3Rpb24gdG9nZ2xlSW5mb0JveCgpIHtcbiAgICBjb25zdCBpbmZvQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm9Cb3gnKVxuICAgIGluZm9Cb3guY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpXG4gICAgLy8gYWRkIGNsb3NlIGJ1dHRvbiB0byBpbmZvQm94LiBhZGQgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdG9nZ2xlIHNob3cgY2xhc3Ncbn0iLCJpbXBvcnQgeyBsb2FkSG9tZSB9IGZyb20gXCIuL2hvbWVcIjtcblxuLy8gUEFHRSBMT0FEIEZVTkNUSU9OIENSRUFURVMgUEFHRSBTVFJVQ1RVUkUgRk9SIERPTSBNQU5JUFVMQVRJT04gQlkgT1RIRVIgTU9EVUxFU1xuZnVuY3Rpb24gcGFnZUxvYWQoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgbmF2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibmF2aGVhZFwiKVxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29udGFpbmVyXCIpXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXJcIilcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChuYXYpXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuLy8gSU5JVElBTElaRSBBUFAgQlkgTE9BRElORyBUSEUgRE9NIEVMRU1FTlRTIEFORCBUSEVOIENBTExJTkcgVEhFIExPQURIT01FIE1PRFVMRVxucGFnZUxvYWQoKVxubG9hZEhvbWUoKVxuXG5cblxuLy8gRlVOQ1RJT05TIEJFTE9XIEFSRSBTSEFSRUQgQkVUV0VFTiBBTkQgQ0FMTEVEIEJZIE9USEVSIE1PRFVMRVM6XG5cbi8vIFJFVFVSTlMgTkFWIEJBUiBTVFlMRUQgRk9SIFBBR0UgMiBXSVRIIFNFTEVDVEVEIFdPUkQgSU4gSEVBREVSXG5leHBvcnQgZnVuY3Rpb24gbG9hZExpc3ROYXYoaGVhZGVyVGV4dCl7XG4gICAgY29uc3QgbmF2SGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZoZWFkJylcbiAgICBuYXZIZWFkLmlubmVySFRNTCA9ICcnXG4gICAgbmF2SGVhZC5jbGFzc0xpc3QuYWRkKCdzdWJzZWN0aW9uJylcbiAgICAvLyBsZXQgc2VhcmNoQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIC8vIHNlYXJjaEFyZWEuc3JjID0gJy4vaWNvbnMvc2VhcmNoLnN2ZydcbiAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRpdGxlJylcbiAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gaGVhZGVyVGV4dFxuICAgIGxldCBob21lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBob21lQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9ob3VzZS5zdmdcIlxuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkSG9tZSlcbiAgICAvLyBuYXZIZWFkLmFwcGVuZENoaWxkKHNlYXJjaEFyZWEpO1xuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuXG4gICAgcmV0dXJuIG5hdkhlYWRcbn1cblxuXG4vLyBSRVRVUk5TIEEgTElTVCBPRiBESVZTIElOIFRIRSBDT05UQUlORVIgRk9SIFBBR0UgMlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRMaXN0Q29udGFpbmVyKGxpc3QsIGxpc3RDbGFzcywgbGlzdEZ1bmN0aW9uKXtcbiAgICAvLyBDTEVBUiBDT05UQUlORVJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsJylcblxuICAgIFxuICAgIGNvbnN0IGl0ZW1QcmVzc2VkID0gKGUpID0+IHtcbiAgICAgICAgbGlzdEZ1bmN0aW9uKGUudGFyZ2V0LmlubmVyVGV4dClcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGxpc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKCdyZWN0YW5nbGUnLCBsaXN0Q2xhc3MpO1xuICAgICAgICBsaXN0RGl2LmlubmVyVGV4dCA9IGxpc3RbaV07XG4gICAgICAgIGxpc3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpdGVtUHJlc3NlZClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3REaXYpXG4gICAgfVxuICAgIC8vIEFERCArIERJViBXSVRIIENMSUNLIEVWRU5UXG4gICAgbGV0IHBsdXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbHVzRGl2LmNsYXNzTGlzdC5hZGQoJ3JlY3RhbmdsZScsIGxpc3RDbGFzcyk7XG4gICAgcGx1c0Rpdi5pbm5lclRleHQgPSAnKyc7XG4gICAgcGx1c0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHJvbXB0KFwiU3VnZ2VzdCBhbm90aGVyIHdvcmQ6XCIpXG4gICAgfSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGx1c0RpdilcblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vLyBSRVRVUk5TIE5BViBCQVIgU1RZTEVEIEZPUiBQQUdFIDMgV0lUSCBTRUxFQ1RFRCBXT1JEIElOIEhFQURFUlxuLy8gQkFDSyBGVU5DVElPTiBQT0lOVFMgVE8gUFJFVklPVVMgUEFHRSBNT0RVTEVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1wYXRoeU5hdih3b3JkLCBiYWNrRnVuY3Rpb24pe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LmFkZCgnc3Vic2VjdGlvbicpXG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBiYWNrQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9hcnJvdy1sZWZ0LXNob3J0LnN2Z1wiXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tGdW5jdGlvbik7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHdvcmRcbiAgICBsZXQgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaG9tZUJ1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaG91c2Uuc3ZnXCJcbiAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEhvbWUpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcblxuICAgIHJldHVybiBuYXZIZWFkXG59XG5cblxuLy8gUkVUVVJOUyBBIEhFQURFUiBURVhUIERJViBVU0VEIE9OIFBBR0UgM1xuZXhwb3J0IGZ1bmN0aW9uIHNlY3Rpb25IZWFkZXIodGV4dCl7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbkhlYWRlcicpXG4gICAgaGVhZGVyLmlubmVyVGV4dCA9IHRleHRcbiAgICBcbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
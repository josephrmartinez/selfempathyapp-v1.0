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







function loadComplaintEmpathy(word){
    (0,___WEBPACK_IMPORTED_MODULE_0__.loadEmpathyNav)(word, _complaints__WEBPACK_IMPORTED_MODULE_1__.loadComplaints)
    loadContainer(word);
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    container.setAttribute('draggable', false);
    // CREATE INITIAL FEELINGS SECTION
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("INITIAL FEELINGS"))
    const initialFeelingSlider = (0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["initialFeelings"], 'initialFeeling')
    console.log(initialFeelingSlider)
    container.appendChild(initialFeelingSlider)
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("UNDERLYING FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("NEEDS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["needs"], 'need'));
    const completeButton = document.createElement('button')
    completeButton.innerText = "I'm complete"
    container.appendChild(completeButton)
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

    (0,___WEBPACK_IMPORTED_MODULE_0__.loadListNav)('"They\'re being..."')
    ;(0,___WEBPACK_IMPORTED_MODULE_0__.loadListContainer)(complaintList, 'complaint', _complaintEmpathy__WEBPACK_IMPORTED_MODULE_1__.loadComplaintEmpathy)
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
/* harmony import */ var _feelings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feelings */ "./src/feelings.js");
/* harmony import */ var _feelings_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feelings.json */ "./src/feelings.json");
// import { loadHome } from "./home";







function loadFeelingEmpathy(word){
    (0,___WEBPACK_IMPORTED_MODULE_0__.loadEmpathyNav)(word, _feelings__WEBPACK_IMPORTED_MODULE_1__.loadFeelings)
    loadContainer(word);
    
}


function loadContainer(word){
    // CLEAR CONTAINER  
    const container = document.getElementById('container')
    container.innerHTML = ''
    // LOAD UNDERLYING FEELINGS SECTION
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("UNDERLYING FEELINGS"))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionDivCarousel)(_feelings_json__WEBPACK_IMPORTED_MODULE_2__[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("NEEDS"))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionDivCarousel)(_feelings_json__WEBPACK_IMPORTED_MODULE_2__[word]["needs"], 'need'))
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

    (0,___WEBPACK_IMPORTED_MODULE_0__.loadListNav)('"I\'m feeling..."');
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
    sectionTitle.innerText = "self-empathy"
    navHead.appendChild(sectionTitle);
    const infoButton = document.createElement('img');
    infoButton.src = "./icons/info-circle.svg"
    infoButton.addEventListener('click', openInfoPage)
    navHead.appendChild(infoButton)
    
    return navHead;
}

// LOAD CONTAINER STYLED ONLY FOR HOME MODULE
function loadContainer(){
    const container = document.getElementById('container');
    // clear container
    container.innerHTML = ''
    
    // add intro text
    const introText = document.createElement('div')
    introText.classList.add('introText')
    introText.innerText = "Observe what you\nare experiencing.\n\nGet in touch with your\nunderlying needs."
    container.appendChild(introText)

    // add complaint section button
    const complaintSectionButton = document.createElement('div');
    complaintSectionButton.classList.add('sectionButton')
    const startTextComplaint = document.createElement('div')
    startTextComplaint.classList.add('startWith')
    startTextComplaint.innerText = "start with a complaint"
    const complaintQuote = document.createElement('div')
    complaintQuote.classList.add('exampleQuote')
    complaintQuote.innerText = '\"They\'re being...\"'
    complaintSectionButton.appendChild(startTextComplaint)
    complaintSectionButton.appendChild(complaintQuote)
    complaintSectionButton.addEventListener('click', _complaints__WEBPACK_IMPORTED_MODULE_1__.loadComplaints)
    container.appendChild(complaintSectionButton)

    // add feeling section button
    const feelingSectionButton = document.createElement('div');
    feelingSectionButton.classList.add('sectionButton')
    const startTextFeeling = document.createElement('div')
    startTextFeeling.classList.add('startWith')
    startTextFeeling.innerText = "start with a feeling"
    const feelingQuote = document.createElement('div')
    feelingQuote.classList.add('exampleQuote')
    feelingQuote.innerText = '\"I\'m feeling...\"'
    feelingSectionButton.appendChild(startTextFeeling)
    feelingSectionButton.appendChild(feelingQuote)
    feelingSectionButton.addEventListener('click', _feelings__WEBPACK_IMPORTED_MODULE_0__.loadFeelings)
    container.appendChild(feelingSectionButton)

    return container;
}

function openInfoPage(){
    alert("An online guide to support the self-empathy process.")
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "empathySectionDivCarousel": () => (/* binding */ empathySectionDivCarousel),
/* harmony export */   "empathySectionHeader": () => (/* binding */ empathySectionHeader),
/* harmony export */   "loadEmpathyNav": () => (/* binding */ loadEmpathyNav),
/* harmony export */   "loadListContainer": () => (/* binding */ loadListContainer),
/* harmony export */   "loadListNav": () => (/* binding */ loadListNav)
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
    let searchArea = document.createElement('img');
    searchArea.src = './icons/search.svg'
    const sectionTitle = document.createElement('div');
    sectionTitle.classList.add('sectionTitle')
    sectionTitle.innerText = headerText
    let homeButton = document.createElement('img')
    homeButton.src = "./icons/house.svg"
    homeButton.addEventListener('click', _home__WEBPACK_IMPORTED_MODULE_0__.loadHome)
    navHead.appendChild(searchArea);
    navHead.appendChild(sectionTitle);
    navHead.appendChild(homeButton);

    return navHead
}


// RETURNS A LIST OF DIVS IN THE CONTAINER FOR PAGE 2
function loadListContainer(list, listClass, listFunction){
    // CLEAR CONTAINER
    const container = document.getElementById('container')
    container.innerHTML = ''
    
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
function empathySectionHeader(text){
    const initialFeelingsHeader = document.createElement('div')
    initialFeelingsHeader.classList.add('empathySectionHeader')
    initialFeelingsHeader.innerText = text
    
    return initialFeelingsHeader
}




// RETURNS CAROUSEL OF DIVS USED ON PAGE 3
function empathySectionDivCarousel(array, divClass){
    const gridCarousel = document.createElement('div');
    gridCarousel.classList.add('empathySectionDivCarousel');
    buildCarousel()

    function buildCarousel() {
        gridCarousel.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const empathyGuessDivCarousel = document.createElement('div');
            empathyGuessDivCarousel.classList.add('empathyGuessDivCarousel')
            empathyGuessDivCarousel.classList.add(`${divClass}`)
            empathyGuessDivCarousel.innerText = array[i];
            gridCarousel.appendChild(empathyGuessDivCarousel)
        }
        const addGuess = document.createElement('div');
        addGuess.classList.add('empathyGuessDivCarousel')
        addGuess.classList.add(`${divClass}`)
        addGuess.innerText = "+";
        addGuess.addEventListener('click', e => {
            let input = prompt("Use another term: ")
            array.push(input)
            buildCarousel()
        })
        gridCarousel.appendChild(addGuess)
    }



    return gridCarousel
}




// RETURNS GRID OF DIVS USED ON PAGE 3
// THIS FUNCTION IS DEPRECATED
// export function empathySectionDivGrid(array, divClass){
//     const gridDiv = document.createElement('div');
//     gridDiv.classList.add('empathySectionDivGrid');
    
//     for (let i = 0; i < array.length; i++) {
//         const empathyGuessDiv = document.createElement('div');
//         empathyGuessDiv.classList.add('empathyGuessDiv')
//         empathyGuessDiv.classList.add(`${divClass}`)
//         empathyGuessDiv.addEventListener('click', () => {empathyGuessDiv.classList.toggle('selected')});
//         empathyGuessDiv.innerText = array[i];
//         gridDiv.appendChild(empathyGuessDiv)
//     }

//     return gridDiv
// }

/***/ }),

/***/ "./src/complaints.json":
/*!*****************************!*\
  !*** ./src/complaints.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('{"aggressive":{"complaint":"aggressive","initialFeelings":["attacked","belittled","intimidated","victimized","violated","threatened"],"underlyingFeelings":["angry","sad","resentment","frustrated","concerned","afraid"],"needs":["safety","autonomy","choice","consideration","respect","ease"]},"arrogant":{"complaint":"arrogant","initialFeelings":["belittled","diminished","ignored","unseen","disliked","trampled"],"underlyingFeelings":["sad","hurt","frustrated","resentful","triggered","defensive"],"needs":["to be seen","inclusion","to matter","engagement","resonance","mutuality"]},"cheap":{"complaint":"cheap","initialFeelings":["cheated","ignored","insulted","let down","rejected","unappreciated"],"underlyingFeelings":["angry","sad","resentment","frustrated","concerned","worried"],"needs":["mutuality","appreciation","equality","shared reality","respect","connection"]},"clueless":{"complaint":"clueless","initialFeelings":["let down","invalidated","disappointed","disrespected","annoyed","ripped off"],"underlyingFeelings":["antagonistic","frustrated","discouraged","disengaged","indifferent","pessimistic"],"needs":["consistency","trust","dependability","growth","congruence","resonance"]},"condescending":{"complaint":"condescending","initialFeelings":["belittled","invalidated","criticized","discounted","unappreciated","diminished"],"underlyingFeelings":["angry","frustrated","antagonistic","resentment","confused","worried"],"needs":["respect","resonance","understanding","consideration","mutuality","to be seen"]},"confrontational":{"complaint":"confrontational","initialFeelings":["belittled","harassed","criticized","discounted","unappreciated","threatened"],"underlyingFeelings":["angry","frustrated","antagonistic","resentment","frightened","anxious"],"needs":["respect","self-control","understanding","consideration","mutuality","safety"]},"controlling":{"complaint":"controlling","initialFeelings":["manipulated","boxed in","cornered","criticized","distrusted","overpowered"],"underlyingFeelings":["anxious","fearful","resentful","overwhelmed","antagonistic","worried"],"needs":["autonomy","independence","enjoyment","space","adaptability","self-care"]},"defensive":{"complaint":"defensive","initialFeelings":["belittled","blamed","criticized","discounted","invalidated","pressured"],"underlyingFeelings":["angry","frustrated","antagonistic","resentment","confused","worried"],"needs":["participation","self-connection","understanding","consideration","mutuality","to be heard"]},"flaky":{"complaint":"flaky","initialFeelings":["abandoned","disliked","unwanted","rejected","unloved","ignored"],"underlyingFeelings":["angry","discouraged","joyless","frustrated","antagonistic","embarrassed"],"needs":["predictability","dependability","consistency","resonance","shared reality","presence"]},"high-maintenance":{"complaint":"high-maintenance","initialFeelings":["overwhelmed","manipulated","overpowered","pressured","used","invisible"],"underlyingFeelings":["angry","resentment","joyless","reluctant","drained","disengaged"],"needs":["autonomy","space","mutuality","enjoyment","ease","predictability"]},"hypersensitive":{"complaint":"hypersensitive","initialFeelings":["blamed","distrusted","dumped on","demonized","misheard","criticized"],"underlyingFeelings":["angry","frustrated","defensive","scared","embarrassed","anxious"],"needs":["understanding","self-connection","connection","trust","autonomy","shared reality"]},"incompetent":{"complaint":"incompetent","initialFeelings":["cheated","ripped off","annoyed","let down","patronized","screwed"],"underlyingFeelings":["triggered","upset","antagonistic","worried","disappointed","concerned"],"needs":["trust","dependability","consistency","resonance","teamwork","growth"]},"inconsiderate":{"complaint":"inconsiderate","initialFeelings":["let down","left out","betrayed","unsupported","discounted","invalidated"],"underlyingFeelings":["sad","hurt","frustrated","resentful","drained","upset"],"needs":["trust","acknowledgement","appreciation","to be heard","to be seen","inclusion"]},"rambling":{"complaint":"rambling","initialFeelings":["ignored","invisible","left out","smothered","unappreciated","cornered"],"underlyingFeelings":["angry","frustrated","antagonistic","resentful","desperation","anxious"],"needs":["ease","clarity","understanding","inclusion","mutuality","self-expression"]},"overreacting":{"complaint":"overreacting","initialFeelings":["attacked","blamed","boxed in","criticized","distrusted","insulted"],"underlyingFeelings":["angry","defensive","irritated","afraid","antagonistic","worried"],"needs":["to be heard","self-connection","consideration","shared reality","clarity","mutuality"]},"self-absorbed":{"complaint":"self-absorbed","initialFeelings":["overwhelmed","ignored","dumped on","invisible","neglected","unseen"],"underlyingFeelings":["sad","anxious","disengaged","withdrawn","indifferent","frustrated"],"needs":["to be seen","belonging","inclusion","to contribute","resonance","shared reality"]}}');

/***/ }),

/***/ "./src/feelings.json":
/*!***************************!*\
  !*** ./src/feelings.json ***!
  \***************************/
/***/ ((module) => {

module.exports = JSON.parse('{"abandoned":{"initialFeeling":"abandoned","underlyingFeelings":["terrified","hurt","bewildered","sad","frightened","lonely"],"needs":["nurturing","connection","belonging","support","caring","strength"]},"abused":{"initialFeeling":"abused","underlyingFeelings":["angry","frustrated","frightened","","",""],"needs":["caring","nurturing","support","emotional well-being","physical well-being","consideration"]},"attacked":{"initialFeeling":"attacked","underlyingFeelings":["scared","angry","defensive","resentful","",""],"needs":["safety","inclusion","to be seen","trust","space",""]},"belittled":{"initialFeeling":"belittled","underlyingFeelings":["angry","frustrated","tense","distressed","",""],"needs":["respect","autonomy","to be seen","acknowledgement","appreciation",""]},"betrayed":{"initialFeeling":"betrayed","underlyingFeelings":["angry","hurt","disappointed","enraged","",""],"needs":["trust","dependability","honesty","self-connection","commitment","clarity"]},"blamed":{"initialFeeling":"blamed","underlyingFeelings":["angry","scared","confused","antagonistic","bewildered","hurt"],"needs":["self-expression","inclusion","to be heard","to be seen","space",""]},"boxed in":{"initialFeeling":"boxed in","underlyingFeelings":["angry","thwarted","scared","anxious","",""],"needs":["autonomy","choice","freedom","","",""]},"bullied":{"initialFeeling":"bullied","underlyingFeelings":["angry","scared","pressured","","",""],"needs":["autonomy","choice","safety","consideration","",""]},"cheated":{"initialFeeling":"cheated","underlyingFeelings":["angry","resentful","hurt","","",""],"needs":["honesty","fairness","justice","trust","reliability",""]},"coerced":{"initialFeeling":"coerced","underlyingFeelings":["angry","frustrated","frightened","thwarted","scared","sad"],"needs":["autonomy","choice","freedom","participation","",""]},"cornered":{"initialFeeling":"cornered","underlyingFeelings":["angry","scared","anxious","thwarted","",""],"needs":["autonomy","freedom","","","",""]},"criticized":{"initialFeeling":"criticized","underlyingFeelings":["in pain","scared","anxious","frustrated","humiliated","embarrassed"],"needs":["understanding","acknowledgement","recognition","accountability","connection","self-connection"]},"discounted":{"initialFeeling":"discounted","underlyingFeelings":["angry","hurt","embarrassed","frustrated","",""],"needs":["acknowledgement","inclusion","recognition","respect","to matter",""]},"diminished":{"initialFeeling":"diminished","underlyingFeelings":["angry","hurt","embarrassed","frustrated","",""],"needs":["acknowledgement","inclusion","recognition","respect","to matter",""]},"disliked":{"initialFeeling":"disliked","underlyingFeelings":["sad","lonely","hurt","longing","",""],"needs":["appreciation","connection","understanding","to be seen","friendship","inclusion"]},"distrusted":{"initialFeeling":"distrusted","underlyingFeelings":["sad","frustrated","hurt","","",""],"needs":["trust","honesty","understanding","","",""]},"dumped on":{"initialFeeling":"dumped on","underlyingFeelings":["angry","overwhelmed","","","",""],"needs":["respect","consideration","","","",""]},"harassed":{"initialFeeling":"harassed","underlyingFeelings":["angry","frustrated","pressured","frightened","",""],"needs":["respect","space","consideration","peace","",""]},"ignored":{"initialFeeling":"ignored","underlyingFeelings":["lonely","sad","scared","hurt","embarrassed",""],"needs":["belonging","connection","inclusion","community","participation",""]},"insulted":{"initialFeeling":"insulted","underlyingFeelings":["angry","embarrased","hurt","","",""],"needs":["respect","consideration","to be seen","recognition","",""]},"interrupted":{"initialFeeling":"interrupted","underlyingFeelings":["angry","frustrated","resentful","hurt","anxious","agitated"],"needs":["respect","to be heard","consideration","contribution","space","participation"]},"intimidated":{"initialFeeling":"intimidated","underlyingFeelings":["scared","anxious","depleted","regretful","contempt","nervous"],"needs":["safety","equality","empowerment","sense of self","meaning","peace"]},"invalidated":{"initialFeeling":"invalidated","underlyingFeelings":["angry","hurt","resentful","alienated","contempt","discouraged"],"needs":["appreciation","respect","to be seen","recognition","contribution","self-connection"]},"invisible":{"initialFeeling":"invisible","underlyingFeelings":["angry","sad","lonely","scared","mistrustful","lonely"],"needs":["to be seen","to be heard","to matter","belonging","community","hope"]},"isolated":{"initialFeeling":"isolated","underlyingFeelings":["lonely","afraid","scared","disconnected","indifferent","numb"],"needs":["community","inclusion","belonging","contribution","aliveness","spontaneity"]},"left out":{"initialFeeling":"left out","underlyingFeelings":["sad","lonely","anxious","perplexed","hurt","guarded"],"needs":["inclusion","to matter","purpose","contribution","partnership","sharing"]},"let down":{"initialFeeling":"let down","underlyingFeelings":["sad","disappointed","frightened","distracted","burnt out","weary"],"needs":["structure","aliveness","self-connection","purpose","self-care","creativity"]},"manipulated":{"initialFeeling":"manipulated","underlyingFeelings":["angry","scared","powerless","thwarted","frustrated","mistrustful"],"needs":["autonomy","empowerment","trust","equality","freedom","transparency"]},"misunderstood":{"initialFeeling":"misunderstood","underlyingFeelings":["embarrassed","flustered","melancholy","distressed","hesitant","low"],"needs":["to be heard","self-connection","clarity","confidence","sense of self","aliveness"]},"neglected":{"initialFeeling":"neglected","underlyingFeelings":["lonely","scared","embarrassed","disconnected","removed","apprehensive"],"needs":["nurturing","closeness","self-connection","confidence","aliveness","acceptance"]},"overpowered":{"initialFeeling":"overpowered","underlyingFeelings":["impotent","helpless","confused","weary","burnt out","exhausted"],"needs":["self-care","aliveness","rest","sense of self","to be seen","support"]},"overworked":{"initialFeeling":"overworked","underlyingFeelings":["angry","tired","frustrated","irritated","triggered","low"],"needs":["aliveness","purpose","hope","self-connection","peace","meaning"]},"patronized":{"initialFeeling":"patronized","underlyingFeelings":["resentful","frustrated","flustered","triggered","mistrustful","annoyed"],"needs":["mutuality","trust","harmony","knowing","partnership","to be seen"]},"pressured":{"initialFeeling":"pressured","underlyingFeelings":["anxious","resentful","overwhelmed","irritated","burnt out","mistrustful"],"needs":["autonomy","clarity","space","self-connection","knowing","peace of mind"]},"provoked":{"initialFeeling":"provoked","underlyingFeelings":["angry","frustrated","hostile","antagonistic","resentful","triggered"],"needs":["respect","to be seen","connection","support","consideration","self-connection"]},"put down":{"initialFeeling":"put down","underlyingFeelings":["angry","resentful","distressed","distracted","hurt","guarded"],"needs":["respect","to be seen","to matter","mutuality","compassion","acceptance"]},"rejected":{"initialFeeling":"rejected","underlyingFeelings":["hurt","scared","angry","defiant","burnt out","worried"],"needs":["rest","self-care","self-connection","meaning","hope","aliveness"]},"ripped off":{"initialFeeling":"ripped off","underlyingFeelings":["angry","resentful","disappointed","defiant","frustrated","annoyed"],"needs":["consideration","justice","peace","structure","understanding","acceptance"]},"smothered":{"initialFeeling":"smothered","underlyingFeelings":["frustrated","anxious","annoyed","perplexed","removed","weary"],"needs":["space","freedom","connection","mutuality","aliveness","to be seen"]},"taken for granted":{"initialFeeling":"taken for granted","underlyingFeelings":["angry","sad","hurt","disappointed","burnt out","weary"],"needs":["appreciation","connection","recognition","rest","aliveness","purpose"]},"threatened":{"initialFeeling":"threatened","underlyingFeelings":["scared","frightened","alarmed","agitated","defiant","terrified"],"needs":["autonomy","safety","respect","compassion","mutuality","to be seen"]},"trampled":{"initialFeeling":"trampled","underlyingFeelings":["angry","frustrated","overwhelmed","burnt out","hurt","powerless"],"needs":["respect","connection","support","to be seen","equality","to matter"]},"tricked":{"initialFeeling":"tricked","underlyingFeelings":["angry","embarrased","resentful","weary","hurt","mistrustful"],"needs":["integrity","trust","honesty","acceptance","peace","dignity"]},"unappreciated":{"initialFeeling":"unappreciated","underlyingFeelings":["embarrassed","flustered","melancholy","distressed","hesitant","low"],"needs":["to be heard","self-connection","clarity","confidence","sense of self","aliveness"]},"unheard":{"initialFeeling":"unheard","underlyingFeelings":["lonely","scared","embarrassed","disconnected","removed","apprehensive"],"needs":["nurturing","closeness","self-connection","confidence","aliveness","acceptance"]},"unloved":{"initialFeeling":"unloved","underlyingFeelings":["impotent","helpless","confused","weary","burnt out","exhausted"],"needs":["self-care","aliveness","rest","sense of self","to be seen","support"]},"unseen":{"initialFeeling":"unseen","underlyingFeelings":["angry","tired","frustrated","irritated","triggered","low"],"needs":["aliveness","purpose","hope","self-connection","peace","meaning"]},"unsupported":{"initialFeeling":"unsupported","underlyingFeelings":["resentful","frustrated","flustered","triggered","mistrustful","annoyed"],"needs":["mutuality","trust","harmony","knowing","partnership","to be seen"]},"unwanted":{"initialFeeling":"unwanted","underlyingFeelings":["anxious","resentful","overwhelmed","irritated","burnt out","mistrustful"],"needs":["autonomy","clarity","space","self-connection","knowing","peace of mind"]},"used":{"initialFeeling":"used","underlyingFeelings":["angry","frustrated","hostile","antagonistic","resentful","triggered"],"needs":["respect","to be seen","connection","support","consideration","self-connection"]},"victimized":{"initialFeeling":"victimized","underlyingFeelings":["angry","resentful","distressed","distracted","hurt","guarded"],"needs":["respect","to be seen","to matter","mutuality","compassion","acceptance"]},"violated":{"initialFeeling":"violated","underlyingFeelings":["hurt","scared","angry","defiant","burnt out","worried"],"needs":["rest","self-care","self-connection","meaning","hope","aliveness"]},"wronged":{"initialFeeling":"wronged","underlyingFeelings":["angry","resentful","disappointed","defiant","frustrated","annoyed"],"needs":["consideration","justice","peace","structure","understanding","acceptance"]}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2J1aWxkU2xpZGVyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2NvbXBsYWludEVtcGF0aHkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvY29tcGxhaW50cy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9mZWVsaW5nRW1wYXRoeS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9mZWVsaW5ncy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9ob21lLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBidWlsZFNsaWRlcihzbGlkZXNBcnJheSwgZGl2Q2xhc3MpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKVxuICAgIFxuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlci1jb250YWluZXInKVxuXG4gICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgICAgc3RhcnRQb3MgPSAwLFxuICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gMCxcbiAgICAgICAgcHJldlRyYW5zbGF0ZSA9IDAsXG4gICAgICAgIGFuaW1hdGlvbklEID0gMCxcbiAgICAgICAgY3VycmVudEluZGV4ID0gMFxuXG4gICAgc2xpZGVzQXJyYXkuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzbGlkZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHNsaWRlRGl2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlJylcbiAgICAgICAgc2xpZGVEaXYuY2xhc3NMaXN0LmFkZChgJHtkaXZDbGFzc31gKVxuICAgICAgICBzbGlkZURpdi5jbGFzc0xpc3QuYWRkKCdvdXRvZnJhbmdlJylcbiAgICAgICAgc2xpZGVEaXYuaW5uZXJUZXh0ID0gc2xpZGVcblxuXG4gICAgICAgIC8vIHRvdWNoIGV2ZW50cyAobW9iaWxlKVxuICAgICAgICBzbGlkZURpdi5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydChpbmRleCkpXG4gICAgICAgIHNsaWRlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmQpXG4gICAgICAgIHNsaWRlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZSlcblxuICAgICAgICAvLyBtb3VzZSBldmVudHMgKGRlc2t0b3ApXG4gICAgICAgIHNsaWRlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRvdWNoU3RhcnQoaW5kZXgpKVxuICAgICAgICBzbGlkZURpdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdG91Y2hFbmQpXG4gICAgICAgIHNsaWRlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0b3VjaEVuZClcbiAgICAgICAgc2xpZGVEaXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdG91Y2hNb3ZlKVxuXG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZURpdilcbiAgICB9XG4gICAgKVxuXG4gICAgLy8gZGlzYWJsZSBkZWZhdWx0IGJlaGF2aW9yXG4gICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaFN0YXJ0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IGluZGV4XG4gICAgICAgICAgICAvLyBnZXQgc3RhcnQgcG9zaXRpb24gYmFzZWQgb24gd2hldGhlciB1c2VyIGlzIG9uIG1vYmlsZSBvciBkZXNrdG9wXG4gICAgICAgICAgICBzdGFydFBvcyA9IGdldFBvc2l0aW9uWChldmVudClcbiAgICAgICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgICAgICBhbmltYXRpb25JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pXG4gICAgICAgICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnZ3JhYmJpbmcnKVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0b3VjaEVuZCgpIHtcbiAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbklEKVxuXG4gICAgICAgIGNvbnN0IG1vdmVkQnkgPSBjdXJyZW50VHJhbnNsYXRlIC0gcHJldlRyYW5zbGF0ZVxuXG4gICAgICAgIGxldCBzbGlkZURpdnMgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5zbGlkZXItY29udGFpbmVyXCIpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpXG5cbiAgICAgICAgaWYgKG1vdmVkQnkgPCAtNjAgJiYgY3VycmVudEluZGV4IDwgc2xpZGVzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIHNsaWRlRGl2c1tjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ291dG9mcmFuZ2UnKVxuICAgICAgICB9ICBcbiAgICAgICAgXG4gICAgICAgIGlmIChtb3ZlZEJ5ID4gNjAgJiYgY3VycmVudEluZGV4ID4gMCkge1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMVxuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnb3V0b2ZyYW5nZScpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldFBvc2l0aW9uQnlJbmRleCgpXG5cbiAgICAgICAgc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2dyYWJiaW5nJylcbiAgICB9XG4gICAgICAgIFxuXG4gICAgZnVuY3Rpb24gdG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBnZXRQb3NpdGlvblgoZXZlbnQpXG4gICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gcHJldlRyYW5zbGF0ZSArIGN1cnJlbnRQb3NpdGlvbiAtIHN0YXJ0UG9zXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIGZ1bmN0aW9uIGdldFBvc2l0aW9uWChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudHlwZS5pbmNsdWRlcygnbW91c2UnKSA/IGV2ZW50LnBhZ2VYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0aW9uKCkge1xuICAgICAgICBzZXRTbGlkZXJQb3NpdGlvbigpXG4gICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2xpZGVyUG9zaXRpb24oKSB7XG4gICAgICAgIHNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2N1cnJlbnRUcmFuc2xhdGV9cHgpYFxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpb25CeUluZGV4KCkge1xuICAgICAgICAvLyBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKVxuICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gY3VycmVudEluZGV4ICogLTE3MFxuICAgICAgICBwcmV2VHJhbnNsYXRlID0gY3VycmVudFRyYW5zbGF0ZVxuICAgICAgICBzZXRTbGlkZXJQb3NpdGlvbigpIFxuICAgIH1cblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2xpZGVyKVxuICAgIHJldHVybiB3cmFwcGVyXG59IiwiaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgZW1wYXRoeVNlY3Rpb25IZWFkZXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgbG9hZENvbXBsYWludHMgfSBmcm9tIFwiLi9jb21wbGFpbnRzXCI7XG5pbXBvcnQgY29tcGxhaW50cyBmcm9tICcuL2NvbXBsYWludHMuanNvbidcbmltcG9ydCB7IGJ1aWxkU2xpZGVyIH0gZnJvbSBcIi4vYnVpbGRTbGlkZXJcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbXBsYWludEVtcGF0aHkod29yZCl7XG4gICAgbG9hZEVtcGF0aHlOYXYod29yZCwgbG9hZENvbXBsYWludHMpXG4gICAgbG9hZENvbnRhaW5lcih3b3JkKTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkQ29udGFpbmVyKHdvcmQpe1xuICAgIC8vIENMRUFSIENPTlRBSU5FUiAgXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgZmFsc2UpO1xuICAgIC8vIENSRUFURSBJTklUSUFMIEZFRUxJTkdTIFNFQ1RJT05cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25IZWFkZXIoXCJJTklUSUFMIEZFRUxJTkdTXCIpKVxuICAgIGNvbnN0IGluaXRpYWxGZWVsaW5nU2xpZGVyID0gYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcImluaXRpYWxGZWVsaW5nc1wiXSwgJ2luaXRpYWxGZWVsaW5nJylcbiAgICBjb25zb2xlLmxvZyhpbml0aWFsRmVlbGluZ1NsaWRlcilcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5pdGlhbEZlZWxpbmdTbGlkZXIpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVtcGF0aHlTZWN0aW9uSGVhZGVyKFwiVU5ERVJMWUlORyBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcInVuZGVybHlpbmdGZWVsaW5nc1wiXSwgJ3VuZGVybHlpbmdGZWVsaW5nJykpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVtcGF0aHlTZWN0aW9uSGVhZGVyKFwiTkVFRFNcIikpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkU2xpZGVyKGNvbXBsYWludHNbd29yZF1bXCJuZWVkc1wiXSwgJ25lZWQnKSk7XG4gICAgY29uc3QgY29tcGxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIGNvbXBsZXRlQnV0dG9uLmlubmVyVGV4dCA9IFwiSSdtIGNvbXBsZXRlXCJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcGxldGVCdXR0b24pXG59IiwiaW1wb3J0IHsgbG9hZExpc3RDb250YWluZXIgfSBmcm9tIFwiLlwiXG5pbXBvcnQgeyBsb2FkQ29tcGxhaW50RW1wYXRoeSB9IGZyb20gXCIuL2NvbXBsYWludEVtcGF0aHlcIlxuaW1wb3J0IHsgbG9hZExpc3ROYXYgfSBmcm9tIFwiLlwiXG5pbXBvcnQgY29tcGxhaW50cyBmcm9tICcuL2NvbXBsYWludHMuanNvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRDb21wbGFpbnRzKCl7XG4gICAgY29uc3QgY29tcGxhaW50TGlzdCA9IFtdXG4gICAgICAgIGZvciAodmFyIGtleSBvZiBPYmplY3Qua2V5cyhjb21wbGFpbnRzKSkge1xuICAgICAgICAgICAgY29tcGxhaW50TGlzdC5wdXNoKGtleSlcbiAgICAgICAgfVxuXG4gICAgbG9hZExpc3ROYXYoJ1wiVGhleVxcJ3JlIGJlaW5nLi4uXCInKVxuICAgIGxvYWRMaXN0Q29udGFpbmVyKGNvbXBsYWludExpc3QsICdjb21wbGFpbnQnLCBsb2FkQ29tcGxhaW50RW1wYXRoeSlcbn0iLCIvLyBpbXBvcnQgeyBsb2FkSG9tZSB9IGZyb20gXCIuL2hvbWVcIjtcbmltcG9ydCB7IGxvYWRFbXBhdGh5TmF2IH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGVtcGF0aHlTZWN0aW9uSGVhZGVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGVtcGF0aHlTZWN0aW9uRGl2Q2Fyb3VzZWwgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgbG9hZEZlZWxpbmdzIH0gZnJvbSBcIi4vZmVlbGluZ3NcIjtcbmltcG9ydCBmZWVsaW5ncyBmcm9tICcuL2ZlZWxpbmdzLmpzb24nXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGZWVsaW5nRW1wYXRoeSh3b3JkKXtcbiAgICBsb2FkRW1wYXRoeU5hdih3b3JkLCBsb2FkRmVlbGluZ3MpXG4gICAgbG9hZENvbnRhaW5lcih3b3JkKTtcbiAgICBcbn1cblxuXG5mdW5jdGlvbiBsb2FkQ29udGFpbmVyKHdvcmQpe1xuICAgIC8vIENMRUFSIENPTlRBSU5FUiAgXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgLy8gTE9BRCBVTkRFUkxZSU5HIEZFRUxJTkdTIFNFQ1RJT05cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25IZWFkZXIoXCJVTkRFUkxZSU5HIEZFRUxJTkdTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXBhdGh5U2VjdGlvbkRpdkNhcm91c2VsKGZlZWxpbmdzW3dvcmRdW1widW5kZXJseWluZ0ZlZWxpbmdzXCJdLCAndW5kZXJseWluZ0ZlZWxpbmcnKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25IZWFkZXIoXCJORUVEU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25EaXZDYXJvdXNlbChmZWVsaW5nc1t3b3JkXVtcIm5lZWRzXCJdLCAnbmVlZCcpKVxufVxuXG4iLCJpbXBvcnQgeyBsb2FkTGlzdENvbnRhaW5lciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBsb2FkRmVlbGluZ0VtcGF0aHkgfSBmcm9tIFwiLi9mZWVsaW5nRW1wYXRoeVwiO1xuaW1wb3J0IHsgbG9hZExpc3ROYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IGZlZWxpbmdzIGZyb20gJy4vZmVlbGluZ3MuanNvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGZWVsaW5ncygpIHtcbiAgICBjb25zdCBmZWVsaW5nTGlzdCA9IFtdXG4gICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGZlZWxpbmdzKSkge1xuICAgICAgICBmZWVsaW5nTGlzdC5wdXNoKGtleSlcbiAgICB9XG5cbiAgICBsb2FkTGlzdE5hdignXCJJXFwnbSBmZWVsaW5nLi4uXCInKTtcbiAgICBsb2FkTGlzdENvbnRhaW5lcihmZWVsaW5nTGlzdCwgJ2ZlZWxpbmcnLCBsb2FkRmVlbGluZ0VtcGF0aHkpXG59XG4iLCJpbXBvcnQgeyBsb2FkRmVlbGluZ3MgfSBmcm9tIFwiLi9mZWVsaW5nc1wiO1xuaW1wb3J0IHsgbG9hZENvbXBsYWludHMgfSBmcm9tIFwiLi9jb21wbGFpbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSG9tZSgpIHtcbiAgICBsb2FkTmF2KCk7XG4gICAgbG9hZENvbnRhaW5lcigpO1xufVxuXG4vLyBMT0FEIE5BViBCQVIgU1RZTEVEIE9OTFkgRk9SIEhPTUUgTU9EVUxFXG5mdW5jdGlvbiBsb2FkTmF2KCl7XG4gICAgY29uc3QgbmF2SGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZoZWFkJylcbiAgICBuYXZIZWFkLmlubmVySFRNTCA9ICcnXG4gICAgbmF2SGVhZC5jbGFzc0xpc3QucmVtb3ZlKCdzdWJzZWN0aW9uJylcblxuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uVGl0bGUnKVxuICAgIHNlY3Rpb25UaXRsZS5pbm5lclRleHQgPSBcInNlbGYtZW1wYXRoeVwiXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuICAgIGNvbnN0IGluZm9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbmZvQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9pbmZvLWNpcmNsZS5zdmdcIlxuICAgIGluZm9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuSW5mb1BhZ2UpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChpbmZvQnV0dG9uKVxuICAgIFxuICAgIHJldHVybiBuYXZIZWFkO1xufVxuXG4vLyBMT0FEIENPTlRBSU5FUiBTVFlMRUQgT05MWSBGT1IgSE9NRSBNT0RVTEVcbmZ1bmN0aW9uIGxvYWRDb250YWluZXIoKXtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG4gICAgLy8gY2xlYXIgY29udGFpbmVyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgXG4gICAgLy8gYWRkIGludHJvIHRleHRcbiAgICBjb25zdCBpbnRyb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGludHJvVGV4dC5jbGFzc0xpc3QuYWRkKCdpbnRyb1RleHQnKVxuICAgIGludHJvVGV4dC5pbm5lclRleHQgPSBcIk9ic2VydmUgd2hhdCB5b3VcXG5hcmUgZXhwZXJpZW5jaW5nLlxcblxcbkdldCBpbiB0b3VjaCB3aXRoIHlvdXJcXG51bmRlcmx5aW5nIG5lZWRzLlwiXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGludHJvVGV4dClcblxuICAgIC8vIGFkZCBjb21wbGFpbnQgc2VjdGlvbiBidXR0b25cbiAgICBjb25zdCBjb21wbGFpbnRTZWN0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uQnV0dG9uJylcbiAgICBjb25zdCBzdGFydFRleHRDb21wbGFpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHN0YXJ0VGV4dENvbXBsYWludC5jbGFzc0xpc3QuYWRkKCdzdGFydFdpdGgnKVxuICAgIHN0YXJ0VGV4dENvbXBsYWludC5pbm5lclRleHQgPSBcInN0YXJ0IHdpdGggYSBjb21wbGFpbnRcIlxuICAgIGNvbnN0IGNvbXBsYWludFF1b3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb21wbGFpbnRRdW90ZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlUXVvdGUnKVxuICAgIGNvbXBsYWludFF1b3RlLmlubmVyVGV4dCA9ICdcXFwiVGhleVxcJ3JlIGJlaW5nLi4uXFxcIidcbiAgICBjb21wbGFpbnRTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKHN0YXJ0VGV4dENvbXBsYWludClcbiAgICBjb21wbGFpbnRTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKGNvbXBsYWludFF1b3RlKVxuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkQ29tcGxhaW50cylcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcGxhaW50U2VjdGlvbkJ1dHRvbilcblxuICAgIC8vIGFkZCBmZWVsaW5nIHNlY3Rpb24gYnV0dG9uXG4gICAgY29uc3QgZmVlbGluZ1NlY3Rpb25CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uQnV0dG9uJylcbiAgICBjb25zdCBzdGFydFRleHRGZWVsaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzdGFydFRleHRGZWVsaW5nLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0V2l0aCcpXG4gICAgc3RhcnRUZXh0RmVlbGluZy5pbm5lclRleHQgPSBcInN0YXJ0IHdpdGggYSBmZWVsaW5nXCJcbiAgICBjb25zdCBmZWVsaW5nUXVvdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZlZWxpbmdRdW90ZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlUXVvdGUnKVxuICAgIGZlZWxpbmdRdW90ZS5pbm5lclRleHQgPSAnXFxcIklcXCdtIGZlZWxpbmcuLi5cXFwiJ1xuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKHN0YXJ0VGV4dEZlZWxpbmcpXG4gICAgZmVlbGluZ1NlY3Rpb25CdXR0b24uYXBwZW5kQ2hpbGQoZmVlbGluZ1F1b3RlKVxuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEZlZWxpbmdzKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmZWVsaW5nU2VjdGlvbkJ1dHRvbilcblxuICAgIHJldHVybiBjb250YWluZXI7XG59XG5cbmZ1bmN0aW9uIG9wZW5JbmZvUGFnZSgpe1xuICAgIGFsZXJ0KFwiQW4gb25saW5lIGd1aWRlIHRvIHN1cHBvcnQgdGhlIHNlbGYtZW1wYXRoeSBwcm9jZXNzLlwiKVxufSIsImltcG9ydCB7IGxvYWRIb21lIH0gZnJvbSBcIi4vaG9tZVwiO1xuXG5cblxuLy8gUEFHRSBMT0FEIEZVTkNUSU9OIENSRUFURVMgUEFHRSBTVFJVQ1RVUkUgRk9SIERPTSBNQU5JUFVMQVRJT04gQlkgT1RIRVIgTU9EVUxFU1xuZnVuY3Rpb24gcGFnZUxvYWQoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgbmF2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibmF2aGVhZFwiKVxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29udGFpbmVyXCIpXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXJcIilcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChuYXYpXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuLy8gSU5JVElBTElaRSBBUFAgQlkgTE9BRElORyBUSEUgRE9NIEVMRU1FTlRTIEFORCBUSEVOIENBTExJTkcgVEhFIExPQURIT01FIE1PRFVMRVxucGFnZUxvYWQoKVxubG9hZEhvbWUoKVxuXG5cblxuLy8gRlVOQ1RJT05TIEJFTE9XIEFSRSBTSEFSRUQgQkVUV0VFTiBBTkQgQ0FMTEVEIEJZIE9USEVSIE1PRFVMRVM6XG5cbi8vIFJFVFVSTlMgTkFWIEJBUiBTVFlMRUQgRk9SIFBBR0UgMiBXSVRIIFNFTEVDVEVEIFdPUkQgSU4gSEVBREVSXG5leHBvcnQgZnVuY3Rpb24gbG9hZExpc3ROYXYoaGVhZGVyVGV4dCl7XG4gICAgY29uc3QgbmF2SGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZoZWFkJylcbiAgICBuYXZIZWFkLmlubmVySFRNTCA9ICcnXG4gICAgbmF2SGVhZC5jbGFzc0xpc3QuYWRkKCdzdWJzZWN0aW9uJylcbiAgICBsZXQgc2VhcmNoQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHNlYXJjaEFyZWEuc3JjID0gJy4vaWNvbnMvc2VhcmNoLnN2ZydcbiAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRpdGxlJylcbiAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gaGVhZGVyVGV4dFxuICAgIGxldCBob21lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBob21lQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9ob3VzZS5zdmdcIlxuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkSG9tZSlcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlYXJjaEFyZWEpO1xuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuXG4gICAgcmV0dXJuIG5hdkhlYWRcbn1cblxuXG4vLyBSRVRVUk5TIEEgTElTVCBPRiBESVZTIElOIFRIRSBDT05UQUlORVIgRk9SIFBBR0UgMlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRMaXN0Q29udGFpbmVyKGxpc3QsIGxpc3RDbGFzcywgbGlzdEZ1bmN0aW9uKXtcbiAgICAvLyBDTEVBUiBDT05UQUlORVJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBcbiAgICBjb25zdCBpdGVtUHJlc3NlZCA9IChlKSA9PiB7XG4gICAgICAgIGxpc3RGdW5jdGlvbihlLnRhcmdldC5pbm5lclRleHQpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpc3REaXYuY2xhc3NMaXN0LmFkZCgncmVjdGFuZ2xlJywgbGlzdENsYXNzKTtcbiAgICAgICAgbGlzdERpdi5pbm5lclRleHQgPSBsaXN0W2ldO1xuICAgICAgICBsaXN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaXRlbVByZXNzZWQpXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0RGl2KVxuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vLyBSRVRVUk5TIE5BViBCQVIgU1RZTEVEIEZPUiBQQUdFIDMgV0lUSCBTRUxFQ1RFRCBXT1JEIElOIEhFQURFUlxuLy8gQkFDSyBGVU5DVElPTiBQT0lOVFMgVE8gUFJFVklPVVMgUEFHRSBNT0RVTEVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1wYXRoeU5hdih3b3JkLCBiYWNrRnVuY3Rpb24pe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LmFkZCgnc3Vic2VjdGlvbicpXG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBiYWNrQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9hcnJvdy1sZWZ0LXNob3J0LnN2Z1wiXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tGdW5jdGlvbik7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHdvcmRcbiAgICBsZXQgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaG9tZUJ1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaG91c2Uuc3ZnXCJcbiAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEhvbWUpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcblxuICAgIHJldHVybiBuYXZIZWFkXG59XG5cblxuLy8gUkVUVVJOUyBBIEhFQURFUiBURVhUIERJViBVU0VEIE9OIFBBR0UgM1xuZXhwb3J0IGZ1bmN0aW9uIGVtcGF0aHlTZWN0aW9uSGVhZGVyKHRleHQpe1xuICAgIGNvbnN0IGluaXRpYWxGZWVsaW5nc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaW5pdGlhbEZlZWxpbmdzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2VtcGF0aHlTZWN0aW9uSGVhZGVyJylcbiAgICBpbml0aWFsRmVlbGluZ3NIZWFkZXIuaW5uZXJUZXh0ID0gdGV4dFxuICAgIFxuICAgIHJldHVybiBpbml0aWFsRmVlbGluZ3NIZWFkZXJcbn1cblxuXG5cblxuLy8gUkVUVVJOUyBDQVJPVVNFTCBPRiBESVZTIFVTRUQgT04gUEFHRSAzXG5leHBvcnQgZnVuY3Rpb24gZW1wYXRoeVNlY3Rpb25EaXZDYXJvdXNlbChhcnJheSwgZGl2Q2xhc3Mpe1xuICAgIGNvbnN0IGdyaWRDYXJvdXNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyaWRDYXJvdXNlbC5jbGFzc0xpc3QuYWRkKCdlbXBhdGh5U2VjdGlvbkRpdkNhcm91c2VsJyk7XG4gICAgYnVpbGRDYXJvdXNlbCgpXG5cbiAgICBmdW5jdGlvbiBidWlsZENhcm91c2VsKCkge1xuICAgICAgICBncmlkQ2Fyb3VzZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVtcGF0aHlHdWVzc0RpdkNhcm91c2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbC5jbGFzc0xpc3QuYWRkKCdlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbCcpXG4gICAgICAgICAgICBlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbC5jbGFzc0xpc3QuYWRkKGAke2RpdkNsYXNzfWApXG4gICAgICAgICAgICBlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbC5pbm5lclRleHQgPSBhcnJheVtpXTtcbiAgICAgICAgICAgIGdyaWRDYXJvdXNlbC5hcHBlbmRDaGlsZChlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbClcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhZGRHdWVzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRHdWVzcy5jbGFzc0xpc3QuYWRkKCdlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbCcpXG4gICAgICAgIGFkZEd1ZXNzLmNsYXNzTGlzdC5hZGQoYCR7ZGl2Q2xhc3N9YClcbiAgICAgICAgYWRkR3Vlc3MuaW5uZXJUZXh0ID0gXCIrXCI7XG4gICAgICAgIGFkZEd1ZXNzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5wdXQgPSBwcm9tcHQoXCJVc2UgYW5vdGhlciB0ZXJtOiBcIilcbiAgICAgICAgICAgIGFycmF5LnB1c2goaW5wdXQpXG4gICAgICAgICAgICBidWlsZENhcm91c2VsKClcbiAgICAgICAgfSlcbiAgICAgICAgZ3JpZENhcm91c2VsLmFwcGVuZENoaWxkKGFkZEd1ZXNzKVxuICAgIH1cblxuXG5cbiAgICByZXR1cm4gZ3JpZENhcm91c2VsXG59XG5cblxuXG5cbi8vIFJFVFVSTlMgR1JJRCBPRiBESVZTIFVTRUQgT04gUEFHRSAzXG4vLyBUSElTIEZVTkNUSU9OIElTIERFUFJFQ0FURURcbi8vIGV4cG9ydCBmdW5jdGlvbiBlbXBhdGh5U2VjdGlvbkRpdkdyaWQoYXJyYXksIGRpdkNsYXNzKXtcbi8vICAgICBjb25zdCBncmlkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4vLyAgICAgZ3JpZERpdi5jbGFzc0xpc3QuYWRkKCdlbXBhdGh5U2VjdGlvbkRpdkdyaWQnKTtcbiAgICBcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgICAgIGNvbnN0IGVtcGF0aHlHdWVzc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuLy8gICAgICAgICBlbXBhdGh5R3Vlc3NEaXYuY2xhc3NMaXN0LmFkZCgnZW1wYXRoeUd1ZXNzRGl2Jylcbi8vICAgICAgICAgZW1wYXRoeUd1ZXNzRGl2LmNsYXNzTGlzdC5hZGQoYCR7ZGl2Q2xhc3N9YClcbi8vICAgICAgICAgZW1wYXRoeUd1ZXNzRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge2VtcGF0aHlHdWVzc0Rpdi5jbGFzc0xpc3QudG9nZ2xlKCdzZWxlY3RlZCcpfSk7XG4vLyAgICAgICAgIGVtcGF0aHlHdWVzc0Rpdi5pbm5lclRleHQgPSBhcnJheVtpXTtcbi8vICAgICAgICAgZ3JpZERpdi5hcHBlbmRDaGlsZChlbXBhdGh5R3Vlc3NEaXYpXG4vLyAgICAgfVxuXG4vLyAgICAgcmV0dXJuIGdyaWREaXZcbi8vIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
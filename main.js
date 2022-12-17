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
        currentTranslate = currentIndex * -170
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
    container.setAttribute('draggable', false);
    // CREATE INITIAL FEELINGS SECTION
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("INITIAL FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["initialFeelings"], 'initialFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("UNDERLYING FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_3__.buildSlider)(_complaints_json__WEBPACK_IMPORTED_MODULE_2__[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("NEEDS"))
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

    (0,___WEBPACK_IMPORTED_MODULE_0__.loadListNav)('"They\'re being..."')
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
    // LOAD UNDERLYING FEELINGS SECTION
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("UNDERLYING FEELINGS"))
    container.appendChild((0,_buildSlider__WEBPACK_IMPORTED_MODULE_1__.buildSlider)(_feelings_json__WEBPACK_IMPORTED_MODULE_3__[word]["underlyingFeelings"], 'underlyingFeeling'))
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_0__.empathySectionHeader)("NEEDS"))
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
    sectionTitle.innerText = ""
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
    introText.innerText = "self-empathy process: start with a\ncomplaint or feeling to connect with\nyour underlying feelings and needs."
    container.appendChild(introText)

    // add complaint section button
    const complaintSectionButton = document.createElement('div');
    complaintSectionButton.classList.add('sectionButton')
    const startTextComplaint = document.createElement('div')
    startTextComplaint.classList.add('startWith')
    startTextComplaint.innerText = "start with a complaint"
    const complaintQuote = document.createElement('div')
    complaintQuote.classList.add('exampleQuote')
    complaintQuote.innerText = '"They\'re being..."'
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
    feelingQuote.innerText = '"I\'m feeling..."'
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


// !!! DEPRECATED !!! // RETURNS CAROUSEL OF DIVS USED ON PAGE 3 
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

module.exports = JSON.parse('{"abandoned":{"initialFeeling":"abandoned","underlyingFeelings":["terrified","hurt","bewildered","sad","frightened","lonely"],"needs":["nurturing","connection","belonging","support","caring","strength"]},"abused":{"initialFeeling":"abused","underlyingFeelings":["angry","frustrated","frightened","numb","contempt","nervous"],"needs":["caring","nurturing","support","emotional well-being","physical well-being","consideration"]},"attacked":{"initialFeeling":"attacked","underlyingFeelings":["scared","angry","defensive","resentful","contempt","discouraged"],"needs":["safety","inclusion","to be seen","trust","space","participation"]},"belittled":{"initialFeeling":"belittled","underlyingFeelings":["angry","frustrated","tense","distressed","mistrustful","lonely"],"needs":["respect","autonomy","to be seen","acknowledgement","appreciation","peace"]},"betrayed":{"initialFeeling":"betrayed","underlyingFeelings":["angry","hurt","disappointed","enraged","indifferent","numb"],"needs":["trust","dependability","honesty","self-connection","commitment","self-connection"]},"blamed":{"initialFeeling":"blamed","underlyingFeelings":["angry","scared","confused","antagonistic","hurt","guarded"],"needs":["self-expression","inclusion","to be heard","to be seen","space","hope"]},"boxed in":{"initialFeeling":"boxed in","underlyingFeelings":["angry","thwarted","scared","anxious","burnt out","weary"],"needs":["autonomy","choice","freedom","aliveness","sense of self","spontaneity"]},"bullied":{"initialFeeling":"bullied","underlyingFeelings":["angry","scared","pressured","triggered","frustrated","mistrustful"],"needs":["autonomy","choice","safety","consideration","to be seen","sharing"]},"cheated":{"initialFeeling":"cheated","underlyingFeelings":["angry","resentful","hurt","perplexed","hesitant","low"],"needs":["honesty","fairness","justice","trust","reliability","creativity"]},"coerced":{"initialFeeling":"coerced","underlyingFeelings":["angry","frustrated","frightened","thwarted","scared","sad"],"needs":["autonomy","choice","freedom","participation","to matter","transparency"]},"cornered":{"initialFeeling":"cornered","underlyingFeelings":["angry","scared","anxious","thwarted","contempt","nervous"],"needs":["autonomy","freedom","aliveness","choice","to matter","acceptance"]},"criticized":{"initialFeeling":"criticized","underlyingFeelings":["in pain","scared","anxious","frustrated","humiliated","embarrassed"],"needs":["understanding","acknowledgement","recognition","accountability","connection","acceptance"]},"discounted":{"initialFeeling":"discounted","underlyingFeelings":["angry","hurt","embarrassed","frustrated","contempt","nervous"],"needs":["acknowledgement","inclusion","recognition","respect","to matter","support"]},"diminished":{"initialFeeling":"diminished","underlyingFeelings":["angry","hurt","embarrassed","frustrated","contempt","discouraged"],"needs":["acknowledgement","inclusion","recognition","respect","to matter","meaning"]},"disliked":{"initialFeeling":"disliked","underlyingFeelings":["sad","lonely","hurt","longing","mistrustful","lonely"],"needs":["appreciation","connection","understanding","to be seen","friendship","to be seen"]},"dumped on":{"initialFeeling":"dumped on","underlyingFeelings":["angry","overwhelmed","anxious","antagonistic","hurt","guarded"],"needs":["respect","consideration","understanding","to be seen","friendship","peace"]},"harassed":{"initialFeeling":"harassed","underlyingFeelings":["angry","frustrated","pressured","frightened","burnt out","weary"],"needs":["respect","space","consideration","peace","aliveness","self-connection"]},"ignored":{"initialFeeling":"ignored","underlyingFeelings":["lonely","sad","scared","hurt","frustrated","mistrustful"],"needs":["belonging","connection","inclusion","community","participation","hope"]},"insulted":{"initialFeeling":"insulted","underlyingFeelings":["angry","embarrased","hurt","numb","hesitant","low"],"needs":["respect","consideration","to be seen","recognition","self-connection","spontaneity"]},"interrupted":{"initialFeeling":"interrupted","underlyingFeelings":["angry","frustrated","resentful","hurt","anxious","agitated"],"needs":["respect","to be heard","consideration","contribution","space","participation"]},"intimidated":{"initialFeeling":"intimidated","underlyingFeelings":["scared","anxious","depleted","regretful","contempt","nervous"],"needs":["safety","equality","empowerment","sense of self","meaning","peace"]},"invalidated":{"initialFeeling":"invalidated","underlyingFeelings":["angry","hurt","resentful","alienated","contempt","discouraged"],"needs":["appreciation","respect","to be seen","recognition","contribution","self-connection"]},"invisible":{"initialFeeling":"invisible","underlyingFeelings":["angry","sad","lonely","scared","mistrustful","lonely"],"needs":["to be seen","to be heard","to matter","belonging","community","hope"]},"isolated":{"initialFeeling":"isolated","underlyingFeelings":["lonely","afraid","scared","disconnected","indifferent","numb"],"needs":["community","inclusion","belonging","contribution","aliveness","spontaneity"]},"left out":{"initialFeeling":"left out","underlyingFeelings":["sad","lonely","anxious","perplexed","hurt","guarded"],"needs":["inclusion","to matter","purpose","contribution","partnership","sharing"]},"let down":{"initialFeeling":"let down","underlyingFeelings":["sad","disappointed","frightened","distracted","burnt out","weary"],"needs":["structure","aliveness","self-connection","purpose","self-care","creativity"]},"manipulated":{"initialFeeling":"manipulated","underlyingFeelings":["angry","scared","powerless","thwarted","frustrated","mistrustful"],"needs":["autonomy","empowerment","trust","equality","freedom","transparency"]},"misunderstood":{"initialFeeling":"misunderstood","underlyingFeelings":["embarrassed","flustered","melancholy","distressed","hesitant","low"],"needs":["to be heard","self-connection","clarity","confidence","sense of self","aliveness"]},"neglected":{"initialFeeling":"neglected","underlyingFeelings":["lonely","scared","embarrassed","disconnected","removed","apprehensive"],"needs":["nurturing","closeness","self-connection","confidence","aliveness","acceptance"]},"overpowered":{"initialFeeling":"overpowered","underlyingFeelings":["impotent","helpless","confused","weary","burnt out","exhausted"],"needs":["self-care","aliveness","rest","sense of self","to be seen","support"]},"overworked":{"initialFeeling":"overworked","underlyingFeelings":["angry","tired","frustrated","irritated","triggered","low"],"needs":["aliveness","purpose","hope","self-connection","peace","meaning"]},"patronized":{"initialFeeling":"patronized","underlyingFeelings":["resentful","frustrated","flustered","triggered","mistrustful","annoyed"],"needs":["mutuality","trust","harmony","knowing","partnership","to be seen"]},"pressured":{"initialFeeling":"pressured","underlyingFeelings":["anxious","resentful","overwhelmed","irritated","burnt out","mistrustful"],"needs":["autonomy","clarity","space","self-connection","knowing","peace of mind"]},"provoked":{"initialFeeling":"provoked","underlyingFeelings":["angry","frustrated","hostile","antagonistic","resentful","triggered"],"needs":["respect","to be seen","connection","support","consideration","self-connection"]},"put down":{"initialFeeling":"put down","underlyingFeelings":["angry","resentful","distressed","distracted","hurt","guarded"],"needs":["respect","to be seen","to matter","mutuality","compassion","acceptance"]},"rejected":{"initialFeeling":"rejected","underlyingFeelings":["hurt","scared","angry","defiant","burnt out","worried"],"needs":["rest","self-care","self-connection","meaning","hope","aliveness"]},"ripped off":{"initialFeeling":"ripped off","underlyingFeelings":["angry","resentful","disappointed","defiant","frustrated","annoyed"],"needs":["consideration","justice","peace","structure","understanding","acceptance"]},"smothered":{"initialFeeling":"smothered","underlyingFeelings":["frustrated","anxious","annoyed","perplexed","removed","weary"],"needs":["space","freedom","connection","mutuality","aliveness","to be seen"]},"taken for granted":{"initialFeeling":"taken for granted","underlyingFeelings":["angry","sad","hurt","disappointed","burnt out","weary"],"needs":["appreciation","connection","recognition","rest","aliveness","purpose"]},"threatened":{"initialFeeling":"threatened","underlyingFeelings":["scared","frightened","alarmed","agitated","defiant","terrified"],"needs":["autonomy","safety","respect","compassion","mutuality","to be seen"]},"trampled":{"initialFeeling":"trampled","underlyingFeelings":["angry","frustrated","overwhelmed","burnt out","hurt","powerless"],"needs":["respect","connection","support","to be seen","equality","to matter"]},"tricked":{"initialFeeling":"tricked","underlyingFeelings":["angry","embarrased","resentful","weary","hurt","mistrustful"],"needs":["integrity","trust","honesty","acceptance","peace","dignity"]},"unappreciated":{"initialFeeling":"unappreciated","underlyingFeelings":["embarrassed","flustered","melancholy","distressed","hesitant","low"],"needs":["to be heard","self-connection","clarity","confidence","sense of self","aliveness"]},"unheard":{"initialFeeling":"unheard","underlyingFeelings":["lonely","scared","embarrassed","disconnected","removed","apprehensive"],"needs":["nurturing","closeness","self-connection","confidence","aliveness","acceptance"]},"unloved":{"initialFeeling":"unloved","underlyingFeelings":["impotent","helpless","confused","weary","burnt out","exhausted"],"needs":["self-care","aliveness","rest","sense of self","to be seen","support"]},"unseen":{"initialFeeling":"unseen","underlyingFeelings":["angry","tired","frustrated","irritated","triggered","low"],"needs":["aliveness","purpose","hope","self-connection","peace","meaning"]},"unsupported":{"initialFeeling":"unsupported","underlyingFeelings":["resentful","frustrated","flustered","triggered","mistrustful","annoyed"],"needs":["mutuality","trust","harmony","knowing","partnership","to be seen"]},"unwanted":{"initialFeeling":"unwanted","underlyingFeelings":["anxious","resentful","overwhelmed","irritated","burnt out","mistrustful"],"needs":["autonomy","clarity","space","self-connection","knowing","peace of mind"]},"used":{"initialFeeling":"used","underlyingFeelings":["angry","frustrated","hostile","antagonistic","resentful","triggered"],"needs":["respect","to be seen","connection","support","consideration","self-connection"]},"victimized":{"initialFeeling":"victimized","underlyingFeelings":["angry","resentful","distressed","distracted","hurt","guarded"],"needs":["respect","to be seen","to matter","mutuality","compassion","acceptance"]},"violated":{"initialFeeling":"violated","underlyingFeelings":["hurt","scared","angry","defiant","burnt out","worried"],"needs":["rest","self-care","self-connection","meaning","hope","aliveness"]},"wronged":{"initialFeeling":"wronged","underlyingFeelings":["angry","resentful","disappointed","defiant","frustrated","annoyed"],"needs":["consideration","justice","peace","structure","understanding","acceptance"]}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9idWlsZFNsaWRlci5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9jb21wbGFpbnRFbXBhdGh5LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2NvbXBsYWludHMuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvY29tcGxldGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvZmVlbGluZ0VtcGF0aHkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvZmVlbGluZ3MuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvaG9tZS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gYnVpbGRTbGlkZXIoc2xpZGVzQXJyYXksIGRpdkNsYXNzKSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCd3cmFwcGVyJylcbiAgICBcbiAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdzbGlkZXItY29udGFpbmVyJylcblxuICAgIC8vIHRvdWNoIGV2ZW50cyAobW9iaWxlKVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdG91Y2hTdGFydClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaEVuZClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2hNb3ZlKVxuXG4gICAgLy8gbW91c2UgZXZlbnRzIChkZXNrdG9wKVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0b3VjaFN0YXJ0KVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdG91Y2hFbmQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0b3VjaEVuZClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdG91Y2hNb3ZlKVxuXG5cbiAgICBsZXQgaXNEcmFnZ2luZyA9IGZhbHNlLFxuICAgICAgICBzdGFydFBvcyA9IDAsXG4gICAgICAgIGN1cnJlbnRUcmFuc2xhdGUgPSAwLFxuICAgICAgICBwcmV2VHJhbnNsYXRlID0gMCxcbiAgICAgICAgYW5pbWF0aW9uSUQgPSAwLFxuICAgICAgICBjdXJyZW50SW5kZXggPSAwXG4gICAgXG4gICAgaWYgKHNsaWRlc0FycmF5Lmxlbmd0aCA9PSA2KSB7XG4gICAgICAgIHNsaWRlc0FycmF5LnB1c2goJysnKVxuICAgIH1cbiAgICBcbiAgICBzbGlkZXNBcnJheS5mb3JFYWNoKChzbGlkZSwgaW5kZXgpID0+IHtcbiAgICAgICAgbGV0IHNsaWRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgc2xpZGVEaXYuY2xhc3NMaXN0LmFkZCgnc2xpZGUnKVxuICAgICAgICBzbGlkZURpdi5jbGFzc0xpc3QuYWRkKGAke2RpdkNsYXNzfWApXG4gICAgICAgIHNsaWRlRGl2LmNsYXNzTGlzdC5hZGQoJ291dG9mcmFuZ2UnKVxuICAgICAgICBzbGlkZURpdi5pbm5lclRleHQgPSBzbGlkZVxuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGVEaXYpXG4gICAgfVxuICAgIClcblxuICAgIC8vIGRpc2FibGUgZGVmYXVsdCBiZWhhdmlvclxuICAgIHdpbmRvdy5vbmNvbnRleHRtZW51ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b3VjaFN0YXJ0KCkge1xuICAgICAgICAvLyBjdXJyZW50SW5kZXggPSBpbmRleFxuICAgICAgICAvLyBnZXQgc3RhcnQgcG9zaXRpb24gYmFzZWQgb24gd2hldGhlciB1c2VyIGlzIG9uIG1vYmlsZSBvciBkZXNrdG9wXG4gICAgICAgIHN0YXJ0UG9zID0gZ2V0UG9zaXRpb25YKGV2ZW50KVxuICAgIFxuICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZVxuICAgICAgICBhbmltYXRpb25JRCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pXG4gICAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdncmFiYmluZycpXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0b3VjaEVuZCgpIHtcbiAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbklEKVxuICAgICAgICBjb25zdCBtb3ZlZEJ5ID0gY3VycmVudFRyYW5zbGF0ZSAtIHByZXZUcmFuc2xhdGVcbiAgICAgICAgbGV0IHNsaWRlRGl2cyA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLndyYXBwZXJcIikucXVlcnlTZWxlY3RvckFsbCgnLnNsaWRlJylcblxuICAgICAgICBpZiAobW92ZWRCeSA8IC02MCAmJiBjdXJyZW50SW5kZXggPCBzbGlkZXNBcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBzbGlkZURpdnNbY3VycmVudEluZGV4XS5jbGFzc0xpc3QuYWRkKCdvdXRvZnJhbmdlJylcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCArPSAxO1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnb3V0b2ZyYW5nZScpXG4gICAgICAgIH0gIFxuICAgICAgICBcbiAgICAgICAgaWYgKG1vdmVkQnkgPiA2MCAmJiBjdXJyZW50SW5kZXggPiAwKSB7XG4gICAgICAgICAgICBzbGlkZURpdnNbY3VycmVudEluZGV4XS5jbGFzc0xpc3QuYWRkKCdvdXRvZnJhbmdlJylcbiAgICAgICAgICAgIGN1cnJlbnRJbmRleCAtPSAxXG4gICAgICAgICAgICBzbGlkZURpdnNbY3VycmVudEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdvdXRvZnJhbmdlJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc2V0UG9zaXRpb25CeUluZGV4KClcbiAgICAgICAgc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2dyYWJiaW5nJylcbiAgICB9XG4gICAgICAgIFxuXG4gICAgZnVuY3Rpb24gdG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBnZXRQb3NpdGlvblgoZXZlbnQpXG4gICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gcHJldlRyYW5zbGF0ZSArIGN1cnJlbnRQb3NpdGlvbiAtIHN0YXJ0UG9zXG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIGZ1bmN0aW9uIGdldFBvc2l0aW9uWChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudHlwZS5pbmNsdWRlcygnbW91c2UnKSA/IGV2ZW50LnBhZ2VYIDogZXZlbnQudG91Y2hlc1swXS5jbGllbnRYXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0aW9uKCkge1xuICAgICAgICBzZXRTbGlkZXJQb3NpdGlvbigpXG4gICAgICAgIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0U2xpZGVyUG9zaXRpb24oKSB7XG4gICAgICAgIHNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke2N1cnJlbnRUcmFuc2xhdGV9cHgpYFxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gc2V0UG9zaXRpb25CeUluZGV4KCkge1xuICAgICAgICAvLyBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKVxuICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gY3VycmVudEluZGV4ICogLTE3MFxuICAgICAgICBwcmV2VHJhbnNsYXRlID0gY3VycmVudFRyYW5zbGF0ZVxuICAgICAgICBzZXRTbGlkZXJQb3NpdGlvbigpIFxuICAgIH1cblxuICAgIFxuICAgIHNsaWRlci5sYXN0Q2hpbGQuYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbGV0IG5ld1dvcmQgPSBwcm9tcHQoXCJ1c2UgYW5vdGhlciB3b3JkOlwiKVxuICAgICAgICBzbGlkZXNBcnJheS5zcGxpY2UoLTEsIDAsIG5ld1dvcmQpXG4gICAgICAgIFxuICAgICAgICBsZXQgbmV3U2xpZGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBuZXdTbGlkZURpdi5jbGFzc0xpc3QuYWRkKCdzbGlkZScpXG4gICAgICAgIG5ld1NsaWRlRGl2LmNsYXNzTGlzdC5hZGQoYCR7ZGl2Q2xhc3N9YClcbiAgICAgICAgbmV3U2xpZGVEaXYuaW5uZXJUZXh0ID0gbmV3V29yZFxuICAgICAgICBcbiAgICAgICAgc2xpZGVyLmluc2VydEJlZm9yZShuZXdTbGlkZURpdiwgc2xpZGVyLmxhc3RDaGlsZClcbiAgICAgICAgc2xpZGVyLmxhc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdvdXRvZnJhbmdlJylcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2xpZGVzQXJyYXkpXG4gICAgICAgIC8vIGJ1aWxkU2xpZGVyKHNsaWRlc0FycmF5LCBkaXZDbGFzcykgICAgXG4gICAgfSlcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2xpZGVyKVxuICAgIHJldHVybiB3cmFwcGVyXG5cbn1cblxuIiwiaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgZW1wYXRoeVNlY3Rpb25IZWFkZXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgbG9hZENvbXBsYWludHMgfSBmcm9tIFwiLi9jb21wbGFpbnRzXCI7XG5pbXBvcnQgY29tcGxhaW50cyBmcm9tICcuL2NvbXBsYWludHMuanNvbidcbmltcG9ydCB7IGJ1aWxkU2xpZGVyIH0gZnJvbSBcIi4vYnVpbGRTbGlkZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbXBsZXRlQnV0dG9uIH0gZnJvbSBcIi4vY29tcGxldGVCdXR0b25cIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbXBsYWludEVtcGF0aHkod29yZCl7XG4gICAgbG9hZEVtcGF0aHlOYXYod29yZCwgbG9hZENvbXBsYWludHMpXG4gICAgbG9hZENvbnRhaW5lcih3b3JkKTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkQ29udGFpbmVyKHdvcmQpe1xuICAgIC8vIENMRUFSIENPTlRBSU5FUiAgXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgZmFsc2UpO1xuICAgIC8vIENSRUFURSBJTklUSUFMIEZFRUxJTkdTIFNFQ1RJT05cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25IZWFkZXIoXCJJTklUSUFMIEZFRUxJTkdTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZFNsaWRlcihjb21wbGFpbnRzW3dvcmRdW1wiaW5pdGlhbEZlZWxpbmdzXCJdLCAnaW5pdGlhbEZlZWxpbmcnKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25IZWFkZXIoXCJVTkRFUkxZSU5HIEZFRUxJTkdTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZFNsaWRlcihjb21wbGFpbnRzW3dvcmRdW1widW5kZXJseWluZ0ZlZWxpbmdzXCJdLCAndW5kZXJseWluZ0ZlZWxpbmcnKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZW1wYXRoeVNlY3Rpb25IZWFkZXIoXCJORUVEU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcIm5lZWRzXCJdLCAnbmVlZCcpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29tcGxldGVCdXR0b24oKSlcbn0iLCJpbXBvcnQgeyBsb2FkTGlzdENvbnRhaW5lciB9IGZyb20gXCIuXCJcbmltcG9ydCB7IGxvYWRDb21wbGFpbnRFbXBhdGh5IH0gZnJvbSBcIi4vY29tcGxhaW50RW1wYXRoeVwiXG5pbXBvcnQgeyBsb2FkTGlzdE5hdiB9IGZyb20gXCIuXCJcbmltcG9ydCBjb21wbGFpbnRzIGZyb20gJy4vY29tcGxhaW50cy5qc29uJ1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbXBsYWludHMoKXtcbiAgICBjb25zdCBjb21wbGFpbnRMaXN0ID0gW11cbiAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBsYWludHMpKSB7XG4gICAgICAgICAgICBjb21wbGFpbnRMaXN0LnB1c2goa2V5KVxuICAgICAgICB9XG5cbiAgICBsb2FkTGlzdE5hdignXCJUaGV5XFwncmUgYmVpbmcuLi5cIicpXG4gICAgbG9hZExpc3RDb250YWluZXIoY29tcGxhaW50TGlzdCwgJ2NvbXBsYWludCcsIGxvYWRDb21wbGFpbnRFbXBhdGh5KVxufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb21wbGV0ZUJ1dHRvbigpIHtcbiAgICBjb25zdCBjb21wbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpXG4gICAgY29tcGxldGVCdXR0b24uaW5uZXJUZXh0ID0gXCJJJ20gY29tcGxldGVcIlxuICAgIGNvbXBsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxldCBvdXRPZlJhbmdlU2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm91dG9mcmFuZ2UnKTtcbiAgICAgICAgb3V0T2ZSYW5nZVNsaWRlcy5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QuYWRkKCdkaW0nKSlcbiAgICB9KTtcbiAgICByZXR1cm4gY29tcGxldGVCdXR0b25cbn0iLCIvLyBpbXBvcnQgeyBsb2FkSG9tZSB9IGZyb20gXCIuL2hvbWVcIjtcbmltcG9ydCB7IGxvYWRFbXBhdGh5TmF2IH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGVtcGF0aHlTZWN0aW9uSGVhZGVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGJ1aWxkU2xpZGVyIH0gZnJvbSBcIi4vYnVpbGRTbGlkZXJcIjtcbmltcG9ydCB7IGxvYWRGZWVsaW5ncyB9IGZyb20gXCIuL2ZlZWxpbmdzXCI7XG5pbXBvcnQgZmVlbGluZ3MgZnJvbSAnLi9mZWVsaW5ncy5qc29uJ1xuaW1wb3J0IHsgY3JlYXRlQ29tcGxldGVCdXR0b24gfSBmcm9tIFwiLi9jb21wbGV0ZUJ1dHRvblwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmVlbGluZ0VtcGF0aHkod29yZCl7XG4gICAgbG9hZEVtcGF0aHlOYXYod29yZCwgbG9hZEZlZWxpbmdzKVxuICAgIGxvYWRDb250YWluZXIod29yZCk7XG4gICAgXG59XG5cblxuZnVuY3Rpb24gbG9hZENvbnRhaW5lcih3b3JkKXtcbiAgICAvLyBDTEVBUiBDT05UQUlORVIgIFxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgIC8vIExPQUQgVU5ERVJMWUlORyBGRUVMSU5HUyBTRUNUSU9OXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVtcGF0aHlTZWN0aW9uSGVhZGVyKFwiVU5ERVJMWUlORyBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoZmVlbGluZ3Nbd29yZF1bXCJ1bmRlcmx5aW5nRmVlbGluZ3NcIl0sICd1bmRlcmx5aW5nRmVlbGluZycpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbXBhdGh5U2VjdGlvbkhlYWRlcihcIk5FRURTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZFNsaWRlcihmZWVsaW5nc1t3b3JkXVtcIm5lZWRzXCJdLCAnbmVlZCcpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVDb21wbGV0ZUJ1dHRvbigpKVxufVxuXG4iLCJpbXBvcnQgeyBsb2FkTGlzdENvbnRhaW5lciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBsb2FkRmVlbGluZ0VtcGF0aHkgfSBmcm9tIFwiLi9mZWVsaW5nRW1wYXRoeVwiO1xuaW1wb3J0IHsgbG9hZExpc3ROYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IGZlZWxpbmdzIGZyb20gJy4vZmVlbGluZ3MuanNvbidcblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGZWVsaW5ncygpIHtcbiAgICBjb25zdCBmZWVsaW5nTGlzdCA9IFtdXG4gICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGZlZWxpbmdzKSkge1xuICAgICAgICBmZWVsaW5nTGlzdC5wdXNoKGtleSlcbiAgICB9XG5cbiAgICBsb2FkTGlzdE5hdignXCJJXFwnbSBmZWVsaW5nLi4uXCInKTtcbiAgICBsb2FkTGlzdENvbnRhaW5lcihmZWVsaW5nTGlzdCwgJ2ZlZWxpbmcnLCBsb2FkRmVlbGluZ0VtcGF0aHkpXG59XG4iLCJpbXBvcnQgeyBsb2FkRmVlbGluZ3MgfSBmcm9tIFwiLi9mZWVsaW5nc1wiO1xuaW1wb3J0IHsgbG9hZENvbXBsYWludHMgfSBmcm9tIFwiLi9jb21wbGFpbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSG9tZSgpIHtcbiAgICBsb2FkTmF2KCk7XG4gICAgbG9hZENvbnRhaW5lcigpO1xufVxuXG4vLyBMT0FEIE5BViBCQVIgU1RZTEVEIE9OTFkgRk9SIEhPTUUgTU9EVUxFXG5mdW5jdGlvbiBsb2FkTmF2KCl7XG4gICAgY29uc3QgbmF2SGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZoZWFkJylcbiAgICBuYXZIZWFkLmlubmVySFRNTCA9ICcnXG4gICAgbmF2SGVhZC5jbGFzc0xpc3QucmVtb3ZlKCdzdWJzZWN0aW9uJylcblxuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uVGl0bGUnKVxuICAgIHNlY3Rpb25UaXRsZS5pbm5lclRleHQgPSBcIlwiXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuICAgIGNvbnN0IGluZm9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbmZvQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9pbmZvLWNpcmNsZS5zdmdcIlxuICAgIGluZm9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuSW5mb1BhZ2UpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChpbmZvQnV0dG9uKVxuICAgIFxuICAgIHJldHVybiBuYXZIZWFkO1xufVxuXG4vLyBMT0FEIENPTlRBSU5FUiBTVFlMRUQgT05MWSBGT1IgSE9NRSBNT0RVTEVcbmZ1bmN0aW9uIGxvYWRDb250YWluZXIoKXtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJyk7XG4gICAgLy8gY2xlYXIgY29udGFpbmVyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgXG4gICAgLy8gYWRkIGludHJvIHRleHRcbiAgICBjb25zdCBpbnRyb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGludHJvVGV4dC5jbGFzc0xpc3QuYWRkKCdpbnRyb1RleHQnKVxuICAgIGludHJvVGV4dC5pbm5lclRleHQgPSBcInNlbGYtZW1wYXRoeSBwcm9jZXNzOiBzdGFydCB3aXRoIGFcXG5jb21wbGFpbnQgb3IgZmVlbGluZyB0byBjb25uZWN0IHdpdGhcXG55b3VyIHVuZGVybHlpbmcgZmVlbGluZ3MgYW5kIG5lZWRzLlwiXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGludHJvVGV4dClcblxuICAgIC8vIGFkZCBjb21wbGFpbnQgc2VjdGlvbiBidXR0b25cbiAgICBjb25zdCBjb21wbGFpbnRTZWN0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uQnV0dG9uJylcbiAgICBjb25zdCBzdGFydFRleHRDb21wbGFpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHN0YXJ0VGV4dENvbXBsYWludC5jbGFzc0xpc3QuYWRkKCdzdGFydFdpdGgnKVxuICAgIHN0YXJ0VGV4dENvbXBsYWludC5pbm5lclRleHQgPSBcInN0YXJ0IHdpdGggYSBjb21wbGFpbnRcIlxuICAgIGNvbnN0IGNvbXBsYWludFF1b3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb21wbGFpbnRRdW90ZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlUXVvdGUnKVxuICAgIGNvbXBsYWludFF1b3RlLmlubmVyVGV4dCA9ICdcIlRoZXlcXCdyZSBiZWluZy4uLlwiJ1xuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uYXBwZW5kQ2hpbGQoc3RhcnRUZXh0Q29tcGxhaW50KVxuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uYXBwZW5kQ2hpbGQoY29tcGxhaW50UXVvdGUpXG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRDb21wbGFpbnRzKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wbGFpbnRTZWN0aW9uQnV0dG9uKVxuXG4gICAgLy8gYWRkIGZlZWxpbmcgc2VjdGlvbiBidXR0b25cbiAgICBjb25zdCBmZWVsaW5nU2VjdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25CdXR0b24nKVxuICAgIGNvbnN0IHN0YXJ0VGV4dEZlZWxpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHN0YXJ0VGV4dEZlZWxpbmcuY2xhc3NMaXN0LmFkZCgnc3RhcnRXaXRoJylcbiAgICBzdGFydFRleHRGZWVsaW5nLmlubmVyVGV4dCA9IFwic3RhcnQgd2l0aCBhIGZlZWxpbmdcIlxuICAgIGNvbnN0IGZlZWxpbmdRdW90ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZmVlbGluZ1F1b3RlLmNsYXNzTGlzdC5hZGQoJ2V4YW1wbGVRdW90ZScpXG4gICAgZmVlbGluZ1F1b3RlLmlubmVyVGV4dCA9ICdcIklcXCdtIGZlZWxpbmcuLi5cIidcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5hcHBlbmRDaGlsZChzdGFydFRleHRGZWVsaW5nKVxuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKGZlZWxpbmdRdW90ZSlcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRGZWVsaW5ncylcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZmVlbGluZ1NlY3Rpb25CdXR0b24pXG5cbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiBvcGVuSW5mb1BhZ2UoKXtcbiAgICBhbGVydChcIkFuIG9ubGluZSBndWlkZSB0byBzdXBwb3J0IHRoZSBzZWxmLWVtcGF0aHkgcHJvY2Vzcy5cIilcbn0iLCJpbXBvcnQgeyBsb2FkSG9tZSB9IGZyb20gXCIuL2hvbWVcIjtcblxuLy8gUEFHRSBMT0FEIEZVTkNUSU9OIENSRUFURVMgUEFHRSBTVFJVQ1RVUkUgRk9SIERPTSBNQU5JUFVMQVRJT04gQlkgT1RIRVIgTU9EVUxFU1xuZnVuY3Rpb24gcGFnZUxvYWQoKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbmF2Jyk7XG4gICAgbmF2LnNldEF0dHJpYnV0ZShcImlkXCIsIFwibmF2aGVhZFwiKVxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29udGFpbmVyXCIpXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjb250YWluZXJcIilcblxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKVxuICAgIGhlYWRlci5hcHBlbmRDaGlsZChuYXYpXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cbiAgICByZXR1cm4gY29udGVudDtcbn1cblxuLy8gSU5JVElBTElaRSBBUFAgQlkgTE9BRElORyBUSEUgRE9NIEVMRU1FTlRTIEFORCBUSEVOIENBTExJTkcgVEhFIExPQURIT01FIE1PRFVMRVxucGFnZUxvYWQoKVxubG9hZEhvbWUoKVxuXG5cblxuLy8gRlVOQ1RJT05TIEJFTE9XIEFSRSBTSEFSRUQgQkVUV0VFTiBBTkQgQ0FMTEVEIEJZIE9USEVSIE1PRFVMRVM6XG5cbi8vIFJFVFVSTlMgTkFWIEJBUiBTVFlMRUQgRk9SIFBBR0UgMiBXSVRIIFNFTEVDVEVEIFdPUkQgSU4gSEVBREVSXG5leHBvcnQgZnVuY3Rpb24gbG9hZExpc3ROYXYoaGVhZGVyVGV4dCl7XG4gICAgY29uc3QgbmF2SGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZoZWFkJylcbiAgICBuYXZIZWFkLmlubmVySFRNTCA9ICcnXG4gICAgbmF2SGVhZC5jbGFzc0xpc3QuYWRkKCdzdWJzZWN0aW9uJylcbiAgICBsZXQgc2VhcmNoQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHNlYXJjaEFyZWEuc3JjID0gJy4vaWNvbnMvc2VhcmNoLnN2ZydcbiAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRpdGxlJylcbiAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gaGVhZGVyVGV4dFxuICAgIGxldCBob21lQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBob21lQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9ob3VzZS5zdmdcIlxuICAgIGhvbWVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkSG9tZSlcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlYXJjaEFyZWEpO1xuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKGhvbWVCdXR0b24pO1xuXG4gICAgcmV0dXJuIG5hdkhlYWRcbn1cblxuXG4vLyBSRVRVUk5TIEEgTElTVCBPRiBESVZTIElOIFRIRSBDT05UQUlORVIgRk9SIFBBR0UgMlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRMaXN0Q29udGFpbmVyKGxpc3QsIGxpc3RDbGFzcywgbGlzdEZ1bmN0aW9uKXtcbiAgICAvLyBDTEVBUiBDT05UQUlORVJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBcbiAgICBjb25zdCBpdGVtUHJlc3NlZCA9IChlKSA9PiB7XG4gICAgICAgIGxpc3RGdW5jdGlvbihlLnRhcmdldC5pbm5lclRleHQpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpc3REaXYuY2xhc3NMaXN0LmFkZCgncmVjdGFuZ2xlJywgbGlzdENsYXNzKTtcbiAgICAgICAgbGlzdERpdi5pbm5lclRleHQgPSBsaXN0W2ldO1xuICAgICAgICBsaXN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaXRlbVByZXNzZWQpXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0RGl2KVxuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vLyBSRVRVUk5TIE5BViBCQVIgU1RZTEVEIEZPUiBQQUdFIDMgV0lUSCBTRUxFQ1RFRCBXT1JEIElOIEhFQURFUlxuLy8gQkFDSyBGVU5DVElPTiBQT0lOVFMgVE8gUFJFVklPVVMgUEFHRSBNT0RVTEVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1wYXRoeU5hdih3b3JkLCBiYWNrRnVuY3Rpb24pe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LmFkZCgnc3Vic2VjdGlvbicpXG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBiYWNrQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9hcnJvdy1sZWZ0LXNob3J0LnN2Z1wiXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tGdW5jdGlvbik7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHdvcmRcbiAgICBsZXQgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaG9tZUJ1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaG91c2Uuc3ZnXCJcbiAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEhvbWUpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcblxuICAgIHJldHVybiBuYXZIZWFkXG59XG5cblxuLy8gUkVUVVJOUyBBIEhFQURFUiBURVhUIERJViBVU0VEIE9OIFBBR0UgM1xuZXhwb3J0IGZ1bmN0aW9uIGVtcGF0aHlTZWN0aW9uSGVhZGVyKHRleHQpe1xuICAgIGNvbnN0IGluaXRpYWxGZWVsaW5nc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaW5pdGlhbEZlZWxpbmdzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2VtcGF0aHlTZWN0aW9uSGVhZGVyJylcbiAgICBpbml0aWFsRmVlbGluZ3NIZWFkZXIuaW5uZXJUZXh0ID0gdGV4dFxuICAgIFxuICAgIHJldHVybiBpbml0aWFsRmVlbGluZ3NIZWFkZXJcbn1cblxuXG4vLyAhISEgREVQUkVDQVRFRCAhISEgLy8gUkVUVVJOUyBDQVJPVVNFTCBPRiBESVZTIFVTRUQgT04gUEFHRSAzIFxuZXhwb3J0IGZ1bmN0aW9uIGVtcGF0aHlTZWN0aW9uRGl2Q2Fyb3VzZWwoYXJyYXksIGRpdkNsYXNzKXtcbiAgICBjb25zdCBncmlkQ2Fyb3VzZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkQ2Fyb3VzZWwuY2xhc3NMaXN0LmFkZCgnZW1wYXRoeVNlY3Rpb25EaXZDYXJvdXNlbCcpO1xuICAgIGJ1aWxkQ2Fyb3VzZWwoKVxuXG4gICAgZnVuY3Rpb24gYnVpbGRDYXJvdXNlbCgpIHtcbiAgICAgICAgZ3JpZENhcm91c2VsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbXBhdGh5R3Vlc3NEaXZDYXJvdXNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZW1wYXRoeUd1ZXNzRGl2Q2Fyb3VzZWwuY2xhc3NMaXN0LmFkZCgnZW1wYXRoeUd1ZXNzRGl2Q2Fyb3VzZWwnKVxuICAgICAgICAgICAgZW1wYXRoeUd1ZXNzRGl2Q2Fyb3VzZWwuY2xhc3NMaXN0LmFkZChgJHtkaXZDbGFzc31gKVxuICAgICAgICAgICAgZW1wYXRoeUd1ZXNzRGl2Q2Fyb3VzZWwuaW5uZXJUZXh0ID0gYXJyYXlbaV07XG4gICAgICAgICAgICBncmlkQ2Fyb3VzZWwuYXBwZW5kQ2hpbGQoZW1wYXRoeUd1ZXNzRGl2Q2Fyb3VzZWwpXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWRkR3Vlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkR3Vlc3MuY2xhc3NMaXN0LmFkZCgnZW1wYXRoeUd1ZXNzRGl2Q2Fyb3VzZWwnKVxuICAgICAgICBhZGRHdWVzcy5jbGFzc0xpc3QuYWRkKGAke2RpdkNsYXNzfWApXG4gICAgICAgIGFkZEd1ZXNzLmlubmVyVGV4dCA9IFwiK1wiO1xuICAgICAgICBhZGRHdWVzcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgbGV0IGlucHV0ID0gcHJvbXB0KFwiVXNlIGFub3RoZXIgdGVybTogXCIpXG4gICAgICAgICAgICBhcnJheS5wdXNoKGlucHV0KVxuICAgICAgICAgICAgYnVpbGRDYXJvdXNlbCgpXG4gICAgICAgIH0pXG4gICAgICAgIGdyaWRDYXJvdXNlbC5hcHBlbmRDaGlsZChhZGRHdWVzcylcbiAgICB9XG4gICAgcmV0dXJuIGdyaWRDYXJvdXNlbFxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
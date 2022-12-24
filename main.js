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
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./src/index.js");




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
    infoButton.addEventListener('click', toggleInfoBox)
    navHead.appendChild(infoButton)
    
    return navHead;
}

// LOAD CONTAINER STYLED ONLY FOR HOME MODULE
function loadContainer(){
    const container = document.getElementById('container');
    // clear container
    container.innerHTML = ''
    container.classList.add('fullHeight')

    // add complaint section button
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_2__.sectionHeader)("START WITH A COMPLAINT"))
    const complaintSectionButton = document.createElement('div');
    complaintSectionButton.classList.add('sectionButton')
    complaintSectionButton.classList.add('complaint')
    // const startTextComplaint = document.createElement('div')
    // startTextComplaint.classList.add('startWith')
    // startTextComplaint.innerText = "start with a complaint"
    const complaintQuote = document.createElement('div')
    complaintQuote.classList.add('exampleQuote')
    complaintQuote.innerText = '"They\'re being..."'
    // complaintSectionButton.appendChild(startTextComplaint)
    complaintSectionButton.appendChild(complaintQuote)
    complaintSectionButton.addEventListener('click', _complaints__WEBPACK_IMPORTED_MODULE_1__.loadComplaints)
    container.appendChild(complaintSectionButton)

    // add feeling section button
    container.appendChild((0,___WEBPACK_IMPORTED_MODULE_2__.sectionHeader)("START WITH A FEELING"))
    const feelingSectionButton = document.createElement('div');
    feelingSectionButton.classList.add('sectionButton')
    feelingSectionButton.classList.add('feeling')
    // const startTextFeeling = document.createElement('div')
    // startTextFeeling.classList.add('startWith')
    // startTextFeeling.innerText = "start with a feeling"
    const feelingQuote = document.createElement('div')
    feelingQuote.classList.add('exampleQuote')
    feelingQuote.innerText = '"I\'m feeling..."'
    // feelingSectionButton.appendChild(startTextFeeling)
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
    container.classList.remove('fullHeight')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvYnVpbGRTbGlkZXIuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvY29tcGxhaW50RW1wYXRoeS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9jb21wbGFpbnRzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2NvbXBsZXRlQnV0dG9uLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2ZlZWxpbmdFbXBhdGh5LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2ZlZWxpbmdzLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2hvbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkU2xpZGVyKHNsaWRlc0FycmF5LCBkaXZDbGFzcykge1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnd3JhcHBlcicpXG4gICAgXG4gICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVyLWNvbnRhaW5lcicpXG5cbiAgICAvLyB0b3VjaCBldmVudHMgKG1vYmlsZSlcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG91Y2hFbmQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNoTW92ZSlcblxuICAgIC8vIG1vdXNlIGV2ZW50cyAoZGVza3RvcClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdG91Y2hTdGFydClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRvdWNoRW5kKVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdG91Y2hFbmQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRvdWNoTW92ZSlcblxuXG4gICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgICAgc3RhcnRQb3MgPSAwLFxuICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gMCxcbiAgICAgICAgcHJldlRyYW5zbGF0ZSA9IDAsXG4gICAgICAgIGFuaW1hdGlvbklEID0gMCxcbiAgICAgICAgY3VycmVudEluZGV4ID0gMFxuICAgIFxuICAgIGlmIChzbGlkZXNBcnJheS5sZW5ndGggPT0gNikge1xuICAgICAgICBzbGlkZXNBcnJheS5wdXNoKCcrJylcbiAgICB9XG4gICAgXG4gICAgc2xpZGVzQXJyYXkuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgIGxldCBzbGlkZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHNsaWRlRGl2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlJylcbiAgICAgICAgc2xpZGVEaXYuY2xhc3NMaXN0LmFkZChgJHtkaXZDbGFzc31gKVxuICAgICAgICBzbGlkZURpdi5jbGFzc0xpc3QuYWRkKCdvdXRvZnJhbmdlJylcbiAgICAgICAgc2xpZGVEaXYuaW5uZXJUZXh0ID0gc2xpZGVcbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlRGl2KVxuICAgIH1cbiAgICApXG5cbiAgICAvLyBkaXNhYmxlIGRlZmF1bHQgYmVoYXZpb3JcbiAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hTdGFydCgpIHtcbiAgICAgICAgLy8gY3VycmVudEluZGV4ID0gaW5kZXhcbiAgICAgICAgLy8gZ2V0IHN0YXJ0IHBvc2l0aW9uIGJhc2VkIG9uIHdoZXRoZXIgdXNlciBpcyBvbiBtb2JpbGUgb3IgZGVza3RvcFxuICAgICAgICBzdGFydFBvcyA9IGdldFBvc2l0aW9uWChldmVudClcbiAgICBcbiAgICAgICAgaXNEcmFnZ2luZyA9IHRydWVcbiAgICAgICAgYW5pbWF0aW9uSUQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uKVxuICAgICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgnZ3JhYmJpbmcnKVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSBmYWxzZVxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25JRClcbiAgICAgICAgY29uc3QgbW92ZWRCeSA9IGN1cnJlbnRUcmFuc2xhdGUgLSBwcmV2VHJhbnNsYXRlXG4gICAgICAgIGxldCBzbGlkZURpdnMgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi53cmFwcGVyXCIpLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZScpXG5cbiAgICAgICAgaWYgKG1vdmVkQnkgPCAtNjAgJiYgY3VycmVudEluZGV4IDwgc2xpZGVzQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggKz0gMTtcbiAgICAgICAgICAgIHNsaWRlRGl2c1tjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ291dG9mcmFuZ2UnKVxuICAgICAgICB9ICBcbiAgICAgICAgXG4gICAgICAgIGlmIChtb3ZlZEJ5ID4gNjAgJiYgY3VycmVudEluZGV4ID4gMCkge1xuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgICAgICBjdXJyZW50SW5kZXggLT0gMVxuICAgICAgICAgICAgc2xpZGVEaXZzW2N1cnJlbnRJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnb3V0b2ZyYW5nZScpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHNldFBvc2l0aW9uQnlJbmRleCgpXG4gICAgICAgIHNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdncmFiYmluZycpXG4gICAgfVxuICAgICAgICBcblxuICAgIGZ1bmN0aW9uIHRvdWNoTW92ZShldmVudCkge1xuICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gZ2V0UG9zaXRpb25YKGV2ZW50KVxuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHByZXZUcmFuc2xhdGUgKyBjdXJyZW50UG9zaXRpb24gLSBzdGFydFBvc1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBmdW5jdGlvbiBnZXRQb3NpdGlvblgoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnR5cGUuaW5jbHVkZXMoJ21vdXNlJykgPyBldmVudC5wYWdlWCA6IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGlvbigpIHtcbiAgICAgICAgc2V0U2xpZGVyUG9zaXRpb24oKVxuICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNsaWRlclBvc2l0aW9uKCkge1xuICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtjdXJyZW50VHJhbnNsYXRlfXB4KWBcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHNldFBvc2l0aW9uQnlJbmRleCgpIHtcbiAgICAgICAgLy8gY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJylcbiAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IGN1cnJlbnRJbmRleCAqIC0xNzBcbiAgICAgICAgcHJldlRyYW5zbGF0ZSA9IGN1cnJlbnRUcmFuc2xhdGVcbiAgICAgICAgc2V0U2xpZGVyUG9zaXRpb24oKSBcbiAgICB9XG5cbiAgICBcbiAgICBzbGlkZXIubGFzdENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGxldCBuZXdXb3JkID0gcHJvbXB0KFwidXNlIGFub3RoZXIgd29yZDpcIilcbiAgICAgICAgc2xpZGVzQXJyYXkuc3BsaWNlKC0xLCAwLCBuZXdXb3JkKVxuICAgICAgICBcbiAgICAgICAgbGV0IG5ld1NsaWRlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbmV3U2xpZGVEaXYuY2xhc3NMaXN0LmFkZCgnc2xpZGUnKVxuICAgICAgICBuZXdTbGlkZURpdi5jbGFzc0xpc3QuYWRkKGAke2RpdkNsYXNzfWApXG4gICAgICAgIG5ld1NsaWRlRGl2LmlubmVyVGV4dCA9IG5ld1dvcmRcbiAgICAgICAgXG4gICAgICAgIHNsaWRlci5pbnNlcnRCZWZvcmUobmV3U2xpZGVEaXYsIHNsaWRlci5sYXN0Q2hpbGQpXG4gICAgICAgIHNsaWRlci5sYXN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHNsaWRlc0FycmF5KVxuICAgICAgICAvLyBidWlsZFNsaWRlcihzbGlkZXNBcnJheSwgZGl2Q2xhc3MpICAgIFxuICAgIH0pXG5cbiAgICBzbGlkZXIuZmlyc3RDaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdvdXRvZnJhbmdlJylcblxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoc2xpZGVyKVxuICAgIHJldHVybiB3cmFwcGVyXG5cbn1cblxuIiwiaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgc2VjdGlvbkhlYWRlciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBsb2FkQ29tcGxhaW50cyB9IGZyb20gXCIuL2NvbXBsYWludHNcIjtcbmltcG9ydCBjb21wbGFpbnRzIGZyb20gJy4vY29tcGxhaW50cy5qc29uJ1xuaW1wb3J0IHsgYnVpbGRTbGlkZXIgfSBmcm9tIFwiLi9idWlsZFNsaWRlclwiO1xuaW1wb3J0IHsgY3JlYXRlQ29tcGxldGVCdXR0b24gfSBmcm9tIFwiLi9jb21wbGV0ZUJ1dHRvblwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29tcGxhaW50RW1wYXRoeSh3b3JkKXtcbiAgICBsb2FkRW1wYXRoeU5hdih3b3JkLCBsb2FkQ29tcGxhaW50cylcbiAgICBsb2FkQ29udGFpbmVyKHdvcmQpO1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRDb250YWluZXIod29yZCl7XG4gICAgLy8gQ0xFQVIgQ09OVEFJTkVSICBcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCBmYWxzZSk7XG4gICAgLy8gQ1JFQVRFIElOSVRJQUwgRkVFTElOR1MgU0VDVElPTlxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiSU5JVElBTCBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcImluaXRpYWxGZWVsaW5nc1wiXSwgJ2luaXRpYWxGZWVsaW5nJykpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25IZWFkZXIoXCJVTkRFUkxZSU5HIEZFRUxJTkdTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZFNsaWRlcihjb21wbGFpbnRzW3dvcmRdW1widW5kZXJseWluZ0ZlZWxpbmdzXCJdLCAndW5kZXJseWluZ0ZlZWxpbmcnKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIk5FRURTXCIpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChidWlsZFNsaWRlcihjb21wbGFpbnRzW3dvcmRdW1wibmVlZHNcIl0sICduZWVkJykpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVDb21wbGV0ZUJ1dHRvbigpKVxufSIsImltcG9ydCB7IGxvYWRMaXN0Q29udGFpbmVyIH0gZnJvbSBcIi5cIlxuaW1wb3J0IHsgbG9hZENvbXBsYWludEVtcGF0aHkgfSBmcm9tIFwiLi9jb21wbGFpbnRFbXBhdGh5XCJcbmltcG9ydCB7IGxvYWRMaXN0TmF2IH0gZnJvbSBcIi5cIlxuaW1wb3J0IGNvbXBsYWludHMgZnJvbSAnLi9jb21wbGFpbnRzLmpzb24nXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29tcGxhaW50cygpe1xuICAgIGNvbnN0IGNvbXBsYWludExpc3QgPSBbXVxuICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoY29tcGxhaW50cykpIHtcbiAgICAgICAgICAgIGNvbXBsYWludExpc3QucHVzaChrZXkpXG4gICAgICAgIH1cblxuICAgIGxvYWRMaXN0TmF2KCdcIlRoZXlcXCdyZSBiZWluZy4uLlwiJylcbiAgICBsb2FkTGlzdENvbnRhaW5lcihjb21wbGFpbnRMaXN0LCAnY29tcGxhaW50JywgbG9hZENvbXBsYWludEVtcGF0aHkpXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlQnV0dG9uKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjb21wbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIkknbSBjb21wbGV0ZVwiXG4gICAgY29tcGxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbGV0IG91dE9mUmFuZ2VTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3V0b2ZyYW5nZScpO1xuICAgICAgICBvdXRPZlJhbmdlU2xpZGVzLmZvckVhY2gocyA9PiBzLmNsYXNzTGlzdC5hZGQoJ2RpbScpKVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wbGV0ZUJ1dHRvblxufSIsIi8vIGltcG9ydCB7IGxvYWRIb21lIH0gZnJvbSBcIi4vaG9tZVwiO1xuaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgc2VjdGlvbkhlYWRlciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBidWlsZFNsaWRlciB9IGZyb20gXCIuL2J1aWxkU2xpZGVyXCI7XG5pbXBvcnQgeyBsb2FkRmVlbGluZ3MgfSBmcm9tIFwiLi9mZWVsaW5nc1wiO1xuaW1wb3J0IGZlZWxpbmdzIGZyb20gJy4vZmVlbGluZ3MuanNvbidcbmltcG9ydCB7IGNyZWF0ZUNvbXBsZXRlQnV0dG9uIH0gZnJvbSBcIi4vY29tcGxldGVCdXR0b25cIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZlZWxpbmdFbXBhdGh5KHdvcmQpe1xuICAgIGxvYWRFbXBhdGh5TmF2KHdvcmQsIGxvYWRGZWVsaW5ncylcbiAgICBsb2FkQ29udGFpbmVyKHdvcmQpO1xuICAgIFxufVxuXG5cbmZ1bmN0aW9uIGxvYWRDb250YWluZXIod29yZCl7XG4gICAgLy8gQ0xFQVIgQ09OVEFJTkVSICBcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICAvLyBMT0FEIFVOREVSTFlJTkcgRkVFTElOR1MgU0VDVElPTlxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiVU5ERVJMWUlORyBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoZmVlbGluZ3Nbd29yZF1bXCJ1bmRlcmx5aW5nRmVlbGluZ3NcIl0sICd1bmRlcmx5aW5nRmVlbGluZycpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiTkVFRFNcIikpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkU2xpZGVyKGZlZWxpbmdzW3dvcmRdW1wibmVlZHNcIl0sICduZWVkJykpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbXBsZXRlQnV0dG9uKCkpXG59XG5cbiIsImltcG9ydCB7IGxvYWRMaXN0Q29udGFpbmVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGxvYWRGZWVsaW5nRW1wYXRoeSB9IGZyb20gXCIuL2ZlZWxpbmdFbXBhdGh5XCI7XG5pbXBvcnQgeyBsb2FkTGlzdE5hdiB9IGZyb20gXCIuXCI7XG5pbXBvcnQgZmVlbGluZ3MgZnJvbSAnLi9mZWVsaW5ncy5qc29uJ1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZlZWxpbmdzKCkge1xuICAgIGNvbnN0IGZlZWxpbmdMaXN0ID0gW11cbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoZmVlbGluZ3MpKSB7XG4gICAgICAgIGZlZWxpbmdMaXN0LnB1c2goa2V5KVxuICAgIH1cblxuICAgIGxvYWRMaXN0TmF2KCdcIklcXCdtIGZlZWxpbmcuLi5cIicpO1xuICAgIGxvYWRMaXN0Q29udGFpbmVyKGZlZWxpbmdMaXN0LCAnZmVlbGluZycsIGxvYWRGZWVsaW5nRW1wYXRoeSlcbn1cbiIsImltcG9ydCB7IGxvYWRGZWVsaW5ncyB9IGZyb20gXCIuL2ZlZWxpbmdzXCI7XG5pbXBvcnQgeyBsb2FkQ29tcGxhaW50cyB9IGZyb20gXCIuL2NvbXBsYWludHNcIjtcbmltcG9ydCB7IHNlY3Rpb25IZWFkZXIgfSBmcm9tIFwiLlwiO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEhvbWUoKSB7XG4gICAgbG9hZE5hdigpO1xuICAgIGxvYWRDb250YWluZXIoKTtcbn1cblxuLy8gTE9BRCBOQVYgQkFSIFNUWUxFRCBPTkxZIEZPUiBIT01FIE1PRFVMRVxuZnVuY3Rpb24gbG9hZE5hdigpe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LnJlbW92ZSgnc3Vic2VjdGlvbicpXG5cbiAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZWN0aW9uVGl0bGUuY2xhc3NMaXN0LmFkZCgnc2VjdGlvblRpdGxlJylcbiAgICBzZWN0aW9uVGl0bGUuaW5uZXJUZXh0ID0gXCJzZWxmLWVtcGF0aHlcIlxuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoc2VjdGlvblRpdGxlKTtcbiAgICBjb25zdCBpbmZvQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW5mb0J1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaW5mby1jaXJjbGUuc3ZnXCJcbiAgICBpbmZvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlSW5mb0JveClcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKGluZm9CdXR0b24pXG4gICAgXG4gICAgcmV0dXJuIG5hdkhlYWQ7XG59XG5cbi8vIExPQUQgQ09OVEFJTkVSIFNUWUxFRCBPTkxZIEZPUiBIT01FIE1PRFVMRVxuZnVuY3Rpb24gbG9hZENvbnRhaW5lcigpe1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcbiAgICAvLyBjbGVhciBjb250YWluZXJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZnVsbEhlaWdodCcpXG5cbiAgICAvLyBhZGQgY29tcGxhaW50IHNlY3Rpb24gYnV0dG9uXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25IZWFkZXIoXCJTVEFSVCBXSVRIIEEgQ09NUExBSU5UXCIpKVxuICAgIGNvbnN0IGNvbXBsYWludFNlY3Rpb25CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wbGFpbnRTZWN0aW9uQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25CdXR0b24nKVxuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnY29tcGxhaW50JylcbiAgICAvLyBjb25zdCBzdGFydFRleHRDb21wbGFpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIC8vIHN0YXJ0VGV4dENvbXBsYWludC5jbGFzc0xpc3QuYWRkKCdzdGFydFdpdGgnKVxuICAgIC8vIHN0YXJ0VGV4dENvbXBsYWludC5pbm5lclRleHQgPSBcInN0YXJ0IHdpdGggYSBjb21wbGFpbnRcIlxuICAgIGNvbnN0IGNvbXBsYWludFF1b3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb21wbGFpbnRRdW90ZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlUXVvdGUnKVxuICAgIGNvbXBsYWludFF1b3RlLmlubmVyVGV4dCA9ICdcIlRoZXlcXCdyZSBiZWluZy4uLlwiJ1xuICAgIC8vIGNvbXBsYWludFNlY3Rpb25CdXR0b24uYXBwZW5kQ2hpbGQoc3RhcnRUZXh0Q29tcGxhaW50KVxuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uYXBwZW5kQ2hpbGQoY29tcGxhaW50UXVvdGUpXG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRDb21wbGFpbnRzKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wbGFpbnRTZWN0aW9uQnV0dG9uKVxuXG4gICAgLy8gYWRkIGZlZWxpbmcgc2VjdGlvbiBidXR0b25cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIlNUQVJUIFdJVEggQSBGRUVMSU5HXCIpKVxuICAgIGNvbnN0IGZlZWxpbmdTZWN0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZmVlbGluZ1NlY3Rpb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VjdGlvbkJ1dHRvbicpXG4gICAgZmVlbGluZ1NlY3Rpb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnZmVlbGluZycpXG4gICAgLy8gY29uc3Qgc3RhcnRUZXh0RmVlbGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgLy8gc3RhcnRUZXh0RmVlbGluZy5jbGFzc0xpc3QuYWRkKCdzdGFydFdpdGgnKVxuICAgIC8vIHN0YXJ0VGV4dEZlZWxpbmcuaW5uZXJUZXh0ID0gXCJzdGFydCB3aXRoIGEgZmVlbGluZ1wiXG4gICAgY29uc3QgZmVlbGluZ1F1b3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBmZWVsaW5nUXVvdGUuY2xhc3NMaXN0LmFkZCgnZXhhbXBsZVF1b3RlJylcbiAgICBmZWVsaW5nUXVvdGUuaW5uZXJUZXh0ID0gJ1wiSVxcJ20gZmVlbGluZy4uLlwiJ1xuICAgIC8vIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmFwcGVuZENoaWxkKHN0YXJ0VGV4dEZlZWxpbmcpXG4gICAgZmVlbGluZ1NlY3Rpb25CdXR0b24uYXBwZW5kQ2hpbGQoZmVlbGluZ1F1b3RlKVxuICAgIGZlZWxpbmdTZWN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEZlZWxpbmdzKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmZWVsaW5nU2VjdGlvbkJ1dHRvbilcblxuICAgIC8vIGNyZWF0ZSBoaWRkZW4gaW5mb0JveFxuICAgIGNvbnN0IGluZm9Cb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGluZm9Cb3guY2xhc3NMaXN0LmFkZCgnaW5mb0JveCcpXG4gICAgaW5mb0JveC50ZXh0Q29udGVudCA9IFwiQW4gb25saW5lIGd1aWRlIHRvIHN1cHBvcnQgdGhlIHNlbGYtZW1wYXRoeSBwcm9jZXNzLiBTdGFydCB3aXRoIGEgY29tcGxhaW50IG9yIGZlZWxpbmcgdG8gY29ubmVjdCB3aXRoIHlvdXIgdW5kZXJseWluZyBmZWVsaW5ncyBhbmQgbmVlZHMuIE5vIHVzZXIgaW5mb3JtYXRpb24gaXMgcmVjb3JkZWQuXCJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb0JveClcblxuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cblxuXG5mdW5jdGlvbiB0b2dnbGVJbmZvQm94KCkge1xuICAgIGNvbnN0IGluZm9Cb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mb0JveCcpXG4gICAgaW5mb0JveC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93JylcbiAgICAvLyBhZGQgY2xvc2UgYnV0dG9uIHRvIGluZm9Cb3guIGFkZCBjbGljayBldmVudCBsaXN0ZW5lciB0byB0b2dnbGUgc2hvdyBjbGFzc1xufSIsImltcG9ydCB7IGxvYWRIb21lIH0gZnJvbSBcIi4vaG9tZVwiO1xuXG4vLyBQQUdFIExPQUQgRlVOQ1RJT04gQ1JFQVRFUyBQQUdFIFNUUlVDVFVSRSBGT1IgRE9NIE1BTklQVUxBVElPTiBCWSBPVEhFUiBNT0RVTEVTXG5mdW5jdGlvbiBwYWdlTG9hZCgpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgICBuYXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuYXZoZWFkXCIpXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjb250YWluZXJcIilcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lclwiKVxuXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKG5hdilcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblxuICAgIHJldHVybiBjb250ZW50O1xufVxuXG4vLyBJTklUSUFMSVpFIEFQUCBCWSBMT0FESU5HIFRIRSBET00gRUxFTUVOVFMgQU5EIFRIRU4gQ0FMTElORyBUSEUgTE9BREhPTUUgTU9EVUxFXG5wYWdlTG9hZCgpXG5sb2FkSG9tZSgpXG5cblxuXG4vLyBGVU5DVElPTlMgQkVMT1cgQVJFIFNIQVJFRCBCRVRXRUVOIEFORCBDQUxMRUQgQlkgT1RIRVIgTU9EVUxFUzpcblxuLy8gUkVUVVJOUyBOQVYgQkFSIFNUWUxFRCBGT1IgUEFHRSAyIFdJVEggU0VMRUNURUQgV09SRCBJTiBIRUFERVJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTGlzdE5hdihoZWFkZXJUZXh0KXtcbiAgICBjb25zdCBuYXZIZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmhlYWQnKVxuICAgIG5hdkhlYWQuaW5uZXJIVE1MID0gJydcbiAgICBuYXZIZWFkLmNsYXNzTGlzdC5hZGQoJ3N1YnNlY3Rpb24nKVxuICAgIGxldCBzZWFyY2hBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgc2VhcmNoQXJlYS5zcmMgPSAnLi9pY29ucy9zZWFyY2guc3ZnJ1xuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uVGl0bGUnKVxuICAgIHNlY3Rpb25UaXRsZS5pbm5lclRleHQgPSBoZWFkZXJUZXh0XG4gICAgbGV0IGhvbWVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGhvbWVCdXR0b24uc3JjID0gXCIuL2ljb25zL2hvdXNlLnN2Z1wiXG4gICAgaG9tZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxvYWRIb21lKVxuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoc2VhcmNoQXJlYSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoaG9tZUJ1dHRvbik7XG5cbiAgICByZXR1cm4gbmF2SGVhZFxufVxuXG5cbi8vIFJFVFVSTlMgQSBMSVNUIE9GIERJVlMgSU4gVEhFIENPTlRBSU5FUiBGT1IgUEFHRSAyXG5leHBvcnQgZnVuY3Rpb24gbG9hZExpc3RDb250YWluZXIobGlzdCwgbGlzdENsYXNzLCBsaXN0RnVuY3Rpb24pe1xuICAgIC8vIENMRUFSIENPTlRBSU5FUlxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKVxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdmdWxsSGVpZ2h0JylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICBcbiAgICBjb25zdCBpdGVtUHJlc3NlZCA9IChlKSA9PiB7XG4gICAgICAgIGxpc3RGdW5jdGlvbihlLnRhcmdldC5pbm5lclRleHQpXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGxpc3REaXYuY2xhc3NMaXN0LmFkZCgncmVjdGFuZ2xlJywgbGlzdENsYXNzKTtcbiAgICAgICAgbGlzdERpdi5pbm5lclRleHQgPSBsaXN0W2ldO1xuICAgICAgICBsaXN0RGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaXRlbVByZXNzZWQpXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsaXN0RGl2KVxuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vLyBSRVRVUk5TIE5BViBCQVIgU1RZTEVEIEZPUiBQQUdFIDMgV0lUSCBTRUxFQ1RFRCBXT1JEIElOIEhFQURFUlxuLy8gQkFDSyBGVU5DVElPTiBQT0lOVFMgVE8gUFJFVklPVVMgUEFHRSBNT0RVTEVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1wYXRoeU5hdih3b3JkLCBiYWNrRnVuY3Rpb24pe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LmFkZCgnc3Vic2VjdGlvbicpXG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBiYWNrQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9hcnJvdy1sZWZ0LXNob3J0LnN2Z1wiXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tGdW5jdGlvbik7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHdvcmRcbiAgICBsZXQgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaG9tZUJ1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaG91c2Uuc3ZnXCJcbiAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEhvbWUpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcblxuICAgIHJldHVybiBuYXZIZWFkXG59XG5cblxuLy8gUkVUVVJOUyBBIEhFQURFUiBURVhUIERJViBVU0VEIE9OIFBBR0UgM1xuZXhwb3J0IGZ1bmN0aW9uIHNlY3Rpb25IZWFkZXIodGV4dCl7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbkhlYWRlcicpXG4gICAgaGVhZGVyLmlubmVyVGV4dCA9IHRleHRcbiAgICBcbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
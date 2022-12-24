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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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akY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2J1aWxkU2xpZGVyLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2NvbXBsYWludEVtcGF0aHkuanMiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2UvLi9zcmMvY29tcGxhaW50cy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9jb21wbGV0ZUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9mZWVsaW5nRW1wYXRoeS5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9mZWVsaW5ncy5qcyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS8uL3NyYy9ob21lLmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3RhdXJhbnRwYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yZXN0YXVyYW50cGFnZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcmVzdGF1cmFudHBhZ2Uvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBidWlsZFNsaWRlcihzbGlkZXNBcnJheSwgZGl2Q2xhc3MpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3dyYXBwZXInKVxuICAgIFxuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlci1jb250YWluZXInKVxuXG4gICAgLy8gdG91Y2ggZXZlbnRzIChtb2JpbGUpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0KVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvdWNoRW5kKVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpXG5cbiAgICAvLyBtb3VzZSBldmVudHMgKGRlc2t0b3ApXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRvdWNoU3RhcnQpXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0b3VjaEVuZClcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvdWNoRW5kKVxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0b3VjaE1vdmUpXG5cblxuICAgIGxldCBpc0RyYWdnaW5nID0gZmFsc2UsXG4gICAgICAgIHN0YXJ0UG9zID0gMCxcbiAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IDAsXG4gICAgICAgIHByZXZUcmFuc2xhdGUgPSAwLFxuICAgICAgICBhbmltYXRpb25JRCA9IDAsXG4gICAgICAgIGN1cnJlbnRJbmRleCA9IDBcbiAgICBcbiAgICBpZiAoc2xpZGVzQXJyYXkubGVuZ3RoID09IDYpIHtcbiAgICAgICAgc2xpZGVzQXJyYXkucHVzaCgnKycpXG4gICAgfVxuICAgIFxuICAgIHNsaWRlc0FycmF5LmZvckVhY2goKHNsaWRlLCBpbmRleCkgPT4ge1xuICAgICAgICBsZXQgc2xpZGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBzbGlkZURpdi5jbGFzc0xpc3QuYWRkKCdzbGlkZScpXG4gICAgICAgIHNsaWRlRGl2LmNsYXNzTGlzdC5hZGQoYCR7ZGl2Q2xhc3N9YClcbiAgICAgICAgc2xpZGVEaXYuY2xhc3NMaXN0LmFkZCgnb3V0b2ZyYW5nZScpXG4gICAgICAgIHNsaWRlRGl2LmlubmVyVGV4dCA9IHNsaWRlXG4gICAgICAgIHNsaWRlci5hcHBlbmRDaGlsZChzbGlkZURpdilcbiAgICB9XG4gICAgKVxuXG4gICAgLy8gZGlzYWJsZSBkZWZhdWx0IGJlaGF2aW9yXG4gICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvdWNoU3RhcnQoKSB7XG4gICAgICAgIC8vIGN1cnJlbnRJbmRleCA9IGluZGV4XG4gICAgICAgIC8vIGdldCBzdGFydCBwb3NpdGlvbiBiYXNlZCBvbiB3aGV0aGVyIHVzZXIgaXMgb24gbW9iaWxlIG9yIGRlc2t0b3BcbiAgICAgICAgc3RhcnRQb3MgPSBnZXRQb3NpdGlvblgoZXZlbnQpXG4gICAgXG4gICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlXG4gICAgICAgIGFuaW1hdGlvbklEID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbilcbiAgICAgICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2dyYWJiaW5nJylcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRvdWNoRW5kKCkge1xuICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2VcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uSUQpXG4gICAgICAgIGNvbnN0IG1vdmVkQnkgPSBjdXJyZW50VHJhbnNsYXRlIC0gcHJldlRyYW5zbGF0ZVxuICAgICAgICBsZXQgc2xpZGVEaXZzID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIud3JhcHBlclwiKS5xdWVyeVNlbGVjdG9yQWxsKCcuc2xpZGUnKVxuXG4gICAgICAgIGlmIChtb3ZlZEJ5IDwgLTYwICYmIGN1cnJlbnRJbmRleCA8IHNsaWRlc0FycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHNsaWRlRGl2c1tjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ291dG9mcmFuZ2UnKVxuICAgICAgICAgICAgY3VycmVudEluZGV4ICs9IDE7XG4gICAgICAgICAgICBzbGlkZURpdnNbY3VycmVudEluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdvdXRvZnJhbmdlJylcbiAgICAgICAgfSAgXG4gICAgICAgIFxuICAgICAgICBpZiAobW92ZWRCeSA+IDYwICYmIGN1cnJlbnRJbmRleCA+IDApIHtcbiAgICAgICAgICAgIHNsaWRlRGl2c1tjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ291dG9mcmFuZ2UnKVxuICAgICAgICAgICAgY3VycmVudEluZGV4IC09IDFcbiAgICAgICAgICAgIHNsaWRlRGl2c1tjdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ291dG9mcmFuZ2UnKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRQb3NpdGlvbkJ5SW5kZXgoKVxuICAgICAgICBzbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZ3JhYmJpbmcnKVxuICAgIH1cbiAgICAgICAgXG5cbiAgICBmdW5jdGlvbiB0b3VjaE1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IGdldFBvc2l0aW9uWChldmVudClcbiAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGUgPSBwcmV2VHJhbnNsYXRlICsgY3VycmVudFBvc2l0aW9uIC0gc3RhcnRQb3NcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgZnVuY3Rpb24gZ2V0UG9zaXRpb25YKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC50eXBlLmluY2x1ZGVzKCdtb3VzZScpID8gZXZlbnQucGFnZVggOiBldmVudC50b3VjaGVzWzBdLmNsaWVudFhcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRpb24oKSB7XG4gICAgICAgIHNldFNsaWRlclBvc2l0aW9uKClcbiAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRpb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRTbGlkZXJQb3NpdGlvbigpIHtcbiAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7Y3VycmVudFRyYW5zbGF0ZX1weClgXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBzZXRQb3NpdGlvbkJ5SW5kZXgoKSB7XG4gICAgICAgIC8vIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpXG4gICAgICAgIGN1cnJlbnRUcmFuc2xhdGUgPSBjdXJyZW50SW5kZXggKiAtMjAwXG4gICAgICAgIHByZXZUcmFuc2xhdGUgPSBjdXJyZW50VHJhbnNsYXRlXG4gICAgICAgIHNldFNsaWRlclBvc2l0aW9uKCkgXG4gICAgfVxuXG4gICAgXG4gICAgc2xpZGVyLmxhc3RDaGlsZC5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgbmV3V29yZCA9IHByb21wdChcInVzZSBhbm90aGVyIHdvcmQ6XCIpXG4gICAgICAgIHNsaWRlc0FycmF5LnNwbGljZSgtMSwgMCwgbmV3V29yZClcbiAgICAgICAgXG4gICAgICAgIGxldCBuZXdTbGlkZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIG5ld1NsaWRlRGl2LmNsYXNzTGlzdC5hZGQoJ3NsaWRlJylcbiAgICAgICAgbmV3U2xpZGVEaXYuY2xhc3NMaXN0LmFkZChgJHtkaXZDbGFzc31gKVxuICAgICAgICBuZXdTbGlkZURpdi5pbm5lclRleHQgPSBuZXdXb3JkXG4gICAgICAgIFxuICAgICAgICBzbGlkZXIuaW5zZXJ0QmVmb3JlKG5ld1NsaWRlRGl2LCBzbGlkZXIubGFzdENoaWxkKVxuICAgICAgICBzbGlkZXIubGFzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ291dG9mcmFuZ2UnKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhzbGlkZXNBcnJheSlcbiAgICAgICAgLy8gYnVpbGRTbGlkZXIoc2xpZGVzQXJyYXksIGRpdkNsYXNzKSAgICBcbiAgICB9KVxuXG4gICAgc2xpZGVyLmZpcnN0Q2hpbGQuY2xhc3NMaXN0LnJlbW92ZSgnb3V0b2ZyYW5nZScpXG5cbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNsaWRlcilcbiAgICByZXR1cm4gd3JhcHBlclxuXG59XG5cbiIsImltcG9ydCB7IGxvYWRFbXBhdGh5TmF2IH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IHNlY3Rpb25IZWFkZXIgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgbG9hZENvbXBsYWludHMgfSBmcm9tIFwiLi9jb21wbGFpbnRzXCI7XG5pbXBvcnQgY29tcGxhaW50cyBmcm9tICcuL2NvbXBsYWludHMuanNvbidcbmltcG9ydCB7IGJ1aWxkU2xpZGVyIH0gZnJvbSBcIi4vYnVpbGRTbGlkZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbXBsZXRlQnV0dG9uIH0gZnJvbSBcIi4vY29tcGxldGVCdXR0b25cIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbXBsYWludEVtcGF0aHkod29yZCl7XG4gICAgbG9hZEVtcGF0aHlOYXYod29yZCwgbG9hZENvbXBsYWludHMpXG4gICAgbG9hZENvbnRhaW5lcih3b3JkKTtcbn1cblxuXG5mdW5jdGlvbiBsb2FkQ29udGFpbmVyKHdvcmQpe1xuICAgIC8vIENMRUFSIENPTlRBSU5FUiAgXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgZmFsc2UpO1xuICAgIC8vIENSRUFURSBJTklUSUFMIEZFRUxJTkdTIFNFQ1RJT05cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIklOSVRJQUwgRkVFTElOR1NcIikpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkU2xpZGVyKGNvbXBsYWludHNbd29yZF1bXCJpbml0aWFsRmVlbGluZ3NcIl0sICdpbml0aWFsRmVlbGluZycpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiVU5ERVJMWUlORyBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcInVuZGVybHlpbmdGZWVsaW5nc1wiXSwgJ3VuZGVybHlpbmdGZWVsaW5nJykpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNlY3Rpb25IZWFkZXIoXCJORUVEU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoY29tcGxhaW50c1t3b3JkXVtcIm5lZWRzXCJdLCAnbmVlZCcpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQ29tcGxldGVCdXR0b24oKSlcbn0iLCJpbXBvcnQgeyBsb2FkTGlzdENvbnRhaW5lciB9IGZyb20gXCIuXCJcbmltcG9ydCB7IGxvYWRDb21wbGFpbnRFbXBhdGh5IH0gZnJvbSBcIi4vY29tcGxhaW50RW1wYXRoeVwiXG5pbXBvcnQgeyBsb2FkTGlzdE5hdiB9IGZyb20gXCIuXCJcbmltcG9ydCBjb21wbGFpbnRzIGZyb20gJy4vY29tcGxhaW50cy5qc29uJ1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbXBsYWludHMoKXtcbiAgICBjb25zdCBjb21wbGFpbnRMaXN0ID0gW11cbiAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBsYWludHMpKSB7XG4gICAgICAgICAgICBjb21wbGFpbnRMaXN0LnB1c2goa2V5KVxuICAgICAgICB9XG5cbiAgICBsb2FkTGlzdE5hdignVGhleVxcJ3JlIGJlaW5nLi4uJylcbiAgICBsb2FkTGlzdENvbnRhaW5lcihjb21wbGFpbnRMaXN0LCAnY29tcGxhaW50JywgbG9hZENvbXBsYWludEVtcGF0aHkpXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbXBsZXRlQnV0dG9uKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcbiAgICBjb21wbGV0ZUJ1dHRvbi5pbm5lclRleHQgPSBcIkknbSBjb21wbGV0ZVwiXG4gICAgY29tcGxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgbGV0IG91dE9mUmFuZ2VTbGlkZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub3V0b2ZyYW5nZScpO1xuICAgICAgICBvdXRPZlJhbmdlU2xpZGVzLmZvckVhY2gocyA9PiBzLmNsYXNzTGlzdC5hZGQoJ2RpbScpKVxuICAgIH0pO1xuICAgIHJldHVybiBjb21wbGV0ZUJ1dHRvblxufSIsIi8vIGltcG9ydCB7IGxvYWRIb21lIH0gZnJvbSBcIi4vaG9tZVwiO1xuaW1wb3J0IHsgbG9hZEVtcGF0aHlOYXYgfSBmcm9tIFwiLlwiO1xuaW1wb3J0IHsgc2VjdGlvbkhlYWRlciB9IGZyb20gXCIuXCI7XG5pbXBvcnQgeyBidWlsZFNsaWRlciB9IGZyb20gXCIuL2J1aWxkU2xpZGVyXCI7XG5pbXBvcnQgeyBsb2FkRmVlbGluZ3MgfSBmcm9tIFwiLi9mZWVsaW5nc1wiO1xuaW1wb3J0IGZlZWxpbmdzIGZyb20gJy4vZmVlbGluZ3MuanNvbidcbmltcG9ydCB7IGNyZWF0ZUNvbXBsZXRlQnV0dG9uIH0gZnJvbSBcIi4vY29tcGxldGVCdXR0b25cIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZlZWxpbmdFbXBhdGh5KHdvcmQpe1xuICAgIGxvYWRFbXBhdGh5TmF2KHdvcmQsIGxvYWRGZWVsaW5ncylcbiAgICBsb2FkQ29udGFpbmVyKHdvcmQpO1xuICAgIFxufVxuXG5cbmZ1bmN0aW9uIGxvYWRDb250YWluZXIod29yZCl7XG4gICAgLy8gQ0xFQVIgQ09OVEFJTkVSICBcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgICAvLyBMT0FEIFVOREVSTFlJTkcgRkVFTElOR1MgU0VDVElPTlxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiVU5ERVJMWUlORyBGRUVMSU5HU1wiKSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYnVpbGRTbGlkZXIoZmVlbGluZ3Nbd29yZF1bXCJ1bmRlcmx5aW5nRmVlbGluZ3NcIl0sICd1bmRlcmx5aW5nRmVlbGluZycpKVxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiTkVFRFNcIikpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkU2xpZGVyKGZlZWxpbmdzW3dvcmRdW1wibmVlZHNcIl0sICduZWVkJykpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUNvbXBsZXRlQnV0dG9uKCkpXG59XG5cbiIsImltcG9ydCB7IGxvYWRMaXN0Q29udGFpbmVyIH0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IGxvYWRGZWVsaW5nRW1wYXRoeSB9IGZyb20gXCIuL2ZlZWxpbmdFbXBhdGh5XCI7XG5pbXBvcnQgeyBsb2FkTGlzdE5hdiB9IGZyb20gXCIuXCI7XG5pbXBvcnQgZmVlbGluZ3MgZnJvbSAnLi9mZWVsaW5ncy5qc29uJ1xuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEZlZWxpbmdzKCkge1xuICAgIGNvbnN0IGZlZWxpbmdMaXN0ID0gW11cbiAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXMoZmVlbGluZ3MpKSB7XG4gICAgICAgIGZlZWxpbmdMaXN0LnB1c2goa2V5KVxuICAgIH1cblxuICAgIGxvYWRMaXN0TmF2KCdJXFwnbSBmZWVsaW5nLi4uJyk7XG4gICAgbG9hZExpc3RDb250YWluZXIoZmVlbGluZ0xpc3QsICdmZWVsaW5nJywgbG9hZEZlZWxpbmdFbXBhdGh5KVxufVxuIiwiaW1wb3J0IHsgbG9hZEZlZWxpbmdzIH0gZnJvbSBcIi4vZmVlbGluZ3NcIjtcbmltcG9ydCB7IGxvYWRDb21wbGFpbnRzIH0gZnJvbSBcIi4vY29tcGxhaW50c1wiO1xuaW1wb3J0IHsgc2VjdGlvbkhlYWRlciB9IGZyb20gXCIuXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkSG9tZSgpIHtcbiAgICBsb2FkTmF2KCk7XG4gICAgbG9hZENvbnRhaW5lcigpO1xufVxuXG4vLyBMT0FEIE5BViBCQVIgU1RZTEVEIE9OTFkgRk9SIEhPTUUgTU9EVUxFXG5mdW5jdGlvbiBsb2FkTmF2KCl7XG4gICAgY29uc3QgbmF2SGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZoZWFkJylcbiAgICBuYXZIZWFkLmlubmVySFRNTCA9ICcnXG4gICAgbmF2SGVhZC5jbGFzc0xpc3QucmVtb3ZlKCdzdWJzZWN0aW9uJylcblxuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNlY3Rpb25UaXRsZS5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uVGl0bGUnKVxuICAgIHNlY3Rpb25UaXRsZS5pbm5lclRleHQgPSBcInNlbGYtZW1wYXRoeVwiXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuICAgIGNvbnN0IGluZm9CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbmZvQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9pbmZvLWNpcmNsZS5zdmdcIlxuICAgIGluZm9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVJbmZvQm94KVxuICAgIG5hdkhlYWQuYXBwZW5kQ2hpbGQoaW5mb0J1dHRvbilcbiAgICBcbiAgICByZXR1cm4gbmF2SGVhZDtcbn1cblxuLy8gTE9BRCBDT05UQUlORVIgU1RZTEVEIE9OTFkgRk9SIEhPTUUgTU9EVUxFXG5mdW5jdGlvbiBsb2FkQ29udGFpbmVyKCl7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpO1xuICAgIC8vIGNsZWFyIGNvbnRhaW5lclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmdWxsSGVpZ2h0JylcblxuICAgIC8vIGFkZCBjb21wbGFpbnQgc2VjdGlvbiBidXR0b25cbiAgICAvLyBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2VjdGlvbkhlYWRlcihcIlNUQVJUIFdJVEggQSBDT01QTEFJTlRcIikpXG4gICAgY29uc3QgY29tcGxhaW50U2VjdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXBsYWludFNlY3Rpb25CdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VjdGlvbkJ1dHRvbicpXG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdjb21wbGFpbnQnKVxuICAgIGNvbnN0IGNvbXBsYWludFF1b3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb21wbGFpbnRRdW90ZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlUXVvdGUnKVxuICAgIGNvbXBsYWludFF1b3RlLmlubmVyVGV4dCA9ICdUaGV5XFwncmUgYmVpbmcuLi4nXG4gICAgY29tcGxhaW50U2VjdGlvbkJ1dHRvbi5hcHBlbmRDaGlsZChjb21wbGFpbnRRdW90ZSlcbiAgICBjb21wbGFpbnRTZWN0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZENvbXBsYWludHMpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXBsYWludFNlY3Rpb25CdXR0b24pXG5cbiAgICAvLyBhZGQgZmVlbGluZyBzZWN0aW9uIGJ1dHRvblxuICAgIC8vIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWN0aW9uSGVhZGVyKFwiU1RBUlQgV0lUSCBBIEZFRUxJTkdcIikpXG4gICAgY29uc3QgZmVlbGluZ1NlY3Rpb25CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWN0aW9uQnV0dG9uJylcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdmZWVsaW5nJylcbiAgICBjb25zdCBmZWVsaW5nUXVvdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGZlZWxpbmdRdW90ZS5jbGFzc0xpc3QuYWRkKCdleGFtcGxlUXVvdGUnKVxuICAgIGZlZWxpbmdRdW90ZS5pbm5lclRleHQgPSAnSVxcJ20gZmVlbGluZy4uLidcbiAgICBmZWVsaW5nU2VjdGlvbkJ1dHRvbi5hcHBlbmRDaGlsZChmZWVsaW5nUXVvdGUpXG4gICAgZmVlbGluZ1NlY3Rpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkRmVlbGluZ3MpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZlZWxpbmdTZWN0aW9uQnV0dG9uKVxuXG4gICAgLy8gY3JlYXRlIGhpZGRlbiBpbmZvQm94XG4gICAgY29uc3QgaW5mb0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaW5mb0JveC5jbGFzc0xpc3QuYWRkKCdpbmZvQm94JylcbiAgICBpbmZvQm94LnRleHRDb250ZW50ID0gXCJBbiBvbmxpbmUgZ3VpZGUgdG8gc3VwcG9ydCB0aGUgc2VsZi1lbXBhdGh5IHByb2Nlc3MuIFN0YXJ0IHdpdGggYSBjb21wbGFpbnQgb3IgZmVlbGluZyB0byBjb25uZWN0IHdpdGggeW91ciB1bmRlcmx5aW5nIGZlZWxpbmdzIGFuZCBuZWVkcy4gTm8gdXNlciBpbmZvcm1hdGlvbiBpcyByZWNvcmRlZC5cIlxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvQm94KVxuXG5cbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5cbmZ1bmN0aW9uIHRvZ2dsZUluZm9Cb3goKSB7XG4gICAgY29uc3QgaW5mb0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvQm94JylcbiAgICBpbmZvQm94LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3cnKVxuICAgIC8vIGFkZCBjbG9zZSBidXR0b24gdG8gaW5mb0JveC4gYWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRvZ2dsZSBzaG93IGNsYXNzXG59IiwiaW1wb3J0IHsgbG9hZEhvbWUgfSBmcm9tIFwiLi9ob21lXCI7XG5cbi8vIFBBR0UgTE9BRCBGVU5DVElPTiBDUkVBVEVTIFBBR0UgU1RSVUNUVVJFIEZPUiBET00gTUFOSVBVTEFUSU9OIEJZIE9USEVSIE1PRFVMRVNcbmZ1bmN0aW9uIHBhZ2VMb2FkKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ25hdicpO1xuICAgIG5hdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm5hdmhlYWRcIilcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNvbnRhaW5lclwiKVxuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpXG5cbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcilcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobmF2KVxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXG4gICAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8vIElOSVRJQUxJWkUgQVBQIEJZIExPQURJTkcgVEhFIERPTSBFTEVNRU5UUyBBTkQgVEhFTiBDQUxMSU5HIFRIRSBMT0FESE9NRSBNT0RVTEVcbnBhZ2VMb2FkKClcbmxvYWRIb21lKClcblxuXG5cbi8vIEZVTkNUSU9OUyBCRUxPVyBBUkUgU0hBUkVEIEJFVFdFRU4gQU5EIENBTExFRCBCWSBPVEhFUiBNT0RVTEVTOlxuXG4vLyBSRVRVUk5TIE5BViBCQVIgU1RZTEVEIEZPUiBQQUdFIDIgV0lUSCBTRUxFQ1RFRCBXT1JEIElOIEhFQURFUlxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRMaXN0TmF2KGhlYWRlclRleHQpe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LmFkZCgnc3Vic2VjdGlvbicpXG4gICAgLy8gbGV0IHNlYXJjaEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAvLyBzZWFyY2hBcmVhLnNyYyA9ICcuL2ljb25zL3NlYXJjaC5zdmcnXG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IGhlYWRlclRleHRcbiAgICBsZXQgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaG9tZUJ1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaG91c2Uuc3ZnXCJcbiAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEhvbWUpXG4gICAgLy8gbmF2SGVhZC5hcHBlbmRDaGlsZChzZWFyY2hBcmVhKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcblxuICAgIHJldHVybiBuYXZIZWFkXG59XG5cblxuLy8gUkVUVVJOUyBBIExJU1QgT0YgRElWUyBJTiBUSEUgQ09OVEFJTkVSIEZPUiBQQUdFIDJcbmV4cG9ydCBmdW5jdGlvbiBsb2FkTGlzdENvbnRhaW5lcihsaXN0LCBsaXN0Q2xhc3MsIGxpc3RGdW5jdGlvbil7XG4gICAgLy8gQ0xFQVIgQ09OVEFJTkVSXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpXG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Z1bGxIZWlnaHQnKVxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICAgIFxuICAgIGNvbnN0IGl0ZW1QcmVzc2VkID0gKGUpID0+IHtcbiAgICAgICAgbGlzdEZ1bmN0aW9uKGUudGFyZ2V0LmlubmVyVGV4dClcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGxpc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKCdyZWN0YW5nbGUnLCBsaXN0Q2xhc3MpO1xuICAgICAgICBsaXN0RGl2LmlubmVyVGV4dCA9IGxpc3RbaV07XG4gICAgICAgIGxpc3REaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpdGVtUHJlc3NlZClcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3REaXYpXG4gICAgfVxuICAgIC8vIEFERCArIERJViBXSVRIIENMSUNLIEVWRU5UXG4gICAgbGV0IHBsdXNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbHVzRGl2LmNsYXNzTGlzdC5hZGQoJ3JlY3RhbmdsZScsIGxpc3RDbGFzcyk7XG4gICAgcGx1c0Rpdi5pbm5lclRleHQgPSAnKyc7XG4gICAgcGx1c0Rpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHJvbXB0KFwiU3VnZ2VzdCBhbm90aGVyIHdvcmQ6XCIpXG4gICAgfSlcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGx1c0RpdilcblxuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuXG4vLyBSRVRVUk5TIE5BViBCQVIgU1RZTEVEIEZPUiBQQUdFIDMgV0lUSCBTRUxFQ1RFRCBXT1JEIElOIEhFQURFUlxuLy8gQkFDSyBGVU5DVElPTiBQT0lOVFMgVE8gUFJFVklPVVMgUEFHRSBNT0RVTEVcbmV4cG9ydCBmdW5jdGlvbiBsb2FkRW1wYXRoeU5hdih3b3JkLCBiYWNrRnVuY3Rpb24pe1xuICAgIGNvbnN0IG5hdkhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aGVhZCcpXG4gICAgbmF2SGVhZC5pbm5lckhUTUwgPSAnJ1xuICAgIG5hdkhlYWQuY2xhc3NMaXN0LmFkZCgnc3Vic2VjdGlvbicpXG4gICAgbGV0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBiYWNrQnV0dG9uLnNyYyA9IFwiLi9pY29ucy9hcnJvdy1sZWZ0LXNob3J0LnN2Z1wiXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJhY2tGdW5jdGlvbik7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgc2VjdGlvblRpdGxlLmNsYXNzTGlzdC5hZGQoJ3NlY3Rpb25UaXRsZScpXG4gICAgc2VjdGlvblRpdGxlLmlubmVyVGV4dCA9IHdvcmRcbiAgICBsZXQgaG9tZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaG9tZUJ1dHRvbi5zcmMgPSBcIi4vaWNvbnMvaG91c2Uuc3ZnXCJcbiAgICBob21lQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG9hZEhvbWUpXG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChiYWNrQnV0dG9uKTtcbiAgICBuYXZIZWFkLmFwcGVuZENoaWxkKHNlY3Rpb25UaXRsZSk7XG4gICAgbmF2SGVhZC5hcHBlbmRDaGlsZChob21lQnV0dG9uKTtcblxuICAgIHJldHVybiBuYXZIZWFkXG59XG5cblxuLy8gUkVUVVJOUyBBIEhFQURFUiBURVhUIERJViBVU0VEIE9OIFBBR0UgM1xuZXhwb3J0IGZ1bmN0aW9uIHNlY3Rpb25IZWFkZXIodGV4dCl7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2VjdGlvbkhlYWRlcicpXG4gICAgaGVhZGVyLmlubmVyVGV4dCA9IHRleHRcbiAgICBcbiAgICByZXR1cm4gaGVhZGVyXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
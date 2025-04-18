const BUTTON_DIST = 170

position = "m"

dots = {
    "l": document.getElementById("leftdot"),
    "m": document.getElementById("middledot"),
    "r": document.getElementById("rightdot"),
}

styles = {
    "l": "light-theme",
    "m": "dark-theme",
    "r": "blue-theme"
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

function rotate(dir) {
    if (dir == position) {
        return 
    }

    dots[position].classList.remove("selected-dot")
    dots[position].classList.add("unselected-dot")

    dots[dir].classList.add("selected-dot")
    dots[dir].classList.remove("unselected-dot")

    dial = document.getElementById("dial")
    dial.style.animation = "r" + position + dir + " 0.7s forwards"
    position = dir 

    setStyle(dir)
    
}

function setStyle(dir) {
    body = document.getElementById("body")

    body.classList = []
    body.classList.add("universal")
    body.classList.add(styles[dir])
}

function setElementPosFromCenter(element, distance, degrees) {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    const angleRadians = degrees * (Math.PI / 180)
    const offsetX = distance * Math.cos(angleRadians);
    const offsetY = distance * Math.sin(angleRadians);

    element.style.position = "absolute";
    element.style.left = `calc(${centerX + offsetX}px - 30px)`
    element.style.top = `calc(${centerY + offsetY}px - 30px)`
}

function positionButtons() {
    middleButton = document.getElementById("middlebutton")
    leftButton = document.getElementById("leftbutton")
    rightButton = document.getElementById("rightbutton")
    setElementPosFromCenter(middleButton, BUTTON_DIST, -90)
    setElementPosFromCenter(leftButton, BUTTON_DIST, -126)
    setElementPosFromCenter(rightButton, BUTTON_DIST, -54)
}

function textRandomiseEffect(label) {
    if (label.classList.contains("randomise-running")) {
        return
    }
    label.classList.add("randomise-running")
    const originalText = label.innerHTML

    function getRandomChar() {
        chars = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM1234567890"
    
        return chars[Math.floor(Math.random() * chars.length)]
    }

    function randomiseText(x, y) {
        for (let i = x; i < y; i++) {
            label.innerHTML = label.innerHTML.replaceAt(i, getRandomChar())
        }
    }

    randomiseText(0, originalText.length)

    for (let i = 0; i < originalText.length - 1; i++) {
        setTimeout(function() {
            label.innerHTML = label.innerHTML.replaceAt(i, originalText[i])
            randomiseText(i + 1, originalText.length)
        }, (i + 1) * 100)
    }

    setTimeout(function() {
        label.innerHTML = originalText
        label.classList.remove("randomise-running")
    }, originalText.length * 100)

}

function setupDots() {
    dotsDiv = document.getElementById("dots")
    dotsDiv.childNodes = []

    while (true) {
        dotTemplate = document.createElement("span")
        dotTemplate.classList.add("background-dot")
        newDot = dotsDiv.appendChild(dotTemplate)
        
        yPos = newDot.getBoundingClientRect().y
        windowHeight = window.innerHeight

        if (yPos > windowHeight) {
            console.log("Broken")
            break
        }
    }
}

function init() {
    setStyle("m")

    positionButtons()
    setupDots()

    addEventListener("resize", (event) => {
        positionButtons()
        setupDots()
    })

    // Detect Mouseover of Dark Button and Start Effect
    darkButton = document.getElementById("middlebutton")
    darkLabel = document.getElementById("dark-label")

    darkButton.addEventListener("mouseenter", (event) => {
        textRandomiseEffect(darkLabel)
    })

    // Detect Mouseover of Light Button and Start Effect
    lightButton = document.getElementById("leftbutton")
    lightLabel = document.getElementById("light-label")

    lightButton.addEventListener("mouseenter", (event) => {
        textRandomiseEffect(lightLabel)
    })

    // Detect Mouseover of Light Button and Start Effect
    oceanButton = document.getElementById("rightbutton")
    oceanLabel = document.getElementById("ocean-label")

    oceanButton.addEventListener("mouseenter", (event) => {
        textRandomiseEffect(oceanLabel)
    })
}

init()
position = "m"

dots = {
    "l": document.getElementById("leftdot"),
    "m": document.getElementById("middledot"),
    "r": document.getElementById("rightdot"),
}

styles = {
    "l": [
        "#FFF",
        "#000",
        "images/left.png"
    ],
    "m": [
        "#000",
        "#FFF",
        "images/middle.png"
    ],
    "r": [
        "#456",
        "#202c38",
        "images/right.png"
    ]
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
    unselectedDots = document.getElementsByClassName("unselected-dot")
    unselectedDots[0].style.border = "1px solid " + styles[dir][1]
    unselectedDots[1].style.border = "1px solid " + styles[dir][1]

    selectedDot = document.getElementsByClassName("selected-dot")
    selectedDot[0].style.border = "1px solid #c6831f"

    body = document.getElementById("body")
    body.style.background = styles[dir][0]

    dial = document.getElementById("dial")
    dial.src = styles[dir][2]
}

setStyle("m")
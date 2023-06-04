const char = document.getElementById("char");
const mouse = document.getElementById("mouse");
var scoreboard = document.getElementById("scorepoints");
var score = 0;

var movementinterval = 10;
var movementtime = "0.15s";
var charsize = 7;
var mouse_size = 5;
document.documentElement.style.setProperty("--charmoveinterval", movementinterval + "rem");
document.documentElement.style.setProperty("--charsize", charsize + "rem" );
document.documentElement.style.setProperty("--mousesize", mouse_size + "rem" );


function getRemPixelValue() {
  const htmlElement = document.querySelector("html");
  const computedFontSize = window.getComputedStyle(htmlElement).fontSize;
  
  // Parse the computed font size value
  const fontSizeValue = parseFloat(computedFontSize);
  
  // Calculate the pixel value of 1rem
  const remPixelValue = fontSizeValue;
  
  return remPixelValue;
}

// sets initial starting pos
char.style.left = (screen.width/2)/getRemPixelValue() + 'rem' ;
char.style.top = (screen.height/2)/getRemPixelValue() + 'rem';

var animationongoing = false

char.addEventListener("animationend", (event) => {
  console.count(char.style.left)
  if (event.animationName === "moveup"){
    char.style.animation = "none";
    char.style.top = parseInt(char.style.top) - movementinterval + 'rem';
    animationongoing = false;
  }
  else if (event.animationName === "movedown"){
    char.style.animation = "none";
    char.style.top = parseInt(char.style.top) + movementinterval + 'rem';
    animationongoing = false;
  }
  else if (event.animationName === "moveleft"){
    char.style.animation = "none";
    char.style.left = parseInt(char.style.left) - movementinterval + 'rem';
    animationongoing = false;
  }
  else if (event.animationName === "moveright"){
    char.style.animation = "none";
    char.style.left = parseInt(char.style.left) + movementinterval + 'rem';
    animationongoing = false;
  }
  if (checkoverlap(char, mouse)){
    mouse_caught()
  }
});


// for keyboard inputs
function movement_detector(){
  document.addEventListener("keydown", (event) => {
  if (animationongoing === false){
    console.count(event.code)
    animationongoing = true
    switch (event.code) {
      case "ArrowUp":
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "moveup " + movementtime + " forwards linear";
        break;
      case "ArrowDown":
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "movedown " + movementtime + " forwards linear";
        console.log("down pressed");
        break;
      case "ArrowLeft":
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "moveleft " + movementtime + " forwards linear";
        break;
      case "ArrowRight":
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "moveright " + movementtime + " forwards linear";
        break;
    }
  }
});
};
movement_detector()
// calls movement detector function to get the event listener initialised







function spawn_mouse(){
  mouse.style.display = ""
  mouse.style.left = parseInt((Math.random() * 80), 10) + '%';
  mouse.style.top = parseInt((Math.random() * 80), 10) + '%';
} 
spawn_mouse()

function checkoverlap(div1, div2) {
  const rect1 = div1.getBoundingClientRect();
  const rect2 = div2.getBoundingClientRect();
  
  return !(
    rect1.right < rect2.left || 
    rect1.left > rect2.right || 
    rect1.bottom < rect2.top || 
    rect1.top > rect2.bottom
  );
}

function despawn_mouse(){
  mouse.style.display = "none";
}


function mouse_caught(){
  despawn_mouse();
  spawn_mouse();
  score += 1;
  scoreboard.textContent = score.toString();
  const meow = new Audio("meow.mp3");
  meow.play();
}


//THE CHATTGPT ZONE:
// Get references to the buttons
const upButton = document.getElementById("upButton");
const leftButton = document.getElementById("leftButton");
const downButton = document.getElementById("downButton");
const rightButton = document.getElementById("rightButton");

// Add event listeners to the buttons
function movement_detector_buttons(){

    upButton.addEventListener("click", function() {
      console.log("Up button clicked!");
      if (animationongoing === false){
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "moveup " + movementtime + " forwards linear";
        animationongoing = true;
      }
    });

    leftButton.addEventListener("click", function() {
      if (animationongoing === false){
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "moveleft " + movementtime + " forwards linear";
        animationongoing = true;
      }
    });

    downButton.addEventListener("click", function() {
      if (animationongoing === false){
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "movedown " + movementtime + " forwards linear";
        console.log("down pressed");
        animationongoing = true;
      }
    });

    rightButton.addEventListener("click", function() {
      if (animationongoing === false){
        char.style.animation = "none";
        char.offsetWidth;
        char.style.animation = "moveright " + movementtime + " forwards linear";
        animationongoing = true;
      }
    });
  
}
movement_detector_buttons()


//ensure this part remains
window.addEventListener("focus", function() {
  // ensures that the movement detector is reintialised whenever the window is unfocussed and refocussed again. apparently eventlisteners can be disabled upon unfocussing
    movement_detector();
    movement_detector_buttons();
    console.log("refocused");
  });
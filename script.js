const char = document.getElementById("char");
const mouse = document.getElementById("mouse");
var scoreboard = document.getElementById("scorepoints");
var score = 0;

var movementinterval = 100;
var movementtime = "0.15s";
var charsize = 100;
var mouse_size = 70;
document.documentElement.style.setProperty("--charmoveinterval", movementinterval + "px");
document.documentElement.style.setProperty("--charsize", charsize + "px" );
document.documentElement.style.setProperty("--mousesize", mouse_size + "px" );

// sets initial starting pos
char.style.left = screen.width/2 + 'px';
char.style.top = screen.height/2 + 'px';

var animationongoing = false

char.addEventListener("animationend", (event) => {
  console.count(char.style.left)
  if (event.animationName === "moveup"){
    char.style.animation = "none";
    char.style.top = parseInt(char.style.top) - movementinterval + 'px';
    animationongoing = false;
  }
  else if (event.animationName === "movedown"){
    char.style.animation = "none";
    char.style.top = parseInt(char.style.top) + movementinterval + 'px';
    animationongoing = false;
  }
  else if (event.animationName === "moveleft"){
    char.style.animation = "none";
    char.style.left = parseInt(char.style.left) - movementinterval + 'px';
    animationongoing = false;
  }
  else if (event.animationName === "moveright"){
    char.style.animation = "none";
    char.style.left = parseInt(char.style.left) + movementinterval + 'px';
    animationongoing = false;
  }
  if (checkoverlap(char, mouse)){
    mouse_caught()
  }
});

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

window.addEventListener("focus", function() {
// ensures that the movement detector is reintialised whenever the window is unfocussed and refocussed again. apparently eventlisteners can be disabled upon unfocussing
  movement_detector();
  console.log("refocused");
});

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
}





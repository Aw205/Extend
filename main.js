title = "Extend";

description = `Hold to extend `;

characters = [];

const G = {
	WIDTH: 100,
	HEIGHT: 150
};

options = {

  isPlayingBgm: false,
  theme: "dark",
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

/** @type {Vector[]} */
let pins;
let pinSizes;
let cord;
let mainPin;
let canExtend = true;

let nextPinDist;
let speed = 0.3;
const minCordLength = 10;
const maxCordLength = 60;

function update() {
  if (!ticks) {
    pins = [vec(50, 5)];
    pinSizes = [3];
    mainPin = vec(50,100);
    nextPinDist = 5;
    cord = {angle: 0, length: minCordLength, pin: mainPin};
  }

  let scroll = 0.1;

  if(cord.length == minCordLength){
    canExtend = true;
  }
  if(input.isJustReleased || cord.length == maxCordLength){
    canExtend = false;
  }
  if (input.isPressed && canExtend) {
    cord.length += 1;
    
  } else {
    cord.length += (minCordLength - cord.length) * 0.05;
    if(abs(cord.length - minCordLength) < 1){
      cord.length = minCordLength;
    }
    cord.angle += 0.08;
  }

 
  color("red");
  line(cord.pin, vec(cord.pin).addWithAngle(cord.angle, cord.length));

  color("yellow");
  box(mainPin,3);

  color("black")
      remove(pins, (p) => {
        p.y+= speed;
        const index = pins.indexOf(p);
        if (box(p,pinSizes[index]).isColliding.rect.red) {
          addScore(ceil(cord.pin.distanceTo(p)), p);
         
          pinSizes.splice(index,1);
          play("coin");
          return true;
        }
        if(p.y> G.HEIGHT + 2 ){
          end();
        }
        return false;
      });
  
  nextPinDist -= scroll;
  while (nextPinDist < 0) {
    pins.push(vec(rnd(10, 90), -2 - nextPinDist));
    pinSizes.push(rnd(3,9));
    nextPinDist += rnd(5, 15);
  }
}



addEventListener("load", onLoad);
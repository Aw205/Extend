title = "Extend";

description = `Hold to extend`;

characters = [
 
];

const G = {
	WIDTH: 100,
	HEIGHT: 150,
  MIN_CORD_LENGTH: 10,
  MAX_CORD_LENGTH: 60,
  EPSILON: 1,
  ROTATION_RATE: 0.08
};

options = {

  seed: 925,
  isReplayEnabled: true,
  isPlayingBgm: true,
  theme: "shapeDark",
  viewSize: {x: G.WIDTH, y: G.HEIGHT}
};

let pins;
let cord;
let canExtend = true;
let nextPinDist;
let speed = 0.3;

function update() {
  if (!ticks) {
    pins = [];
    nextPinDist = 5;
    cord = {angle: 0, length: G.MIN_CORD_LENGTH, pin: vec(50,100)};
  }

  let scroll = 0.1;

  if(cord.length == G.MIN_CORD_LENGTH){
    canExtend = true;
  }
  if(input.isJustReleased || cord.length == G.MAX_CORD_LENGTH){
    canExtend = false;
  }
  if (input.isPressed && canExtend) {
    cord.length += 1; 
  } else {
    cord.length += (G.MIN_CORD_LENGTH - cord.length) * 0.05;
    if(abs(cord.length - G.MIN_CORD_LENGTH) < G.EPSILON){
      cord.length = G.MIN_CORD_LENGTH;
    }
    cord.angle += G.ROTATION_RATE;
  }

 
  color("red");
  line(cord.pin, vec(cord.pin).addWithAngle(cord.angle,cord.length));
  color("yellow");
  box(cord.pin,3);

  color("black")
      remove(pins, (p) => {
        p.pos.y+= speed;
        if (box(p.pos,p.size).isColliding.rect.red) {
          
          color("yellow");
          particle(p.pos);
          addScore(ceil(cord.pin.distanceTo(p.pos)), p.pos);
          play("coin");
          return true;
        }
        if(p.pos.y > G.HEIGHT + 2 ){
          end();
        }
        return false;
      });
  
  nextPinDist -= scroll;
  while (nextPinDist < 0) {
    pins.push({pos: vec(rnd(10, 90), -2 - nextPinDist), size: rnd(3,9)});
    nextPinDist += rnd(5, 15);
  }
}
addEventListener("load", onLoad);
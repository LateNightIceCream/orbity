
var orb1;

var circleRadius;
var circleX, circleY;
var circleDia = 0;


var n = 10; // number of orbits
let orbitArray = [];

const phi = 0.61803398875;

var t = 0;

function setup() {

  createCanvas(1000, 1000);

  colorMode(HSB, 360, 100, 100);


  /////////////////////////////////

  circleX = width*0.618;
  circleY = height/2;

  for(var i = n; i>0; i--) {

    circleDia = width*pow(0.618, i);

    circleX = circleX + pow(-1, i) * circleDia/2;

    circle(circleX, circleY, circleDia);

    orbitArray.push(new Orbit(circleX, circleY, circleDia, 33, 0));

  }

  frameRate(60);

}


function draw() {

  background(0, 0, 33);

  noFill();
  stroke(0,0,50);

  for(var i = 0; i < orbitArray.length; i++) {

    orbitArray[i].t += 0.1/(i+1);
    //orbitArray[i].numOfPlanets = i*round(sin(t*i));
    //orbitArray[i].hue = 360*abs(sin(0.05 * t));
    orbitArray[i].planetHue = 0;
    orbitArray[i].planetSat = 120*0.382;
    orbitArray[i].planetD = orbitArray[i].cD * 0.0557281;
    strokeWeight(orbitArray[i].planetD/2 * 0.618);

    orbitArray[i].orbitBri = 100;
    orbitArray[i].orbitHue = orbitArray[i].planetHue * 0.382;
    orbitArray[i].orbitSat = orbitArray[i].planetSat * 0.382;

    orbitArray[i].show();

  }


  t += 0.01;

}

class Orbit {

  constructor(_cX, _cY, _cD, _numOfPlanets, _t) {

    this.cX = _cX;
    this.cY = _cY;
    this.cD = _cD;
    this.numOfPlanets = _numOfPlanets;
    this.t   = _t;

    this.orbitHue = 0;
    this.orbitSat = 0;
    this.orbitBri = 360;

    this.planetX = 0;
    this.playnetY = 0;

    this.planetD = 10;

    this.planetHue = 0;
    this.planetSat = 0;
    this.planetBri = 360;

  }

  show() {

    noFill();
    stroke(this.orbitHue,this.orbitSat,this.orbitBri);
    circle(this.cX, this.cY, this.cD);

    // planet(s)
    fill(this.planetHue,this.planetSat,this.planetBri);

    for(var i = 0; i<this.numOfPlanets; i++) {

      this.planetX = this.cX + this.cD/2 * cos(this.t + 2*PI/this.numOfPlanets*i);
      this.planetY = this.cY + this.cD/2 * sin(this.t + 2*PI/this.numOfPlanets*i);

      noStroke();
      circle(this.planetX, this.planetY, this.planetD);

    }

  }

}

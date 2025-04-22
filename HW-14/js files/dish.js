let ancientLanguage;
let Charlie;
let World;
let demonHead;
let fire;
let eyeArray = [];
let eye;
let man;
let angryWoman;
let sadPerson;
let rotom;
let ChanseyBall;
let Rotom;

var CharlieX = -500;
var CharlieY = 100;
var EarthX = 300;
var EarthY = -50;
var EarthZ = 50;

var randomTranslationX = 100;
var randomTranslationY = -200;
function preload() {
    ancientLanguage = loadFont('./Fonts/Galldr.ttf')
    Charlie = loadImage('./images/Charlie_(SF).webp')
    World = loadImage('./images/world.webp')
    demonHead = loadModel('./images/demonhead.obj', true);
    fire = loadImage('./images/fire.jpg')
    eye = loadImage('./images/eye.png')
    man = loadImage('./images/scaredGuy.jpg')
    angryWoman = loadImage('./images/angryWoman.jpg')
    sadPerson = loadImage('./images/scaredGuy.jpg')
    ChanseyBall = loadImage('./images/chansey.png')
    Rotom = loadImage('./images/rotom.png')
    
}
function setup() {
    createCanvas(1200, 550, WEBGL);
    
    eyeArray.push(new shapeClass("sphere", 50,  0.5, 0.5, 0.5, randomTranslationX, randomTranslationY, eye));
    
}

function draw() {
    background(10,0,0);
    normalMaterial();

    for (var i = 0; i < eyeArray.length; i++) {
        eyeArray[i].draw(frameCount);
      }

    push();
    scale(1.5);
    rotateX(frameCount * 0.3);
    rotateY(frameCount * 0.5);
    texture(fire);
    model(demonHead);
    pop();

    push();
    scale(1.8);
    rotateX(frameCount * 0.5);
    rotateY(frameCount * 0.7);
    texture(ChanseyBall);
    sphere(100);
    translate(-200, -100)
    pop();

    push();
    rotateX(frameCount * .25);
    rotateY(frameCount * .5);
    rotateZ(frameCount * .5);
    translate(300, -100, 50)
    texture(Rotom);
    sphere(50)
    pop();

    push();
    fill('#fc0307');
    textFont(ancientLanguage);
    textSize(36);
    text("The Culmination of Hell and Desire by Mint Pitassy", -575, -230);
    pop();

    push();
    normalMaterial(30, 40, 50);
    rotateZ(frameCount * 0.5);
    rotateX(frameCount * 0.5);
    rotateY(frameCount * 0.5);
    translate(-300,-200, -100);
    texture(angryWoman);
    plane(300, 150);
    pop();

    push();
    rotateX(frameCount * 0.5);
    rotateY(frameCount * 0.5);
    translate(300, 200, 50);
    normalMaterial();
    texture(sadPerson);
    box(50);
    pop();

    push();
    rotateX(frameCount * 0.5);
    rotateY(frameCount * 1.5);
    translate(CharlieX, CharlieY);
    texture(Charlie);
    sphere(50);
    pop();

    push();
    rotateX(frameCount * 5);
    rotateY(frameCount *2);
    rotateZ(frameCount *5);
    translate(-300, 100, -50)
    normalMaterial(0,255,0);
    texture(man);
    cylinder(30, 100)
    pop();

    push();
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.5);
    rotateZ(frameCount *0.3);
    translate(EarthX, EarthZ, EarthZ)
    texture(World);
    torus(20, 90);
    pop();
 
    if (mouseIsPressed) {
   
        CharlieX = random(-300, 500);
        CharlieY = random(-600, 500);
        EarthX = random(-200, 200)
        EarthZ = random(-200, 200)
        EarthY = random(-200, 200)
        randomTranslationY = random(-300, 100);
        randomTranslationX = random(-300, 100);
      }
}